import { useMemo, useState } from "react";
import {
    Alert,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    Switch,
    TextField,
    Typography
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const DOCUMENTS = [
    { _id: 1, name: "Ada", active: true, city: "Milan", score: 84 },
    { _id: 2, name: "Lin", active: false, city: "Rome", score: 65 },
    { _id: 3, name: "Nora", active: true, city: "Milan", score: 91 }
];

const FILTERS = {
    all: { label: "All documents", apply: () => true },
    activeOnly: { label: "active = true", apply: (doc) => doc.active === true },
    cityMatch: { label: "city = value", apply: (doc, city) => doc.city === city }
};

function projectDocument(doc, includeName, includeCity, includeScore) {
    const projected = { _id: doc._id };
    if (includeName) projected.name = doc.name;
    if (includeCity) projected.city = doc.city;
    if (includeScore) projected.score = doc.score;
    return projected;
}

export default function FindFilterProjectionPlayground() {
    const [filterKey, setFilterKey] = useState("all");
    const [cityValue, setCityValue] = useState("Milan");
    const [includeName, setIncludeName] = useState(true);
    const [includeCity, setIncludeCity] = useState(true);
    const [includeScore, setIncludeScore] = useState(false);

    const result = useMemo(() => {
        const filterFn = FILTERS[filterKey].apply;
        const matched = DOCUMENTS.filter((doc) => filterFn(doc, cityValue));
        const projected = matched.map((doc) => projectDocument(doc, includeName, includeCity, includeScore));

        const fields = [includeName ? "name" : null, includeCity ? "city" : null, includeScore ? "score" : null]
            .filter(Boolean)
            .join(", ") || "_id only";

        const filterPreview = filterKey === "cityMatch"
            ? `{ city: "${cityValue}" }`
            : filterKey === "activeOnly"
                ? `{ active: true }`
                : `{}`;

        return { matched, projected, fields, filterPreview };
    }, [cityValue, filterKey, includeCity, includeName, includeScore]);

    const queryPreview = useMemo(() => {
        return `db.users.find(${result.filterPreview}, { _id: 1, name: ${includeName ? 1 : 0}, city: ${includeCity ? 1 : 0}, score: ${includeScore ? 1 : 0} })`;
    }, [includeCity, includeName, includeScore, result.filterPreview]);

    return (
        <PlaygroundShell
            title="Find Filter & Projection Playground"
            goal="Understand how filter and projection combine to shape MongoDB query results."
            status={{ color: result.matched.length ? "success" : "warning", label: `${result.matched.length} docs` }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 680 }}>
                    <FormControl size="small" sx={{ minWidth: 260 }}>
                        <InputLabel id="filter-label">Filter preset</InputLabel>
                        <Select
                            labelId="filter-label"
                            label="Filter preset"
                            value={filterKey}
                            onChange={(event) => setFilterKey(event.target.value)}
                        >
                            {Object.entries(FILTERS).map(([key, value]) => (
                                <MenuItem key={key} value={key}>{value.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {filterKey === "cityMatch" ? (
                        <TextField
                            size="small"
                            label="City value"
                            value={cityValue}
                            onChange={(event) => setCityValue(event.target.value)}
                        />
                    ) : null}

                    <Stack direction={{ xs: "column", md: "row" }} spacing={1}>
                        <FormControlLabel control={<Switch checked={includeName} onChange={(event) => setIncludeName(event.target.checked)} />} label="name" />
                        <FormControlLabel control={<Switch checked={includeCity} onChange={(event) => setIncludeCity(event.target.checked)} />} label="city" />
                        <FormControlLabel control={<Switch checked={includeScore} onChange={(event) => setIncludeScore(event.target.checked)} />} label="score" />
                    </Stack>
                </Stack>
            }
            preview={
                <Paper
                    variant="outlined"
                    sx={(theme) => ({
                        p: 1.3,
                        borderRadius: 2,
                        bgcolor: theme.palette.mode === "dark"
                            ? alpha(theme.palette.common.white, 0.04)
                            : alpha(theme.palette.common.black, 0.02)
                    })}
                >
                    <Typography variant="caption" color="text.secondary">Query preview</Typography>
                    <Typography variant="body2" sx={{ mt: 1, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                        {queryPreview}
                    </Typography>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    <Alert severity={result.matched.length ? "success" : "warning"} variant="outlined">
                        Returned fields: {result.fields}
                    </Alert>
                    <Paper variant="outlined" sx={{ p: 1.2, borderRadius: 2 }}>
                        <Typography variant="caption" color="text.secondary">Projected result documents</Typography>
                        <Stack spacing={0.5} sx={{ mt: 1 }}>
                            {result.projected.length ? result.projected.map((doc) => (
                                <Typography key={doc._id} variant="body2" sx={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                                    {JSON.stringify(doc)}
                                </Typography>
                            )) : (
                                <Typography variant="body2">No documents matched the filter.</Typography>
                            )}
                        </Stack>
                    </Paper>
                </Stack>
            }
            code={
                <pre>{`db.users.find(
  ${result.filterPreview},
  { _id: 1, name: ${includeName ? 1 : 0}, city: ${includeCity ? 1 : 0}, score: ${includeScore ? 1 : 0} }
)
// matched docs: ${result.matched.length}`}</pre>
            }
            note="Use filter to choose which documents to return, and projection to control which fields are sent back."
        />
    );
}
