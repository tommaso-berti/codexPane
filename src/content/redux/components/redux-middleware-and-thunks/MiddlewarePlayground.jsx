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
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const SCENARIOS = {
    success: {
        label: "Fulfilled request",
        steps: [
            "users/fetchUserById/pending",
            "users/fetchUserById/fulfilled"
        ],
        final: "success"
    },
    error: {
        label: "Rejected request",
        steps: [
            "users/fetchUserById/pending",
            "users/fetchUserById/rejected"
        ],
        final: "error"
    }
};

export default function MiddlewarePlayground() {
    const [scenario, setScenario] = useState("success");
    const [runCount, setRunCount] = useState(0);

    const selected = SCENARIOS[scenario];

    const run = () => setRunCount((prev) => prev + 1);
    const reset = () => setRunCount(0);

    const checks = useMemo(
        () => [
            { ok: true, text: "Middleware sees pending action first." },
            { ok: true, text: `Lifecycle ends with ${selected.final}.` },
            { ok: runCount > 0, text: "Pipeline executed at least once." }
        ],
        [runCount, selected.final]
    );

    return (
        <PlaygroundShell
            title="Thunk Lifecycle Pipeline Playground"
            goal="Visualize deterministic pending/fulfilled/rejected flow through middleware." 
            status={{ color: selected.final === "success" ? "success" : "error", label: selected.label }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 620 }}>
                    <FormControl size="small">
                        <InputLabel id="thunk-scenario-label">Scenario</InputLabel>
                        <Select
                            labelId="thunk-scenario-label"
                            label="Scenario"
                            value={scenario}
                            onChange={(event) => setScenario(event.target.value)}
                        >
                            <MenuItem value="success">Fulfilled request</MenuItem>
                            <MenuItem value="error">Rejected request</MenuItem>
                        </Select>
                    </FormControl>

                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" onClick={run}>Run</Button>
                        <Button variant="outlined" onClick={reset}>Reset</Button>
                    </Stack>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.4, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Lifecycle trace</Typography>
                    <Stack component="ol" sx={{ mt: 1, pl: 2, mb: 0 }} spacing={0.5}>
                        {selected.steps.map((step) => (
                            <Typography component="li" key={step} variant="body2">{step}</Typography>
                        ))}
                    </Stack>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    {checks.map((item) => (
                        <Alert key={item.text} severity={item.ok ? "success" : "warning"} variant="outlined">
                            {item.text}
                        </Alert>
                    ))}
                    <Alert severity="info" variant="outlined">Simulation runs: {runCount}</Alert>
                </Stack>
            }
            code={
                <pre>{`export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (id) => {
    ${scenario === "success" ? 'return { id, name: "Ada" };' : 'throw new Error("Request failed");'}
  }
);

dispatch(fetchUserById("42"));
// lifecycle
${selected.steps.map((step) => `// -> ${step}`).join("\n")}
`}</pre>
            }
            note="For teaching async flow, deterministic scenarios are clearer than random network timing."
        />
    );
}
