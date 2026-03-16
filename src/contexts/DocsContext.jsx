import { createContext, useMemo } from 'react';

const DocsContext = createContext(null);
const RAW_DOCS = import.meta.glob('../content/**/structure.json', { eager: true });

function normalizeDocs(raw) {
    return Object.values(raw).map((value) => ({
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
                slug: subSection.slug,
            })),
        })),
    }));
}

export function DocsProvider({ children }) {
    const docs = useMemo(() => normalizeDocs(RAW_DOCS), []);

    const value = useMemo(() => ({ docs }), [docs]);
    return <DocsContext.Provider value={value}>{children}</DocsContext.Provider>;
}

export default DocsContext;
