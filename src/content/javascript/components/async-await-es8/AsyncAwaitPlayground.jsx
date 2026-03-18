import { useMemo, useState } from "react";
import {
    Alert,
    Button,
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
import { alpha } from "@mui/material/styles";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const SCENARIOS = {
    sequential: {
        label: "Sequential awaits",
        trace: ["await task A", "await task B", "total time ~ A + B"],
        summary: "Sequential awaits are simpler but accumulate latency."
    },
    concurrent: {
        label: "Concurrent awaits",
        trace: ["start task A and B", "await both promises", "total time ~ max(A, B)"],
        summary: "Concurrent awaits reduce total waiting when tasks are independent."
    },
    error: {
        label: "Error handling",
        trace: ["await request", "response not ok", "throw Error", "catch handles failure"],
        summary: "Use try/catch plus response.ok guard for robust async flows."
    }
};

export default function AsyncAwaitPlayground() {
    const [scenario, setScenario] = useState("sequential");
    const [useGuard, setUseGuard] = useState(true);
    const [ran, setRan] = useState(false);

    const result = useMemo(() => {
        const selected = SCENARIOS[scenario];
        if (scenario !== "error") {
            return {
                severity: "info",
                trace: selected.trace,
                message: selected.summary
            };
        }

        if (useGuard) {
            return {
                severity: "success",
                trace: selected.trace,
                message: "Guard enabled: HTTP failure is converted into a catchable error."
            };
        }

        return {
            severity: "warning",
            trace: ["await request", "response not ok", "no guard used", "flow continues incorrectly"],
            message: "Without response.ok guard, non-2xx responses may be treated as success."
        };
    }, [scenario, useGuard]);

    return (
        <PlaygroundShell
            title="Async Await Execution Flow Playground"
            goal="Compare sequential/concurrent awaits and understand why response guards matter."
            status={{ color: ran ? "success" : "info", label: ran ? "last run ready" : "not run" }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 640 }}>
                    <FormControl size="small" sx={{ minWidth: 240 }}>
                        <InputLabel id="await-scenario-label">Scenario</InputLabel>
                        <Select labelId="await-scenario-label" label="Scenario" value={scenario} onChange={(event) => setScenario(event.target.value)}>
                            {Object.entries(SCENARIOS).map(([key, value]) => (
                                <MenuItem key={key} value={key}>{value.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControlLabel
                        control={<Switch checked={useGuard} onChange={(event) => setUseGuard(event.target.checked)} />}
                        label="Use response.ok guard"
                    />

                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" onClick={() => setRan(true)}>Run</Button>
                        <Button variant="outlined" onClick={() => { setScenario("sequential"); setUseGuard(true); setRan(false); }}>Reset</Button>
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
                    <Typography variant="caption" color="text.secondary">Flow summary</Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>{result.message}</Typography>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    <Paper variant="outlined" sx={{ p: 1.2, borderRadius: 2 }}>
                        <Typography variant="caption" color="text.secondary">Execution trace</Typography>
                        <Stack spacing={0.4} sx={{ mt: 1 }}>
                            {result.trace.map((line) => (
                                <Typography key={line} variant="body2" sx={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>{line}</Typography>
                            ))}
                        </Stack>
                    </Paper>
                    <Alert severity={result.severity} variant="outlined">{result.message}</Alert>
                </Stack>
            }
            code={
                <pre>{`async function runFlow() {
  try {
    ${scenario === "concurrent" ? "const [a, b] = await Promise.all([taskA(), taskB()]);" : "const a = await taskA();\n    const b = await taskB();"}
    const response = await fetch("/api/data");
    ${useGuard ? "if (!response.ok) throw new Error(\"Request failed\");" : "// no response.ok guard"}
    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
}`}</pre>
            }
            note="`await` improves readability, but explicit error checks still define correctness."
        />
    );
}
