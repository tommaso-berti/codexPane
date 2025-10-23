import SearchResultItem from "./SearchResultItem.jsx";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";

export default function SearchResults({topics, results, onItemClick}) {
    return (
        <List>
            {topics.map((topic) => {
                const items = results.filter(r => r.topic === topic.topic);
                if (!items.length) return null;
                const sections = new Map();
                items.forEach((r, idx) => {
                    const key = r.breadcrumb[1];
                    if (!key) return;
                    const entry = sections.get(key) ?? { parentIndex: null, children: [] };
                    if (r.breadcrumb.length <= 2) entry.parentIndex = idx;
                    else entry.children.push(idx);
                    sections.set(key, entry);
                });
                return (
                    <ListItem
                        dense
                        component="div"
                        disablePadding
                        key={topic.topic}
                        sx={{flexDirection: 'column', alignItems: 'flex-start'}}
                    >
                        <ListItemText
                            primary={<Typography variant="h6">{topic.topictitle}</Typography>}
                        />
                        {
                            items.map((res, i) => {
                                const key = res.breadcrumb[1];
                                const prev = items[i - 1]?.breadcrumb[1];
                                const next = items[i + 1]?.breadcrumb[1];

                                let branch = 'single';
                                if (prev === key && next === key) branch = 'middle';
                                else if (prev !== key && next === key) branch = 'start';
                                else if (prev === key && next !== key) branch = 'end';
                                return (
                                    <SearchResultItem key={res.id} result={res} onClick={onItemClick} branch={branch} />
                                )
                        })
                        }
                    </ListItem>
                )
            })}
        </List>
    )
}