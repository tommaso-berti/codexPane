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
    TextField,
    Typography
} from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const SCENARIOS = {
    product: {
        label: "Product card",
        tree: "App -> ProductCard -> PriceTag"
    },
    profile: {
        label: "Profile card",
        tree: "App -> ProfileCard -> StatusBadge"
    },
    dashboard: {
        label: "Dashboard tile",
        tree: "App -> MetricTile -> TrendBadge"
    }
};

export default function ComponentsPlayground() {
    const [scenario, setScenario] = useState("product");
    const [propLabel, setPropLabel] = useState("Starter");
    const [renderCount, setRenderCount] = useState(0);

    const selected = SCENARIOS[scenario];

    const checks = useMemo(
        () => [
            { ok: propLabel.trim().length > 0, text: "Child component received a non-empty prop." },
            { ok: renderCount > 0, text: "Component tree rendered at least once." },
            { ok: true, text: `Current composition: ${selected.tree}` }
        ],
        [propLabel, renderCount, selected.tree]
    );

    return (
        <PlaygroundShell
            title="Component Composition Playground"
            goal="Understand how parent components pass props to nested children."
            status={{ color: "info", label: selected.label }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 560 }}>
                    <FormControl size="small">
                        <InputLabel id="components-scenario-label">Scenario</InputLabel>
                        <Select
                            labelId="components-scenario-label"
                            label="Scenario"
                            value={scenario}
                            onChange={(event) => setScenario(event.target.value)}
                        >
                            {Object.entries(SCENARIOS).map(([value, item]) => (
                                <MenuItem key={value} value={value}>{item.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        size="small"
                        label="Prop value passed to child"
                        value={propLabel}
                        onChange={(event) => setPropLabel(event.target.value)}
                    />

                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" onClick={() => setRenderCount((prev) => prev + 1)}>Run</Button>
                        <Button variant="outlined" onClick={() => { setRenderCount(0); setPropLabel("Starter"); }}>Reset</Button>
                    </Stack>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.4, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Tree preview</Typography>
                    <Typography variant="subtitle2" sx={{ mt: 1 }}>{selected.tree}</Typography>
                    <Typography variant="body2" color="text.secondary">Leaf prop: `{propLabel || "(empty)"}`</Typography>
                    <Typography variant="body2" color="text.secondary">Render runs: {renderCount}</Typography>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    {checks.map((item) => (
                        <Alert key={item.text} severity={item.ok ? "success" : "warning"} variant="outlined">
                            {item.text}
                        </Alert>
                    ))}
                </Stack>
            }
            note="Start from component boundaries: parent decides data, child decides how to render it."
        />
    );
}
