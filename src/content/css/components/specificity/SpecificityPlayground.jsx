import { useMemo, useState } from "react";
import {
    Alert,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    Typography
} from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const RULES = {
    pairA: {
        target: "<button id=\"buy\" class=\"btn primary\">",
        one: { label: ".btn.primary", score: [0, 0, 2, 0], color: "primary" },
        two: { label: "#buy", score: [0, 1, 0, 0], color: "success" },
        orderNote: "Source order matters only when specificity is equal."
    },
    pairB: {
        target: "<a class=\"link\" aria-current=\"page\">",
        one: { label: "a.link", score: [0, 0, 1, 1], color: "primary" },
        two: { label: "a[aria-current='page']", score: [0, 0, 1, 1], color: "warning" },
        orderNote: "Both selectors tie. The later rule in CSS wins."
    }
};

function scoreToText(score) {
    return score.join("-");
}

function compareScores(a, b) {
    for (let i = 0; i < a.length; i += 1) {
        if (a[i] > b[i]) return 1;
        if (a[i] < b[i]) return -1;
    }
    return 0;
}

export default function SpecificityPlayground() {
    const [pair, setPair] = useState("pairA");
    const [laterRule, setLaterRule] = useState("two");

    const data = RULES[pair];

    const result = useMemo(() => {
        const cmp = compareScores(data.one.score, data.two.score);
        if (cmp > 0) {
            return { winner: "one", reason: "Rule 1 wins due to higher specificity." };
        }
        if (cmp < 0) {
            return { winner: "two", reason: "Rule 2 wins due to higher specificity." };
        }
        return {
            winner: laterRule,
            reason: "Specificity tie: later source order wins."
        };
    }, [data, laterRule]);

    return (
        <PlaygroundShell
            title="Specificity Playground"
            goal="Understand why one CSS rule wins when multiple selectors target the same element."
            status={{ color: result.winner === "one" ? data.one.color : data.two.color, label: "Winner: Rule " + (result.winner === "one" ? "1" : "2") }}
            controls={
                <Stack spacing={1.4} sx={{ maxWidth: 560 }}>
                    <FormControl size="small">
                        <InputLabel id="specificity-pair-label">Rule set</InputLabel>
                        <Select
                            labelId="specificity-pair-label"
                            label="Rule set"
                            value={pair}
                            onChange={(event) => setPair(event.target.value)}
                        >
                            <MenuItem value="pairA">ID vs class selector</MenuItem>
                            <MenuItem value="pairB">Tie with source order</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl size="small" disabled={pair !== "pairB"}>
                        <InputLabel id="specificity-order-label">Later rule in CSS</InputLabel>
                        <Select
                            labelId="specificity-order-label"
                            label="Later rule in CSS"
                            value={laterRule}
                            onChange={(event) => setLaterRule(event.target.value)}
                        >
                            <MenuItem value="one">Rule 1 is later</MenuItem>
                            <MenuItem value="two">Rule 2 is later</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Target element</Typography>
                    <Typography sx={{ mt: 1, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>{data.target}</Typography>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    <Alert severity={result.winner === "one" ? "success" : "info"} variant="outlined">Rule 1: {data.one.label} specificity score {scoreToText(data.one.score)}</Alert>
                    <Alert severity={result.winner === "two" ? "success" : "info"} variant="outlined">Rule 2: {data.two.label} specificity score {scoreToText(data.two.score)}</Alert>
                    <Alert severity="warning" variant="outlined">{result.reason} {data.orderNote}</Alert>
                </Stack>
            }
            note="Specificity compares ID, class/attribute/pseudo-class, then element selectors. Source order breaks ties."
        />
    );
}
