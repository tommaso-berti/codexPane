import SearchResultItem from "./SearchResultItem.jsx";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useMemo } from "react";
import { useDocs } from "../../contexts/useDocs.js";

function parseHitId(id) {
    if (!id || typeof id !== 'string') return null;
    const [docAndSection, subSectionId] = id.split('#');
    const parts = docAndSection.split('/');
    if (parts.length !== 2) return null;
    return {
        docId: parts[0],
        sectionId: parts[1],
        subSectionId: subSectionId || null,
    };
}

function buildTreeResults(results, docs) {
    const docMatches = new Map();
    const docOrder = new Map(docs.map((doc, index) => [doc.id, index]));

    for (const hit of results) {
        const parsed = parseHitId(hit.id);
        if (!parsed) continue;

        const { docId, sectionId, subSectionId } = parsed;
        if (!docMatches.has(docId)) {
            docMatches.set(docId, {
                bestScore: Number.NEGATIVE_INFINITY,
                sections: new Map(),
            });
        }

        const docEntry = docMatches.get(docId);
        docEntry.bestScore = Math.max(docEntry.bestScore, hit.score ?? Number.NEGATIVE_INFINITY);

        if (!docEntry.sections.has(sectionId)) {
            docEntry.sections.set(sectionId, { matchedSubSections: new Set() });
        }

        if (subSectionId) {
            docEntry.sections.get(sectionId).matchedSubSections.add(subSectionId);
        }
    }

    const matchedDocs = docs
        .filter((doc) => docMatches.has(doc.id))
        .map((doc) => ({
            doc,
            ...docMatches.get(doc.id),
        }))
        .sort((a, b) => {
            if (b.bestScore !== a.bestScore) return b.bestScore - a.bestScore;
            return (docOrder.get(a.doc.id) ?? 0) - (docOrder.get(b.doc.id) ?? 0);
        });

    return matchedDocs.map(({ doc, sections }) => {
        const items = [];

        for (const section of (doc.sections || [])) {
            const sectionMatch = sections.get(section.id);
            if (!sectionMatch) continue;

            items.push({
                id: `${doc.id}/${section.id}`,
                path: `/${section.slug}`,
                breadcrumb: [doc.title, section.title],
                topictitle: doc.title,
            });

            for (const subSection of (section.subSections || [])) {
                if (!sectionMatch.matchedSubSections.has(subSection.id)) continue;
                items.push({
                    id: `${doc.id}/${section.id}#${subSection.id}`,
                    path: `/${subSection.slug}`,
                    breadcrumb: [doc.title, section.title, subSection.title],
                    topictitle: doc.title,
                });
            }
        }

        return {
            topicTitle: doc.title,
            items,
        };
    });
}


export default function SearchResults({ results, onItemClick }) {
    const { docs } = useDocs();
    const groups = useMemo(() => buildTreeResults(results || [], docs || []), [results, docs]);
    if (!results?.length || !groups.length) return null;

    return (
        <Box sx={{ mt: 2 }}>
            {groups.map((group) => (
                <Box key={group.topicTitle} sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: 'text.secondary' }}>
                        {group.topicTitle}
                    </Typography>

                    {group.items.map((item, index) => {
                        const isSubSection = item.breadcrumb?.length === 3;
                        const sectionKey = item.id.split('#')[0];
                        const sectionChildren = isSubSection
                            ? group.items.filter((candidate) => candidate.breadcrumb?.length === 3 && candidate.id.startsWith(`${sectionKey}#`))
                            : [];
                        const sectionChildIndex = isSubSection
                            ? sectionChildren.findIndex((candidate) => candidate.id === item.id)
                            : 0;

                        return (
                            <SearchResultItem
                                key={item.id}
                                result={item}
                                siblings={isSubSection ? sectionChildren : group.items}
                                index={isSubSection ? sectionChildIndex : index}
                                onClick={(path) => onItemClick(path)}
                                branch={
                                    !isSubSection
                                        ? 'single'
                                        : sectionChildren.length === 1
                                            ? 'single'
                                            : sectionChildIndex === 0
                                                ? 'start'
                                                : sectionChildIndex === sectionChildren.length - 1
                                                    ? 'end'
                                                    : 'middle'
                                }
                            />
                        );
                    })}
                </Box>
            ))}
        </Box>
    );
}
