import { useContext } from 'react';
import DocsContext from './DocsContext.jsx';

export function useDocs() {
    const ctx = useContext(DocsContext);
    if (ctx === null) return { docs: [], ensureTopicLoaded: async () => null };
    return ctx;
}
