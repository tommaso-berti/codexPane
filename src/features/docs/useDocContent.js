import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ALL_DOCS = import.meta.glob('../../content/**/*.mdx');

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

