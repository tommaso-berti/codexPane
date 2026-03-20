import { useMemo } from 'react';
import MiniSearch from 'minisearch';
import { useDocs } from '../../contexts/useDocs.js';

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

export function useMiniSearchFromDocs() {
    const { docs } = useDocs();

    const mini = useMemo(() => {
        if (!docs.length) return null;
        const flat = flattenDocs(docs);
        const ms = new MiniSearch({
            fields: ['title', 'body'],
            storeFields: ['title', 'path', 'breadcrumb', 'topictitle'],
            searchOptions: { prefix: true, fuzzy: 0.2, boost: { title: 3, body: 1 } },
        });
        ms.addAll(flat);
        return ms;
    }, [docs]);

    const search = useMemo(() => {
        if (!mini) return () => [];
        return (query) => (query ? mini.search(query) : []);
    }, [mini]);

    return { search };
}
