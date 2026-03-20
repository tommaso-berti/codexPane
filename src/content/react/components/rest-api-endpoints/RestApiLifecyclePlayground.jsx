import { useMemo, useState } from "react";
import { Alert, Button, FormControl, InputLabel, MenuItem, Paper, Select, Stack, Typography } from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const ENDPOINTS = {
    list_books: {
        method: "GET",
        path: "/books",
        success: "Returned 12 books. UI renders list view.",
        error: "503 Service Unavailable. Show retry and cached fallback if available."
    },
    create_book: {
        method: "POST",
        path: "/books",
        success: "201 Created. UI appends new item and clears form.",
        error: "400 Validation failed. Keep form state and show field errors."
    },
    delete_book: {
        method: "DELETE",
        path: "/books/:id",
        success: "204 No Content. UI removes deleted row immediately.",
        error: "404 Not Found. UI reconciles stale state and refetches list."
    }
};

const TIMELINE = ["idle", "loading", "resolved"];

export default function RestApiLifecyclePlayground() {
    const [draftEndpoint, setDraftEndpoint] = useState("list_books");
    const [draftScenario, setDraftScenario] = useState("success");
    const [draftRetry, setDraftRetry] = useState("none");

    const [state, setState] = useState({
        endpoint: "list_books",
        scenario: "success",
        retry: "none",
        stage: 0
    });

    const endpointInfo = ENDPOINTS[state.endpoint];
    const phase = TIMELINE[state.stage];
    const isResolved = phase === "resolved";
    const isSuccess = state.scenario === "success";

    const apply = () => {
        setState({
            endpoint: draftEndpoint,
            scenario: draftScenario,
            retry: draftRetry,
            stage: 0
        });
    };

    const run = () => {
        setState((prev) => ({ ...prev, stage: Math.min(prev.stage + 1, TIMELINE.length - 1) }));
    };

    const reset = () => {
        setDraftEndpoint("list_books");
        setDraftScenario("success");
        setDraftRetry("none");
        setState({
            endpoint: "list_books",
            scenario: "success",
            retry: "none",
            stage: 0
        });
    };

    const output = useMemo(() => {
        if (phase === "idle") return "No request in flight yet.";
        if (phase === "loading") return "Request started. Show spinner and disable duplicate submit.";
        if (isSuccess) return endpointInfo.success;
        if (state.retry === "immediate") return `${endpointInfo.error} Retry immediately with exponential backoff.`;
        if (state.retry === "manual") return `${endpointInfo.error} Ask user to retry after checking input/network.`;
        return endpointInfo.error;
    }, [endpointInfo, isSuccess, phase, state.retry]);

    return (
        <PlaygroundShell
            title="REST Request Lifecycle"
            goal="Simulate idle/loading/success/error transitions and choose a practical retry strategy."
            status={{ color: isResolved ? (isSuccess ? "success" : "warning") : "info", label: phase }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 640 }}>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2}>
                        <FormControl size="small" fullWidth>
                            <InputLabel id="api-endpoint">Endpoint</InputLabel>
                            <Select
                                labelId="api-endpoint"
                                label="Endpoint"
                                value={draftEndpoint}
                                onChange={(event) => setDraftEndpoint(event.target.value)}
                            >
                                <MenuItem value="list_books">GET /books</MenuItem>
                                <MenuItem value="create_book">POST /books</MenuItem>
                                <MenuItem value="delete_book">DELETE /books/:id</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl size="small" fullWidth>
                            <InputLabel id="api-scenario">Outcome</InputLabel>
                            <Select
                                labelId="api-scenario"
                                label="Outcome"
                                value={draftScenario}
                                onChange={(event) => setDraftScenario(event.target.value)}
                            >
                                <MenuItem value="success">Success</MenuItem>
                                <MenuItem value="error">Error</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                    <FormControl size="small" fullWidth>
                        <InputLabel id="api-retry">Retry strategy on error</InputLabel>
                        <Select
                            labelId="api-retry"
                            label="Retry strategy on error"
                            value={draftRetry}
                            onChange={(event) => setDraftRetry(event.target.value)}
                            disabled={draftScenario !== "error"}
                        >
                            <MenuItem value="none">No retry</MenuItem>
                            <MenuItem value="manual">Manual retry</MenuItem>
                            <MenuItem value="immediate">Auto retry with backoff</MenuItem>
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
                    <Typography variant="caption" color="text.secondary">Request context</Typography>
                    <Typography sx={{ mt: 0.8, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                        {`${endpointInfo.method} ${endpointInfo.path}`}
                    </Typography>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    <Alert severity={isResolved ? (isSuccess ? "success" : "warning") : "info"} variant="outlined">
                        {output}
                    </Alert>
                    <Alert severity="info" variant="outlined">
                        Keep UI states explicit: idle, loading, success, and error should each have a visible behavior.
                    </Alert>
                </Stack>
            }
            code={
                <pre>
{`setStatus("loading");
try {
  const data = await apiCall();
  setData(data);
  setStatus("success");
} catch (err) {
  setError(err.message);
  setStatus("error");
}`}
                </pre>
            }
        />
    );
}
