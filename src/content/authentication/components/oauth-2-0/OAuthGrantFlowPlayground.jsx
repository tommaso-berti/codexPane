import { useMemo, useState } from "react";
import { Alert, Button, FormControl, InputLabel, MenuItem, Paper, Select, Stack, Typography } from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const FLOWS = {
    authorization_code_pkce: [
        "User is redirected to authorization server",
        "User approves requested scopes",
        "Client receives authorization code",
        "Client exchanges code (+ verifier) for access token",
        "Client calls resource API with bearer token"
    ],
    client_credentials: [
        "Machine client sends client_id + secret",
        "Authorization server validates confidential client",
        "Access token issued (no end-user context)",
        "Service calls API with token"
    ],
    device_code: [
        "Device asks authorization server for device code",
        "User completes verification on second device",
        "Device polls token endpoint",
        "Access token issued when user confirms"
    ]
};

export default function OAuthGrantFlowPlayground() {
    const [draftFlow, setDraftFlow] = useState("authorization_code_pkce");
    const [flow, setFlow] = useState("authorization_code_pkce");
    const [step, setStep] = useState(0);

    const steps = FLOWS[flow];
    const active = steps[Math.min(step, steps.length - 1)];

    const apply = () => {
        setFlow(draftFlow);
        setStep(0);
    };

    const run = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
    const reset = () => {
        setDraftFlow("authorization_code_pkce");
        setFlow("authorization_code_pkce");
        setStep(0);
    };

    const tokenContext = useMemo(() => {
        if (flow === "client_credentials") return "Token represents the application itself.";
        return "Token represents delegated access granted by a user.";
    }, [flow]);

    return (
        <PlaygroundShell
            title="OAuth Grant Flow Simulator"
            goal="Compare grant types and trace token issuance step by step."
            status={{ color: "info", label: `${step + 1}/${steps.length}` }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 650 }}>
                    <FormControl size="small" fullWidth>
                        <InputLabel id="oauth-flow">Grant flow</InputLabel>
                        <Select
                            labelId="oauth-flow"
                            label="Grant flow"
                            value={draftFlow}
                            onChange={(event) => setDraftFlow(event.target.value)}
                        >
                            <MenuItem value="authorization_code_pkce">Authorization Code + PKCE</MenuItem>
                            <MenuItem value="client_credentials">Client Credentials</MenuItem>
                            <MenuItem value="device_code">Device Code</MenuItem>
                        </Select>
                    </FormControl>
                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" onClick={apply}>Apply</Button>
                        <Button variant="outlined" onClick={run}>Run</Button>
                        <Button variant="text" onClick={reset}>Reset</Button>
                    </Stack>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.2, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Current step</Typography>
                    <Typography sx={{ mt: 0.8 }}>{active}</Typography>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    <Alert severity="info" variant="outlined">{tokenContext}</Alert>
                    <Alert severity="success" variant="outlined">
                        Final API access is allowed only after a valid token is presented.
                    </Alert>
                </Stack>
            }
            code={
                <pre>
{`POST /oauth/token
grant_type=authorization_code
code=...
code_verifier=...
-> { access_token, expires_in, scope }`}
                </pre>
            }
        />
    );
}
