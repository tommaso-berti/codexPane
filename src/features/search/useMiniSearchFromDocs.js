import { useEffect, useMemo, useRef, useState } from 'react';
import MiniSearch from 'minisearch';

function flattenDocs(docs) {
    const out = [];
    const toSearchText = (value) =>
        String(value || '')
            .replace(/[-_/#:]+/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

    for (const topic of docs) {
        const topicTitle = topic.title;
        for (const section of (topic.sections || [])) {
            const sectionBreadcrumb = [topicTitle, section.title];
            out.push({
                id: `${topic.id}/${section.id}`,
                title: section.title,
                body: toSearchText(`${sectionBreadcrumb.join(' ')} ${section.slug}`),
                path: `/${section.slug}`,
                breadcrumb: sectionBreadcrumb,
                topictitle: topicTitle,
            });
            for (const sub of (section.subSections || [])) {
                const subBreadcrumb = [topicTitle, section.title, sub.title];
                out.push({
                    id: `${topic.id}/${section.id}#${sub.id}`,
                    title: sub.title,
                    body: toSearchText(`${subBreadcrumb.join(' ')} ${sub.slug}`),
                    path: `/${sub.slug}`,
                    breadcrumb: subBreadcrumb,
                    topictitle: topicTitle,
                });
            }
        }
    }
    return out;
}

let cachedMiniSearch = null;
let loadingPromise = null;

async function loadMiniSearchIndex() {
    if (cachedMiniSearch) return cachedMiniSearch;
    if (loadingPromise) return loadingPromise;

    loadingPromise = import('../../content/docs-manifest.generated.json')
        .then((module) => {
            const docs = module?.default?.docs || [];
            const flat = flattenDocs(docs);
            const ms = new MiniSearch({
                fields: ['title', 'body'],
                storeFields: ['title', 'path', 'breadcrumb', 'topictitle'],
                searchOptions: { prefix: true, fuzzy: 0.2, boost: { title: 3, body: 1 } },
            });
            ms.addAll(flat);
            cachedMiniSearch = ms;
            return ms;
        })
        .finally(() => {
            loadingPromise = null;
        });

    return loadingPromise;
}

export function useMiniSearchFromDocs(enabled = false) {
    const [mini, setMini] = useState(() => cachedMiniSearch);
    const [isLoadingIndex, setIsLoadingIndex] = useState(false);
    const mountedRef = useRef(true);

    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    }, []);

    useEffect(() => {
        if (!enabled || mini) return;
        let cancelled = false;
        setIsLoadingIndex(true);
        loadMiniSearchIndex()
            .then((resolved) => {
                if (cancelled || !mountedRef.current) return;
                setMini(resolved);
            })
            .finally(() => {
                if (cancelled || !mountedRef.current) return;
                setIsLoadingIndex(false);
            });

        return () => {
            cancelled = true;
        };
    }, [enabled, mini]);

    const search = useMemo(() => {
        if (!mini) return () => [];
        return (query) => {
            if (!query) return [];
            const normalizedQuery = String(query).trim();
            if (!normalizedQuery) return [];
            const useFuzzy = normalizedQuery.length >= 5;
            return mini.search(normalizedQuery, {
                prefix: true,
                fuzzy: useFuzzy ? 0.2 : false,
                boost: { title: 3, body: 1 },
            });
        };
    }, [mini]);

    return { search, isLoadingIndex };
}
