import SearchResultItem from "./SearchResultItem.jsx";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Box from "@mui/material/Box";

function groupByTopic(results) {
    const map = new Map();
    for (const r of results) {
        const topic = r.topictitle
        if (!map.has(topic)) {
            map.set(topic, { topicTitle: topic, items: [] });
        }
        map.get(topic).items.push(r);
    }
    return [...map.values()];
}


export default function SearchResults({ results, onItemClick }) {
    if (!results?.length) return null;

    const groups = groupByTopic(results);

    return (
        <Box sx={{ mt: 2 }}>
            {groups.map((group) => (
                <Box key={group.topicTitle} sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {group.topicTitle}
                    </Typography>

                    {group.items.map((item, index) => (
                        <SearchResultItem
                            key={item.id}
                            result={item}
                            siblings={group.items}
                            index={index}
                            onClick={(path) => onItemClick(path)}
                            branch={
                                group.items.length === 1
                                    ? 'single'
                                    : index === 0
                                        ? 'start'
                                        : index === group.items.length - 1
                                            ? 'end'
                                            : 'middle'
                            }
                        />
                    ))}
                </Box>
            ))}
        </Box>
    );
}