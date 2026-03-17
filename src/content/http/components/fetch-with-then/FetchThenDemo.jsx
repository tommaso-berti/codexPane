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
    success: {
        label: "Success (200)",
        responseOk: true,
        networkFails: false,
        status: 200
    },
    httpError: {
        label: "HTTP error (404)",
        responseOk: false,
        networkFails: false,
        status: 404
    },
    networkError: {
        label: "Network failure",
        responseOk: false,
        networkFails: true,
        status: 0
    }
};

export default function FetchThenDemo() {
    const [scenario, setScenario] = useState("success");
    const [step, setStep] = useState(0);

    const trace = useMemo(() => {
        const selected = SCENARIOS[scenario];
        const lines = ["fetch(url)"];

        if (step >= 1) {
            if (selected.networkFails) {
                lines.push("network error -> second .then argument or .catch");
            } else {
                lines.push(`first .then receives response (status ${selected.status})`);
            }
        }

        if (step >= 2 && !selected.networkFails) {
            if (selected.responseOk) {
                lines.push("response.ok === true -> return response.json()");
            } else {
                lines.push("response.ok === false -> throw Error(HTTP status)");
            }
        }

        if (step >= 3) {
            if (selected.networkFails || !selected.responseOk) {
                lines.push(".catch handles the error path");
            } else {
                lines.push("second .then receives parsed JSON");
            }
        }

        return lines;
    }, [scenario, step]);

    const completion = trace.length - 1;

    return (
        <PlaygroundShell
            title="Fetch .then() Flow Playground"
            goal="Practice where success and error paths go inside a chained .then() flow."
            status={{
                color: completion >= 3 ? "success" : "info",
                label: `Step ${Math.min(step, 3)}/3`
            }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 620 }}>
                    <FormControl size="small">
                        <InputLabel id="then-scenario-label">Scenario</InputLabel>
                        <Select
                            labelId="then-scenario-label"
                            label="Scenario"
                            value={scenario}
                            onChange={(event) => {
                                setScenario(event.target.value);
                                setStep(0);
                            }}
                        >
                            {Object.entries(SCENARIOS).map(([key, value]) => (
                                <MenuItem key={key} value={key}>{value.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" onClick={() => setStep((prev) => Math.min(prev + 1, 3))}>
                            Apply next step
                        </Button>
                        <Button variant="outlined" onClick={() => setStep(0)}>
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
                    <Typography variant="caption" color="text.secondary">Chain trace</Typography>
                    <pre style={{ margin: "8px 0 0", fontSize: 12, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{trace.join("\n")}</pre>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    <Alert severity={scenario === "success" ? "success" : "warning"} variant="outlined">
                        {scenario === "success"
                            ? "Success path reaches the data handler in the second .then()."
                            : "Error path reaches rejection handling (.catch or second .then argument)."}
                    </Alert>
                    <Alert severity="info" variant="outlined">
                        Key rule: non-2xx HTTP still resolves fetch; you must check `response.ok` and throw manually.
                    </Alert>
                </Stack>
            }
            note="Use `.catch` as a single terminal handler so both network failures and thrown HTTP errors are visible in one place."
        />
    );
}
