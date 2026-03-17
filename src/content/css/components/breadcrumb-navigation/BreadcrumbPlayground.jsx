import { useMemo, useState } from "react";
import {
    Alert,
    Box,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    Switch,
    Typography
} from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const SEPARATORS = ["/", ">", "›"];

export default function BreadcrumbPlayground() {
    const [separator, setSeparator] = useState(">");
    const [style, setStyle] = useState("simple");
    const [collapse, setCollapse] = useState(false);

    const path = ["Home", "Catalog", "Shoes", "Sneakers"];
    const visiblePath = useMemo(() => {
        if (collapse) return ["…", path[path.length - 2], path[path.length - 1]];
        return path;
    }, [collapse]);

    return (
        <PlaygroundShell
            title="Breadcrumb Playground"
            goal="Compare separator, style, and truncation while preserving clear path context."
            status={{ color: "info", label: collapse ? "Collapsed path" : "Full path" }}
            controls={
                <Stack spacing={1.4} sx={{ maxWidth: 520 }}>
                    <FormControl size="small">
                        <InputLabel id="breadcrumb-separator-label">Separator</InputLabel>
                        <Select
                            labelId="breadcrumb-separator-label"
                            label="Separator"
                            value={separator}
                            onChange={(event) => setSeparator(event.target.value)}
                        >
                            {SEPARATORS.map((value) => (
                                <MenuItem key={value} value={value}>{value}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl size="small">
                        <InputLabel id="breadcrumb-style-label">Style</InputLabel>
                        <Select
                            labelId="breadcrumb-style-label"
                            label="Style"
                            value={style}
                            onChange={(event) => setStyle(event.target.value)}
                        >
                            <MenuItem value="simple">Simple text</MenuItem>
                            <MenuItem value="chips">Chip style</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControlLabel
                        control={<Switch checked={collapse} onChange={(event) => setCollapse(event.target.checked)} />}
                        label="Collapse early levels"
                    />
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Preview</Typography>
                    <Box component="nav" aria-label="Breadcrumb" sx={{ mt: 1 }}>
                        <Box component="ol" sx={{ p: 0, m: 0, display: "flex", gap: 0.8, alignItems: "center", listStyle: "none", flexWrap: "wrap" }}>
                            {visiblePath.map((item, index) => {
                                const isLast = index === visiblePath.length - 1;
                                const color = isLast ? "text.primary" : "primary.main";
                                const itemNode = style === "chips"
                                    ? (
                                        <Box sx={(theme) => ({ px: 1, py: 0.4, borderRadius: 10, border: "1px solid", borderColor: theme.palette.divider, color, fontWeight: isLast ? 700 : 500 })}>
                                            {item}
                                        </Box>
                                    )
                                    : (
                                        <Typography sx={{ color, fontWeight: isLast ? 700 : 500 }}>{item}</Typography>
                                    );

                                return (
                                    <Box component="li" key={item + index} sx={{ display: "inline-flex", alignItems: "center", gap: 0.8 }}>
                                        {itemNode}
                                        {isLast ? null : <Typography color="text.secondary">{separator}</Typography>}
                                    </Box>
                                );
                            })}
                        </Box>
                    </Box>
                </Paper>
            }
            output={<Alert severity="info" variant="outlined">Current path depth shown: {visiblePath.length} levels.</Alert>}
            note="Breadcrumbs should preserve orientation first; truncate only when the path becomes too long."
        />
    );
}
