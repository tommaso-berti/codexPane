import { useMemo, useState } from "react";
import { Alert, FormControl, InputLabel, MenuItem, Paper, Select, Stack, Typography } from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const CASES = {
    "login-password": {
        prompt: "User enters email and password on sign-in page.",
        answer: "Authentication",
        why: "The system verifies user identity."
    },
    "admin-route": {
        prompt: "Signed-in user tries to access /admin/reports.",
        answer: "Authorization",
        why: "The system checks permission level for a protected action."
    },
    "https-data": {
        prompt: "Browser sends card data over HTTPS.",
        answer: "Encryption",
        why: "Data is transformed in transit to prevent plaintext exposure."
    }
};

export default function SecurityDecisionPlayground() {
    const [scenario, setScenario] = useState("login-password");
    const [selected, setSelected] = useState("Authentication");

    const current = CASES[scenario];
    const isCorrect = useMemo(() => selected === current.answer, [selected, current.answer]);

    return (
        <PlaygroundShell
            title="Security Decision Playground"
            goal="Distinguish authentication, authorization, and encryption by scenario."
            status={{ color: isCorrect ? "success" : "warning", label: isCorrect ? "correct match" : "check your mapping" }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 620 }}>
                    <FormControl size="small">
                        <InputLabel id="security-scenario-label">Scenario</InputLabel>
                        <Select
                            labelId="security-scenario-label"
                            label="Scenario"
                            value={scenario}
                            onChange={(event) => setScenario(event.target.value)}
                        >
                            <MenuItem value="login-password">Login credentials verification</MenuItem>
                            <MenuItem value="admin-route">Protected route access</MenuItem>
                            <MenuItem value="https-data">Sensitive data over HTTPS</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl size="small">
                        <InputLabel id="security-type-label">Security concept</InputLabel>
                        <Select
                            labelId="security-type-label"
                            label="Security concept"
                            value={selected}
                            onChange={(event) => setSelected(event.target.value)}
                        >
                            <MenuItem value="Authentication">Authentication</MenuItem>
                            <MenuItem value="Authorization">Authorization</MenuItem>
                            <MenuItem value="Encryption">Encryption</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.2, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Scenario detail</Typography>
                    <Typography variant="body2" sx={{ mt: 0.8 }}>{current.prompt}</Typography>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    <Alert severity={isCorrect ? "success" : "warning"} variant="outlined">
                        Expected: {current.answer}. {current.why}
                    </Alert>
                    {!isCorrect && (
                        <Alert severity="info" variant="outlined">
                            Tip: ask whether you are verifying identity, permission, or data confidentiality.
                        </Alert>
                    )}
                </Stack>
            }
            note="Use these three concepts together: authenticate identity, authorize actions, and encrypt sensitive data."
        />
    );
}
