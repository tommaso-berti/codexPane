import { useMemo, useState } from "react";
import {
    Alert,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const DATASET = {
    numeric: [
        { _id: "p1", price: 18 },
        { _id: "p2", price: 42 },
        { _id: "p3", price: 75 }
    ],
    arrays: [
        { _id: "a1", tags: ["val1", "val2"] },
        { _id: "a2", tags: ["val1"] },
        { _id: "a3", tags: ["val2", "val3"] }
    ],
    dot: [
        { _id: "u1", address: { city: "Milan" } },
        { _id: "u2", address: { city: "Rome" } },
        { _id: "u3", address: { city: "Madrid" } }
    ]
};

function evaluateMatch(scenario, operator, value) {
    if (scenario === "numeric") {
        const threshold = Number(value);
        const matched = DATASET.numeric.filter((doc) => {
            if (operator === "$gt") return doc.price > threshold;
            if (operator === "$gte") return doc.price >= threshold;
            if (operator === "$lt") return doc.price < threshold;
            if (operator === "$lte") return doc.price <= threshold;
            return doc.price === threshold;
        });

        return {
            matched,
            query: `{ price: { ${operator}: ${threshold} } }`,
            explanation: `${operator} compared each price against ${threshold}.`
        };
    }

    if (scenario === "arrays") {
        const target = value.trim();
        const matched = DATASET.arrays.filter((doc) => doc.tags.includes(target));
        return {
            matched,
            query: `{ tags: "${target}" }`,
            explanation: `Array contains match checks whether each document tags array includes "${target}".`
        };
    }

    const targetCity = value.trim();
    const matched = DATASET.dot.filter((doc) => doc.address.city === targetCity);
    return {
        matched,
        query: `{ "address.city": "${targetCity}" }`,
        explanation: "Dot notation targets nested fields directly."
    };
}

export default function QueryMatchingPlayground() {
    const [scenario, setScenario] = useState("numeric");
    const [operator, setOperator] = useState("$gte");
    const [value, setValue] = useState("40");

    const result = useMemo(() => evaluateMatch(scenario, operator, value), [scenario, operator, value]);

    return (
        <PlaygroundShell
            title="Query Matching Playground"
            goal="See how operators, array matching, and dot notation change which documents match."
            status={{ color: result.matched.length ? "success" : "warning", label: `${result.matched.length} matches` }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 680 }}>
                    <FormControl size="small" sx={{ minWidth: 240 }}>
                        <InputLabel id="scenario-label">Scenario</InputLabel>
                        <Select
                            labelId="scenario-label"
                            label="Scenario"
                            value={scenario}
                            onChange={(event) => {
                                const next = event.target.value;
                                setScenario(next);
                                if (next === "numeric") {
                                    setOperator("$gte");
                                    setValue("40");
                                } else if (next === "arrays") {
                                    setValue("val1");
                                } else {
                                    setValue("Milan");
                                }
                            }}
                        >
                            <MenuItem value="numeric">Comparison operators</MenuItem>
                            <MenuItem value="arrays">Array contains</MenuItem>
                            <MenuItem value="dot">Dot notation</MenuItem>
                        </Select>
                    </FormControl>

                    {scenario === "numeric" ? (
                        <Stack direction={{ xs: "column", md: "row" }} spacing={1}>
                            <FormControl size="small" sx={{ minWidth: 160 }}>
                                <InputLabel id="operator-label">Operator</InputLabel>
                                <Select
                                    labelId="operator-label"
                                    label="Operator"
                                    value={operator}
                                    onChange={(event) => setOperator(event.target.value)}
                                >
                                    {["$gt", "$gte", "$lt", "$lte", "$eq"].map((entry) => (
                                        <MenuItem key={entry} value={entry}>{entry}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <TextField
                                size="small"
                                type="number"
                                label="Threshold"
                                value={value}
                                onChange={(event) => setValue(event.target.value)}
                            />
                        </Stack>
                    ) : (
                        <TextField
                            size="small"
                            label={scenario === "arrays" ? "Tag value" : "City value"}
                            value={value}
                            onChange={(event) => setValue(event.target.value)}
                        />
                    )}
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
                        db.collection.find({result.query})
                    </Typography>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    <Alert severity={result.matched.length ? "success" : "warning"} variant="outlined">
                        Matched _id values: {result.matched.length ? result.matched.map((doc) => doc._id).join(", ") : "none"}
                    </Alert>
                    <Alert severity="info" variant="outlined">{result.explanation}</Alert>
                </Stack>
            }
            note="Start with a focused query, then layer operators or dot notation so match logic stays easy to reason about."
        />
    );
}
