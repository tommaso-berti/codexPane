import { useMemo, useState } from "react";
import {
    Alert,
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const SCENARIOS = {
    basic: [
        { tag: "button", className: "", id: "", label: "Buy" },
        { tag: "button", className: "primary", id: "", label: "Checkout" },
        { tag: "a", className: "primary", id: "help", label: "Help" }
    ],
    cards: [
        { tag: "article", className: "card featured", id: "", label: "Featured card" },
        { tag: "article", className: "card", id: "", label: "Standard card" },
        { tag: "aside", className: "card", id: "promo", label: "Promo aside" }
    ]
};

const SELECTOR_PRESETS = [
    { label: ".primary", value: ".primary" },
    { label: "button", value: "button" },
    { label: "#help", value: "#help" },
    { label: "article.card", value: "article.card" }
];

function matchesSelector(node, selector) {
    if (selector.startsWith(".")) {
        const classToken = selector.slice(1);
        return node.className.split(" ").filter(Boolean).includes(classToken);
    }
    if (selector.startsWith("#")) {
        return node.id === selector.slice(1);
    }
    if (selector.includes(".")) {
        const parts = selector.split(".");
        const tag = parts[0];
        const classToken = parts[1];
        return node.tag === tag && node.className.split(" ").filter(Boolean).includes(classToken);
    }
    return node.tag === selector;
}

export default function SelectorsPlayground() {
    const [scenario, setScenario] = useState("basic");
    const [selector, setSelector] = useState(SELECTOR_PRESETS[0].value);
    const [customSelector, setCustomSelector] = useState(SELECTOR_PRESETS[0].value);
    const [appliedSelector, setAppliedSelector] = useState(SELECTOR_PRESETS[0].value);

    const nodes = SCENARIOS[scenario];
    const matchCount = useMemo(() => nodes.filter((node) => matchesSelector(node, appliedSelector)).length, [appliedSelector, nodes]);

    return (
        <PlaygroundShell
            title="Selectors Playground"
            goal="Understand which elements are matched by a selector in a small DOM scenario."
            status={{ color: matchCount > 0 ? "success" : "warning", label: matchCount + " matches" }}
            controls={
                <Stack spacing={1.4} sx={{ maxWidth: 520 }}>
                    <FormControl size="small">
                        <InputLabel id="selectors-scenario-label">DOM scenario</InputLabel>
                        <Select
                            labelId="selectors-scenario-label"
                            label="DOM scenario"
                            value={scenario}
                            onChange={(event) => setScenario(event.target.value)}
                        >
                            <MenuItem value="basic">Buttons + link</MenuItem>
                            <MenuItem value="cards">Cards + aside</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl size="small">
                        <InputLabel id="selectors-value-label">Selector preset</InputLabel>
                        <Select
                            labelId="selectors-value-label"
                            label="Selector preset"
                            value={selector}
                            onChange={(event) => {
                                const value = event.target.value;
                                setSelector(value);
                                setCustomSelector(value);
                            }}
                        >
                            {SELECTOR_PRESETS.map((preset) => (
                                <MenuItem key={preset.value} value={preset.value}>{preset.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        size="small"
                        label="Custom selector"
                        value={customSelector}
                        onChange={(event) => setCustomSelector(event.target.value)}
                        placeholder=".primary or article.card"
                    />

                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" onClick={() => setAppliedSelector(selector)}>
                            Apply preset
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => setAppliedSelector((customSelector || "").trim())}
                        >
                            Run custom
                        </Button>
                    </Stack>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">DOM preview</Typography>
                    <Stack spacing={0.8} sx={{ mt: 1 }}>
                        {nodes.map((node, index) => {
                            const isMatch = appliedSelector ? matchesSelector(node, appliedSelector) : false;
                            const descriptor = "<" + node.tag + (node.id ? " id=\"" + node.id + "\"" : "") + (node.className ? " class=\"" + node.className + "\"" : "") + ">";
                            return (
                                <Box
                                    key={node.label + index}
                                    sx={(theme) => ({
                                        px: 1,
                                        py: 0.8,
                                        borderRadius: 1,
                                        border: "1px solid",
                                        borderColor: isMatch ? theme.palette.success.main : theme.palette.divider,
                                        bgcolor: isMatch
                                            ? (theme.palette.mode === "dark" ? "rgba(46, 125, 50, 0.25)" : "rgba(46, 125, 50, 0.08)")
                                            : theme.palette.background.default
                                    })}
                                >
                                    <Typography variant="body2" sx={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>{descriptor}</Typography>
                                    <Typography variant="caption" color="text.secondary">{node.label}</Typography>
                                </Box>
                            );
                        })}
                    </Stack>
                </Paper>
            }
            output={
                <Alert severity={matchCount > 0 ? "success" : "warning"} variant="outlined">
                    Selector `{appliedSelector || "(empty)"}` matches {matchCount} element{matchCount === 1 ? "" : "s"}.
                </Alert>
            }
            note="Use presets to learn the pattern, then type your own selector and validate matches immediately."
        />
    );
}
