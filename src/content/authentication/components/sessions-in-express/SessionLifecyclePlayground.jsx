import { useMemo, useState } from "react";
import { Alert, Button, FormControlLabel, Paper, Stack, Switch, Typography } from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const INITIAL = {
    secureCookie: true,
    loggedIn: false,
    expired: false
};

export default function SessionLifecyclePlayground() {
    const [draft, setDraft] = useState(INITIAL);
    const [state, setState] = useState(INITIAL);

    const apply = () => setState(draft);
    const run = () => setState((prev) => ({ ...prev, loggedIn: true, expired: false }));
    const reset = () => {
        setDraft(INITIAL);
        setState(INITIAL);
    };

    const phase = useMemo(() => {
        if (!state.loggedIn) return "Anonymous request: no authenticated session.";
        if (state.expired) return "Session expired: server rejects protected route.";
        return "Authenticated session active: session ID maps to server-side user data.";
    }, [state]);

    return (
        <PlaygroundShell
            title="Express Session Lifecycle"
            goal="Simulate login, cookie flags, and expiry effects on protected routes."
            status={{ color: state.loggedIn && !state.expired ? "success" : "warning", label: state.loggedIn ? "session created" : "guest" }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 620 }}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={draft.secureCookie}
                                onChange={(event) => setDraft((prev) => ({ ...prev, secureCookie: event.target.checked }))}
                            />
                        }
                        label="Set cookie.secure=true"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={draft.expired}
                                onChange={(event) => setDraft((prev) => ({ ...prev, expired: event.target.checked }))}
                            />
                        }
                        label="Force session expiry"
                    />
                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" onClick={apply}>Apply</Button>
                        <Button variant="outlined" onClick={run}>Run</Button>
                        <Button variant="text" onClick={reset}>Reset</Button>
                    </Stack>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.2, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Cookie + server state</Typography>
                    <Typography sx={{ mt: 0.8, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                        {`cookie: ${state.secureCookie ? "Secure" : "Insecure"} | loggedIn: ${state.loggedIn} | expired: ${state.expired}`}
                    </Typography>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    <Alert severity="info" variant="outlined">{phase}</Alert>
                    {state.loggedIn && !state.secureCookie && (
                        <Alert severity="warning" variant="outlined">
                            In production, insecure cookies can leak session IDs over non-HTTPS channels.
                        </Alert>
                    )}
                </Stack>
            }
            code={
                <pre>
{`app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true, httpOnly: true, sameSite: "lax" }
}));`}
                </pre>
            }
        />
    );
}
