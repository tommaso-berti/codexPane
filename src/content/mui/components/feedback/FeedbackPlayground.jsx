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
    saved: {
        label: "Background save",
        channel: "Snackbar",
        risk: "low",
        description: "Non-blocking confirmation after user action."
    },
    destructive: {
        label: "Delete confirmation",
        channel: "Dialog",
        risk: "high",
        description: "User must confirm before irreversible changes."
    },
    loading: {
        label: "Long-running sync",
        channel: "Progress",
        risk: "medium",
        description: "Show progress while action is running."
    }
};

export default function FeedbackPlayground() {
    const [scenario, setScenario] = useState("saved");
    const [severity, setSeverity] = useState("info");
    const [result, setResult] = useState("Select a scenario, then run feedback.");

    const selected = SCENARIOS[scenario];

    const checks = useMemo(
        () => [
            { ok: selected.channel === "Dialog" ? selected.risk === "high" : true, text: "High-risk actions should block with confirmation." },
            { ok: selected.channel !== "Snackbar" || selected.risk === "low", text: "Snackbar is best for low-risk, quick feedback." },
            { ok: true, text: `Channel chosen: ${selected.channel}` }
        ],
        [selected.channel, selected.risk]
    );

    const run = () => {
        setResult(`${selected.channel} triggered for "${selected.label}" with ${severity} tone.`);
    };

    const reset = () => {
        setScenario("saved");
        setSeverity("info");
        setResult("Reset complete.");
    };

    return (
        <PlaygroundShell
            title="Feedback Channel Playground"
            goal="Choose the right feedback channel based on action risk and user interruption level."
            status={{ color: severity, label: selected.channel }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 560 }}>
                    <FormControl size="small">
                        <InputLabel id="feedback-scenario-label">Scenario</InputLabel>
                        <Select
                            labelId="feedback-scenario-label"
                            label="Scenario"
                            value={scenario}
                            onChange={(event) => setScenario(event.target.value)}
                        >
                            {Object.entries(SCENARIOS).map(([value, item]) => (
                                <MenuItem key={value} value={value}>{item.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl size="small">
                        <InputLabel id="feedback-severity-label">Severity</InputLabel>
                        <Select
                            labelId="feedback-severity-label"
                            label="Severity"
                            value={severity}
                            onChange={(event) => setSeverity(event.target.value)}
                        >
                            {[
                                { value: "info", label: "Info" },
                                { value: "success", label: "Success" },
                                { value: "warning", label: "Warning" },
                                { value: "error", label: "Error" }
                            ].map((option) => (
                                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                            ))}
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
                    <Typography variant="caption" color="text.secondary">Channel preview</Typography>
                    <Alert severity={severity} variant="outlined" sx={{ mt: 1 }}>
                        {selected.channel}: {selected.description}
                    </Alert>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    <Alert severity={severity} variant="outlined">{result}</Alert>
                    {checks.map((item) => (
                        <Alert key={item.text} severity={item.ok ? "success" : "warning"} variant="outlined">
                            {item.text}
                        </Alert>
                    ))}
                </Stack>
            }
            note="Use blocking feedback only when user decisions are risky; keep low-risk confirmations lightweight."
        />
    );
}
