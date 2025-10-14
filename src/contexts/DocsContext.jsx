import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const DocsContext = createContext(null);

export function DocsProvider({ children }) {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        const raw = import.meta.glob('../content/**/structure.json', { eager: true });
        const entries = Object.values(raw);
        const metadata = entries.map((value) => ({
            id: value.id,
            title: value.title,
            icon: value.icon,
            slug: value.slug,
            sections: (value.items || []).map((section) => ({
                id: section.id,
                title: section.title,
                slug: section.slug,
                subSections: (section.items || []).map((subSection) => ({
                    id: subSection.id,
                    title: subSection.title,
                    slug: subSection.slug
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
    if (ctx === null) return {docs: []};
    return ctx;
}