import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const DocsContext = createContext(null);

export function DocsProvider({ children }) {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        const raw = import.meta.glob('../content/**/structure.json', { eager: true });
        const entries = Object.values(raw);
        const metadata = entries.map((value) => ({
            doc: value.doc,
            title: value.title,
            icon: value.icon,
            sections: (value.items || []).map((section) => ({
                title: section.title,
                slug: section.slug,
                sub: (section.items || []).map((sub) => ({
                    title: sub.title,
                    slug: sub.slug
                }))
            }))
        }));
        setDocs(metadata);
    }, []);

    const value = useMemo(() => ({ docs }), [docs]);
    return <DocsContext.Provider value={value}>{children}</DocsContext.Provider>;
}

export function useDocs() {
    const ctx = useContext(DocsContext);
    if (ctx === null) throw new Error('useDocs must be used within DocsProvider');
    return ctx;
}