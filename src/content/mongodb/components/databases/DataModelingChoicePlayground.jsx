import { useMemo, useState } from "react";
import {
    Alert,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    Typography
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const SCENARIOS = {
    userProfile: {
        label: "User profile + settings",
        recommendation: "embed",
        rationale: "Profile and settings are usually read together and grow predictably."
    },
    blogComments: {
        label: "Post + many comments",
        recommendation: "reference",
        rationale: "Comments can grow unbounded, so separate collections are safer."
    },
    orderItems: {
        label: "Order + fixed line items",
        recommendation: "embed",
        rationale: "Orders are typically read as one unit and item count is bounded."
    }
};

const ACCESS_PATTERNS = {
    together: { label: "Mostly read together", embedBoost: 2, referenceBoost: 0 },
    separate: { label: "Mostly read separately", embedBoost: 0, referenceBoost: 2 },
    mixed: { label: "Mixed reads", embedBoost: 1, referenceBoost: 1 }
};

function scoreModel(scenarioKey, accessPatternKey) {
    const scenario = SCENARIOS[scenarioKey];
    const accessPattern = ACCESS_PATTERNS[accessPatternKey];

    const base = scenario.recommendation === "embed"
        ? { embed: 2, reference: 1 }
        : { embed: 1, reference: 2 };

    const scores = {
        embed: base.embed + accessPattern.embedBoost,
        reference: base.reference + accessPattern.referenceBoost
    };

    const recommendation = scores.embed >= scores.reference ? "Embed" : "Reference";

    return { recommendation, scores, rationale: scenario.rationale };
}

export default function DataModelingChoicePlayground() {
    const [scenario, setScenario] = useState("userProfile");
    const [accessPattern, setAccessPattern] = useState("together");
    const [result, setResult] = useState(() => scoreModel("userProfile", "together"));

    const tradeoffs = useMemo(() => {
        const isEmbed = result.recommendation === "Embed";
        return [
            {
                label: "Flexibility",
                text: isEmbed ? "Fast reads for related data" : "Better for independently evolving entities",
                severity: isEmbed ? "success" : "info"
            },
            {
                label: "Consistency",
                text: isEmbed ? "Single-document updates are straightforward" : "Requires coordinating related documents",
                severity: isEmbed ? "success" : "warning"
            },
            {
                label: "Query complexity",
                text: isEmbed ? "Simpler reads, fewer joins/lookups" : "More explicit queries across collections",
                severity: isEmbed ? "success" : "warning"
            }
        ];
    }, [result.recommendation]);

    return (
        <PlaygroundShell
            title="Data Modeling Choice Playground"
            goal="Choose between embedding and referencing based on read patterns and growth behavior."
            status={{
                color: result.recommendation === "Embed" ? "success" : "info",
                label: `Recommended: ${result.recommendation}`
            }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 640 }}>
                    <FormControl size="small" sx={{ minWidth: 280 }}>
                        <InputLabel id="scenario-label">Scenario</InputLabel>
                        <Select
                            labelId="scenario-label"
                            label="Scenario"
                            value={scenario}
                            onChange={(event) => setScenario(event.target.value)}
                        >
                            {Object.entries(SCENARIOS).map(([key, value]) => (
                                <MenuItem key={key} value={key}>{value.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl size="small" sx={{ minWidth: 280 }}>
                        <InputLabel id="access-pattern-label">Access pattern</InputLabel>
                        <Select
                            labelId="access-pattern-label"
                            label="Access pattern"
                            value={accessPattern}
                            onChange={(event) => setAccessPattern(event.target.value)}
                        >
                            {Object.entries(ACCESS_PATTERNS).map(([key, value]) => (
                                <MenuItem key={key} value={key}>{value.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Stack direction="row" spacing={1}>
                        <Button
                            variant="contained"
                            onClick={() => setResult(scoreModel(scenario, accessPattern))}
                        >
                            Apply
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                setScenario("userProfile");
                                setAccessPattern("together");
                                setResult(scoreModel("userProfile", "together"));
                            }}
                        >
                            Reset
                        </Button>
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
                    <Typography variant="caption" color="text.secondary">Model recommendation</Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        {result.rationale}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                        embed={result.scores.embed} | reference={result.scores.reference}
                    </Typography>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    {tradeoffs.map((item) => (
                        <Alert key={item.label} severity={item.severity} variant="outlined">
                            <strong>{item.label}:</strong> {item.text}
                        </Alert>
                    ))}
                </Stack>
            }
            note="Use embedding when related data is read together and bounded. Use references when relationships grow large or evolve independently."
        />
    );
}
