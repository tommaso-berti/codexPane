import { createContext, useMemo } from 'react';
import manifest from '../content/docs-manifest.generated.json';

const DocsContext = createContext(null);

export function DocsProvider({ children }) {
    const docs = useMemo(() => manifest?.docs || [], []);

    const value = useMemo(() => ({ docs }), [docs]);
    return <DocsContext.Provider value={value}>{children}</DocsContext.Provider>;
}

export default DocsContext;
