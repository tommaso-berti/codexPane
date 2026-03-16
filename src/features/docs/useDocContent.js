import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useActiveSection } from './useActiveSection.js';

const ALL_DOCS = import.meta.glob('../../content/**/*.mdx');
const ACTIVATION_RATIO = 0.24;
const SWITCH_DEBOUNCE_MS = 140;
const HYSTERESIS_PX = 18;
const PROGRAMMATIC_SCROLL_LOCK_MS = 650;

function normalizeError(error) {
    if (error instanceof Error) {
        return error.message;
    }
    return 'Unable to load content.';
}

export function useDocContent(path) {
    const [state, setState] = useState({
        status: 'idle',
        Content: null,
        error: null,
    });

    useEffect(() => {
        let cancelled = false;
        const importer = path ? ALL_DOCS[path] : null;

        if (!importer) {
            setState({ status: 'not-found', Content: null, error: null });
            return () => {
                cancelled = true;
            };
        }

        setState((previous) => ({
            status: 'loading',
            Content: previous.Content,
            error: null,
        }));

        importer()
            .then((mod) => {
                if (cancelled) return;
                const Content = mod?.default ?? null;
                if (!Content) {
                    setState({ status: 'not-found', Content: null, error: null });
                    return;
                }
                setState({ status: 'ready', Content, error: null });
            })
            .catch((error) => {
                if (cancelled) return;
                setState({ status: 'error', Content: null, error: normalizeError(error) });
            });

        return () => {
            cancelled = true;
        };
    }, [path]);

    return state;
}

export function useDocContentPath({ docs, section }) {
    return useMemo(() => {
        if (!docs) return null;
        if (!section) return `../../content/${docs}/introduction.mdx`;
        return `../../content/${docs}/${section}.mdx`;
    }, [docs, section]);
}

function getScrollRoot() {
    return document.querySelector('[data-scroller="content"]');
}

function getHeadingElements() {
    const container = document.querySelector('[data-doc-content="true"]');
    if (!container) return [];
    return [...container.querySelectorAll('h2[id], h3[id]')];
}

function getActivationLineY(scrollRoot) {
    if (scrollRoot) {
        const rect = scrollRoot.getBoundingClientRect();
        return rect.top + rect.height * ACTIVATION_RATIO;
    }
    return window.innerHeight * ACTIVATION_RATIO;
}

function nearestHeadingByTopLine(headings, activationLineY) {
    if (!headings.length) return null;

    const withTop = headings
        .map((heading) => ({ id: heading.id, top: heading.getBoundingClientRect().top }))
        .sort((a, b) => a.top - b.top);

    let candidate = withTop[0]?.id ?? null;
    for (const heading of withTop) {
        if (heading.top <= activationLineY + HYSTERESIS_PX) {
            candidate = heading.id;
        } else {
            break;
        }
    }
    return candidate;
}

export function useActiveSectionHash(contentKey, enabled = true) {
    const location = useLocation();
    const [activeId, setActiveId] = useState('');
    const activeIdRef = useRef('');
    const suppressUntilRef = useRef(0);
    const debounceRef = useRef(0);
    const frameRef = useRef(0);
    const initialHashHandledRef = useRef(typeof window !== 'undefined' ? !window.location.hash : true);
    const mutationObserverRef = useRef(null);
    const { setActiveSectionId } = useActiveSection();

    const syncActiveIdFromHash = useCallback(() => {
        const currentHash = location.hash ? decodeURIComponent(location.hash.slice(1)) : '';
        activeIdRef.current = currentHash || '';
        setActiveId(currentHash || '');
        setActiveSectionId(currentHash || '');
    }, [location.hash, setActiveSectionId]);

    useEffect(() => {
        if (!enabled) return;
        syncActiveIdFromHash();
    }, [enabled, syncActiveIdFromHash]);

    useEffect(() => {
        if (!enabled) return;

        const alignToHash = () => {
            const hashId = location.hash ? decodeURIComponent(location.hash.slice(1)) : '';
            if (!hashId) return;
            const heading = document.getElementById(hashId);
            if (!heading) return;

            suppressUntilRef.current = Date.now() + PROGRAMMATIC_SCROLL_LOCK_MS;
            const behavior = initialHashHandledRef.current ? 'smooth' : 'auto';
            heading.scrollIntoView({ behavior, block: 'start' });
            initialHashHandledRef.current = true;
            activeIdRef.current = hashId;
            setActiveId(hashId);
            setActiveSectionId(hashId);
        };

        const timer = window.setTimeout(alignToHash, 0);
        return () => window.clearTimeout(timer);
    }, [enabled, location.hash, contentKey, setActiveSectionId]);

    const evaluateActiveSection = useCallback(() => {
        if (!enabled || Date.now() < suppressUntilRef.current) return;
        const headings = getHeadingElements();
        if (!headings.length) return;

        const root = getScrollRoot();
        const candidateId = nearestHeadingByTopLine(
            headings,
            getActivationLineY(root)
        );
        if (!candidateId || candidateId === activeIdRef.current) return;

        window.clearTimeout(debounceRef.current);
        debounceRef.current = window.setTimeout(() => {
            if (Date.now() < suppressUntilRef.current) return;
            if (candidateId === activeIdRef.current) return;
            const encoded = `#${encodeURIComponent(candidateId)}`;
            if (location.hash === encoded) {
                activeIdRef.current = candidateId;
                setActiveId(candidateId);
                setActiveSectionId(candidateId);
                return;
            }
            activeIdRef.current = candidateId;
            setActiveId(candidateId);
            setActiveSectionId(candidateId);
        }, SWITCH_DEBOUNCE_MS);
    }, [enabled, location.hash, setActiveSectionId]);

    useEffect(() => {
        if (!enabled) return;

        const onScroll = () => {
            cancelAnimationFrame(frameRef.current);
            frameRef.current = requestAnimationFrame(evaluateActiveSection);
        };

        const attachListeners = () => {
            const root = getScrollRoot();
            if (root) {
                root.addEventListener('scroll', onScroll, { passive: true });
            }
            // Fallback path for layouts/browsers where the page still scrolls on window.
            window.addEventListener('scroll', onScroll, { passive: true });
            window.addEventListener('resize', onScroll);

            const content = document.querySelector('[data-doc-content="true"]');
            mutationObserverRef.current?.disconnect();
            if (content) {
                mutationObserverRef.current = new MutationObserver(onScroll);
                mutationObserverRef.current.observe(content, { childList: true, subtree: true });
            }

            onScroll();
            return () => {
                if (root) {
                    root.removeEventListener('scroll', onScroll);
                }
                window.removeEventListener('scroll', onScroll);
                window.removeEventListener('resize', onScroll);
            };
        };

        const timer = window.setTimeout(() => {
            cleanupListeners = attachListeners();
        }, 0);

        let cleanupListeners = () => {};
        return () => {
            window.clearTimeout(timer);
            cleanupListeners();
            mutationObserverRef.current?.disconnect();
            mutationObserverRef.current = null;
            window.clearTimeout(debounceRef.current);
            cancelAnimationFrame(frameRef.current);
        };
    }, [enabled, contentKey, evaluateActiveSection]);

    return { activeId };
}

export function useScrollToHash(key) {
    const { hash } = useLocation();

    useEffect(() => {
        const timer = window.setTimeout(() => {
            if (hash) {
                const id = decodeURIComponent(hash.slice(1));
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    element.focus?.();
                }
                return;
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 0);

        return () => window.clearTimeout(timer);
    }, [hash, key]);
}
