import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useActiveSection } from './useActiveSection.js';
import { useDocs } from '../../contexts/useDocs.js';

const ALL_DOCS = import.meta.glob('../../content/**/*.mdx');
const PROGRAMMATIC_SCROLL_LOCK_FALLBACK_MS = 1200;

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
    const { docs: docsTree = [] } = useDocs();

    return useMemo(() => {
        if (!docs) return null;
        const docNode = docsTree.find((docItem) => docItem.id === docs);
        if (!docNode) return null;
        if (!section) return docNode.introPath || `../../content/${docs}/introduction.mdx`;
        const sectionNode = docNode.sections?.find((sectionItem) => sectionItem.id === section);
        if (!sectionNode) return null;
        return sectionNode.filePath || `../../content/${docs}/${section}.mdx`;
    }, [docs, section, docsTree]);
}

function getScrollRoot() {
    return document.querySelector('[data-scroller="content"]');
}

export function useActiveSectionHash(contentKey, enabled = true) {
    const location = useLocation();
    const [activeId, setActiveId] = useState('');
    const activeIdRef = useRef('');
    const suppressUntilRef = useRef(0);
    const lockTimeoutRef = useRef(0);
    const lockReleaseRef = useRef(() => {});
    const initialHashHandledRef = useRef(typeof window !== 'undefined' ? !window.location.hash : true);
    const { setActiveSectionId } = useActiveSection();

    const clearProgrammaticLock = useCallback(() => {
        suppressUntilRef.current = 0;
        window.clearTimeout(lockTimeoutRef.current);
        lockTimeoutRef.current = 0;
        lockReleaseRef.current?.();
        lockReleaseRef.current = () => {};
    }, []);

    const startProgrammaticLock = useCallback(() => {
        clearProgrammaticLock();

        suppressUntilRef.current = Date.now() + PROGRAMMATIC_SCROLL_LOCK_FALLBACK_MS;
        const root = getScrollRoot();

        const release = () => {
            clearProgrammaticLock();
        };

        const onScrollEnd = () => release();
        const rootSupportsScrollEnd = root && 'onscrollend' in root;
        const windowSupportsScrollEnd = 'onscrollend' in window;

        if (rootSupportsScrollEnd) {
            root.addEventListener('scrollend', onScrollEnd, { passive: true });
        }
        if (windowSupportsScrollEnd) {
            window.addEventListener('scrollend', onScrollEnd, { passive: true });
        }

        lockReleaseRef.current = () => {
            if (rootSupportsScrollEnd && root) {
                root.removeEventListener('scrollend', onScrollEnd);
            }
            if (windowSupportsScrollEnd) {
                window.removeEventListener('scrollend', onScrollEnd);
            }
        };

        lockTimeoutRef.current = window.setTimeout(release, PROGRAMMATIC_SCROLL_LOCK_FALLBACK_MS);
    }, [clearProgrammaticLock]);

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

            startProgrammaticLock();
            const behavior = initialHashHandledRef.current ? 'smooth' : 'auto';
            heading.scrollIntoView({ behavior, block: 'start' });
            initialHashHandledRef.current = true;
            activeIdRef.current = hashId;
            setActiveId(hashId);
            setActiveSectionId(hashId);
        };

        const timer = window.setTimeout(alignToHash, 0);
        return () => window.clearTimeout(timer);
    }, [enabled, location.hash, contentKey, setActiveSectionId, startProgrammaticLock]);

    useEffect(() => {
        return () => {
            clearProgrammaticLock();
        };
    }, [clearProgrammaticLock]);

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
