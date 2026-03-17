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
    success: { label: "200 success", status: 200, networkError: false },
    http500: { label: "500 response", status: 500, networkError: false },
    network: { label: "Network error", status: 0, networkError: true }
};

export default function FetchAwaitDemo() {
    const [draftScenario, setDraftScenario] = useState("success");
    const [draftGuardResponseOk, setDraftGuardResponseOk] = useState(true);
    const [applied, setApplied] = useState({ scenario: "success", guardResponseOk: true });

    const result = useMemo(() => {
        const selected = SCENARIOS[applied.scenario];

        if (selected.networkError) {
            return {
                finalState: "catch",
                message: "fetch throws before a response object exists.",
                severity: "error",
                trace: ["try {", "  await fetch(...) throws network error", "} catch (err) { handle err }"]
            };
        }

        const hasHttpError = selected.status >= 400;
        if (hasHttpError && applied.guardResponseOk) {
            return {
                finalState: "catch",
                message: "Guard catches non-OK HTTP and routes to catch.",
                severity: "warning",
                trace: [
                    "try {",
                    "  const res = await fetch(...)",
                    `  if (!res.ok) throw Error('HTTP ${selected.status}')`,
                    "} catch (err) { handle err }"
                ]
            };
        }

        if (hasHttpError && !applied.guardResponseOk) {
            return {
                finalState: "data path",
                message: "Without the guard, async flow continues as if request succeeded.",
                severity: "warning",
                trace: [
                    "try {",
                    "  const res = await fetch(...)",
                    "  // missing !res.ok guard",
                    "  const data = await res.json()",
                    "}"
                ]
            };
        }

        return {
            finalState: "data path",
            message: "Request is OK and data is parsed in the happy path.",
            severity: "success",
            trace: [
                "try {",
                "  const res = await fetch(...)",
                "  if (!res.ok) throw Error(...)",
                "  const data = await res.json()",
                "}"
            ]
        };
    }, [applied.guardResponseOk, applied.scenario]);

    return (
        <PlaygroundShell
            title="Async/Await Error Guard Playground"
            goal="Understand why `if (!response.ok) throw ...` is essential inside async/await flows."
            status={{
                color: result.severity === "success" ? "success" : "warning",
                label: result.finalState
            }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 620 }}>
                    <FormControl size="small">
                        <InputLabel id="await-scenario-label">Scenario</InputLabel>
                        <Select
                            labelId="await-scenario-label"
                            label="Scenario"
                            value={draftScenario}
                            onChange={(event) => setDraftScenario(event.target.value)}
                        >
                            {Object.entries(SCENARIOS).map(([key, value]) => (
                                <MenuItem key={key} value={key}>{value.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControlLabel
                        control={
                            <Switch
                                checked={draftGuardResponseOk}
                                onChange={(event) => setDraftGuardResponseOk(event.target.checked)}
                            />
                        }
                        label="Use response.ok guard"
                    />

                    <Stack direction="row" spacing={1}>
                        <Button
                            variant="contained"
                            onClick={() => setApplied({ scenario: draftScenario, guardResponseOk: draftGuardResponseOk })}
                        >
                            Run
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                setDraftScenario("success");
                                setDraftGuardResponseOk(true);
                                setApplied({ scenario: "success", guardResponseOk: true });
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
                    <Typography variant="caption" color="text.secondary">Flow trace</Typography>
                    <pre style={{ margin: "8px 0 0", fontSize: 12, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{result.trace.join("\n")}</pre>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    <Alert severity={result.severity} variant="outlined">
                        {result.message}
                    </Alert>
                    <Alert severity="info" variant="outlined">
                        Async/await improves readability, but correctness still depends on explicit HTTP status checks.
                    </Alert>
                </Stack>
            }
            note="`try/catch` catches thrown errors and network failures. Add `response.ok` checks to include HTTP failures too."
        />
    );
}
