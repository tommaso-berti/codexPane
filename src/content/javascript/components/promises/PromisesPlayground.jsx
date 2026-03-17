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
    resolve: {
        label: "Resolve",
        trace: ["Promise created", "then: value received", "final state: fulfilled"],
        finalState: "fulfilled",
        summary: "Resolved promises execute the next then-handler."
    },
    reject: {
        label: "Reject",
        trace: ["Promise created", "reject: error thrown", "catch: handled error", "final state: rejected"],
        finalState: "rejected",
        summary: "Rejected promises skip then and jump to catch."
    },
    chain: {
        label: "Chain",
        trace: ["then1: got 2", "then2: returned 6", "then3: final 10", "final state: fulfilled"],
        finalState: "fulfilled",
        summary: "Each then can transform and pass a value to the next step."
    },
    all: {
        label: "Promise.all",
        trace: ["Start A, B, C concurrently", "A fulfilled", "B fulfilled", "C fulfilled", "Promise.all fulfilled"],
        finalState: "fulfilled",
        summary: "Promise.all resolves only when all input promises resolve."
    }
};

export default function PromisesPlayground() {
    const [scenario, setScenario] = useState("resolve");
    const [step, setStep] = useState(1);

    const current = SCENARIOS[scenario];
    const visibleTrace = useMemo(() => current.trace.slice(0, step), [current.trace, step]);

    return (
        <PlaygroundShell
            title="Promise State Flow Playground"
            goal="Understand how promise states move through then/catch chains in common scenarios."
            status={{
                color: current.finalState === "fulfilled" ? "success" : "warning",
                label: `step ${Math.min(step, current.trace.length)}/${current.trace.length}`
            }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 620 }}>
                    <FormControl size="small" sx={{ minWidth: 220 }}>
                        <InputLabel id="promise-scenario-label">Scenario</InputLabel>
                        <Select
                            labelId="promise-scenario-label"
                            label="Scenario"
                            value={scenario}
                            onChange={(event) => {
                                setScenario(event.target.value);
                                setStep(1);
                            }}
                        >
                            {Object.entries(SCENARIOS).map(([key, value]) => (
                                <MenuItem key={key} value={key}>{value.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" onClick={() => setStep((prev) => Math.min(prev + 1, current.trace.length))}>Apply</Button>
                        <Button variant="outlined" onClick={() => setStep(1)}>Reset</Button>
                    </Stack>
                </Stack>
            }
            preview={
                <Paper
                    variant="outlined"
                    sx={(theme) => ({
                        p: 1.3,
                        borderRadius: 2,
                        bgcolor: theme.palette.mode === "dark" ? alpha(theme.palette.common.white, 0.04) : alpha(theme.palette.common.black, 0.02)
                    })}
                >
                    <Typography variant="caption" color="text.secondary">Scenario insight</Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>{current.summary}</Typography>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    <Paper variant="outlined" sx={{ p: 1.2, borderRadius: 2 }}>
                        <Typography variant="caption" color="text.secondary">Execution trace</Typography>
                        <Stack spacing={0.4} sx={{ mt: 1 }}>
                            {visibleTrace.map((line) => (
                                <Typography key={line} variant="body2" sx={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                                    {line}
                                </Typography>
                            ))}
                        </Stack>
                    </Paper>
                    <Alert severity={current.finalState === "fulfilled" ? "success" : "warning"} variant="outlined">
                        Final state: {current.finalState}
                    </Alert>
                </Stack>
            }
            note="Promise chains are easier to reason about when you model state transitions explicitly: pending -> fulfilled/rejected."
        />
    );
}
