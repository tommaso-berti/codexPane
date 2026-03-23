import SearchResultItem from "./SearchResultItem.jsx";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useMemo } from "react";
function parseHitId(id) {
    if (!id || typeof id !== 'string') return null;
    const [sectionKey] = id.split('#');
    return sectionKey || null;
}

function buildTreeResults(results) {
    const groups = new Map();
    const topicOrder = [];

    for (const hit of results) {
        const topicTitle = hit.topictitle || hit.breadcrumb?.[0] || 'Documentation';
        if (!groups.has(topicTitle)) {
            groups.set(topicTitle, []);
            topicOrder.push(topicTitle);
        }
        groups.get(topicTitle).push(hit);
    }

    return topicOrder.map((topicTitle) => ({
        topicTitle,
        items: groups.get(topicTitle) || [],
    }));
}


export default function SearchResults({ results, onItemClick, query = '' }) {
    const groups = useMemo(() => buildTreeResults(results || []), [results]);
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
                        const sectionKey = parseHitId(item.id);
                        const sectionChildren = isSubSection
                            ? group.items.filter(
                                  (candidate) =>
                                      candidate.breadcrumb?.length === 3 && parseHitId(candidate.id) === sectionKey
                              )
                            : [];
                        const sectionChildIndex = isSubSection
                            ? sectionChildren.findIndex((candidate) => candidate.id === item.id)
                            : 0;

                        return (
                            <SearchResultItem
                                key={item.id}
                                result={item}
                                query={query}
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
