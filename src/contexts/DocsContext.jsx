import { createContext, useCallback, useMemo, useRef, useState } from 'react';
import docsIndex from '../content/docs-index.generated.json';

const DocsContext = createContext(null);
const TOPIC_MANIFESTS = import.meta.glob('../content/docs-topics/docs-topic-*.generated.json');

function mergeTopicIntoDocs(docs, topicNode) {
    if (!topicNode?.id) return docs;
    return docs.map((doc) => {
        if (doc.id !== topicNode.id) return doc;
        return {
            ...doc,
            title: topicNode.title || doc.title,
            icon: topicNode.icon || doc.icon,
            slug: topicNode.slug || doc.slug,
            introPath: topicNode.introPath || doc.introPath,
            sectionCount: topicNode.sections?.length || doc.sectionCount || 0,
            sections: topicNode.sections || [],
        };
    });
}

export function DocsProvider({ children }) {
    const [docs, setDocs] = useState(() => docsIndex?.docs || []);
    const loadedTopicsRef = useRef(new Set());
    const loadingPromisesRef = useRef(new Map());

    const ensureTopicLoaded = useCallback(async (topicId) => {
        if (!topicId) return null;
        if (loadedTopicsRef.current.has(topicId)) return topicId;
        if (loadingPromisesRef.current.has(topicId)) {
            return loadingPromisesRef.current.get(topicId);
        }

        const manifestPath = `../content/docs-topics/docs-topic-${topicId}.generated.json`;
        const loader = TOPIC_MANIFESTS[manifestPath];
        if (!loader) return null;

        const loadingPromise = loader()
            .then((module) => {
                const topicNode = module?.topic || module?.default?.topic || null;
                if (!topicNode) return null;
                setDocs((previous) => mergeTopicIntoDocs(previous, topicNode));
                loadedTopicsRef.current.add(topicId);
                return topicId;
            })
            .finally(() => {
                loadingPromisesRef.current.delete(topicId);
            });

        loadingPromisesRef.current.set(topicId, loadingPromise);
        return loadingPromise;
    }, []);

    const value = useMemo(() => ({ docs, ensureTopicLoaded }), [docs, ensureTopicLoaded]);
    return <DocsContext.Provider value={value}>{children}</DocsContext.Provider>;
}

export default DocsContext;
