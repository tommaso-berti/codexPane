import { useEffect, useMemo, useState } from 'react';
import MiniSearch from 'minisearch';
import { useDocs } from '../../contexts/DocsContext.jsx';

function flattenDocs(docs) {
    const out = [];
    for (const topic of docs) {
        const topicTitle = topic.title;
        for (const section of (topic.sections || [])) {
            out.push({
                id: `${topic.id}/${section.id}`,
                title: section.title,
                body: '',
                path: `/${section.slug}`,
                breadcrumb: [topicTitle, section.title],
                topictitle: topicTitle,
            });
            for (const sub of (section.subSections || [])) {
                out.push({
                    id: `${topic.id}/${section.id}#${sub.id}`,
                    title: sub.title,
                    body: '',
                    path: `/${sub.slug}`,
                    breadcrumb: [topicTitle, section.title, sub.title],
                    topictitle: topicTitle,
                });
            }
        }
    }
    return out;
}

export function useMiniSearchFromDocs() {
    const { docs } = useDocs();
    const [mini, setMini] = useState(null);

    useEffect(() => {
        if (!docs.length) return;

        const flat = flattenDocs(docs);

        const ms = new MiniSearch({
            fields: ['title', 'body'],
            storeFields: ['title', 'path', 'breadcrumb', 'topictitle'],
            searchOptions: { prefix: true, fuzzy: 0.2 },
        });

        ms.addAll(flat);
        setMini(ms);
    }, [docs]);

    const search = useMemo(() => {
        if (!mini) return () => [];
        return (query) => (query ? mini.search(query) : []);
    }, [mini]);

    return { search };
}