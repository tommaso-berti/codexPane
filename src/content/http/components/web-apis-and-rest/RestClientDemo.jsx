import { useMemo, useState } from "react";
import {
    Alert,
    Box,
    Button,
    Chip,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const SCENARIOS = {
    listCustomers: {
        label: "List customers",
        method: "GET",
        path: "/customers",
        body: "",
        expectedStatus: 200,
        note: "Collection read"
    },
    createCustomer: {
        label: "Create customer",
        method: "POST",
        path: "/customers",
        body: '{\n  "name": "Ava Stone",\n  "email": "ava@example.com"\n}',
        expectedStatus: 201,
        note: "Resource creation"
    },
    updateCustomer: {
        label: "Update customer",
        method: "PUT",
        path: "/customers/42",
        body: '{\n  "email": "ava.new@example.com"\n}',
        expectedStatus: 200,
        note: "Resource update"
    },
    deleteCustomer: {
        label: "Delete customer",
        method: "DELETE",
        path: "/customers/42",
        body: "",
        expectedStatus: 204,
        note: "Resource removal"
    }
};

function buildSimulatedResponse(method, path, body) {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    const hasId = /^\/customers\/\d+$/.test(normalizedPath);

    if (method === "GET" && normalizedPath === "/customers") {
        return { status: 200, message: "Returned customer collection.", severity: "success" };
    }

    if (method === "POST" && normalizedPath === "/customers") {
        if (!body.trim()) {
            return { status: 400, message: "Missing JSON payload for POST.", severity: "warning" };
        }
        return { status: 201, message: "Created a new customer.", severity: "success" };
    }

    if (method === "PUT" && hasId) {
        if (!body.trim()) {
            return { status: 400, message: "PUT requires a body with updated fields.", severity: "warning" };
        }
        return { status: 200, message: "Updated customer 42.", severity: "success" };
    }

    if (method === "DELETE" && hasId) {
        return { status: 204, message: "Deleted customer 42.", severity: "info" };
    }

    return { status: 404, message: "Route not found for this method/path pair.", severity: "error" };
}

export default function RestClientDemo() {
    const [scenario, setScenario] = useState("listCustomers");
    const [method, setMethod] = useState(SCENARIOS.listCustomers.method);
    const [path, setPath] = useState(SCENARIOS.listCustomers.path);
    const [body, setBody] = useState(SCENARIOS.listCustomers.body);
    const [result, setResult] = useState(buildSimulatedResponse("GET", "/customers", ""));

    const expectedStatus = SCENARIOS[scenario].expectedStatus;

    const doesNeedBody = method === "POST" || method === "PUT" || method === "PATCH";

    const requestLine = useMemo(() => `${method} ${path.startsWith("/") ? path : `/${path}`} HTTP/1.1`, [method, path]);
    const requestPreview = useMemo(() => {
        const lines = [requestLine, "Host: api.example.dev", "Accept: application/json"];
        if (doesNeedBody) {
            lines.push("Content-Type: application/json");
        }
        if (doesNeedBody && body.trim()) {
            lines.push("", body);
        }
        return lines.join("\n");
    }, [body, doesNeedBody, requestLine]);

    const checks = [
        {
            ok: path.startsWith("/"),
            text: "Path starts with /"
        },
        {
            ok: !doesNeedBody || body.trim().length > 0,
            text: doesNeedBody ? "Body is present for write operation" : "No body required for this method"
        },
        {
            ok: result.status === expectedStatus,
            text: `Status matches scenario expectation (${expectedStatus})`
        }
    ];

    const passed = checks.filter((item) => item.ok).length;

    return (
        <PlaygroundShell
            title="REST Request Outcome Playground"
            goal="Understand how method, path, and body shape API intent and status outcomes."
            status={{
                color: result.status === expectedStatus ? "success" : "warning",
                label: `${result.status} simulated`
            }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 680 }}>
                    <FormControl size="small">
                        <InputLabel id="rest-scenario-label">Scenario preset</InputLabel>
                        <Select
                            labelId="rest-scenario-label"
                            label="Scenario preset"
                            value={scenario}
                            onChange={(event) => {
                                const next = SCENARIOS[event.target.value];
                                setScenario(event.target.value);
                                setMethod(next.method);
                                setPath(next.path);
                                setBody(next.body);
                                setResult(buildSimulatedResponse(next.method, next.path, next.body));
                            }}
                        >
                            {Object.entries(SCENARIOS).map(([key, value]) => (
                                <MenuItem key={key} value={key}>{value.label}</MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{SCENARIOS[scenario].note}</FormHelperText>
                    </FormControl>

                    <Stack direction={{ xs: "column", md: "row" }} spacing={1}>
                        <FormControl size="small" sx={{ minWidth: 150 }}>
                            <InputLabel id="rest-method-label">Method</InputLabel>
                            <Select
                                labelId="rest-method-label"
                                label="Method"
                                value={method}
                                onChange={(event) => setMethod(event.target.value)}
                            >
                                {["GET", "POST", "PUT", "DELETE"].map((entry) => (
                                    <MenuItem key={entry} value={entry}>{entry}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            size="small"
                            label="Path"
                            value={path}
                            onChange={(event) => setPath(event.target.value)}
                            fullWidth
                        />
                    </Stack>

                    <TextField
                        size="small"
                        label="JSON body"
                        value={body}
                        onChange={(event) => setBody(event.target.value)}
                        multiline
                        minRows={4}
                        disabled={!doesNeedBody}
                        helperText={doesNeedBody ? "Add payload fields for create/update." : "This method normally uses an empty body."}
                    />

                    <Stack direction="row" spacing={1}>
                        <Button
                            variant="contained"
                            onClick={() => setResult(buildSimulatedResponse(method, path, body))}
                        >
                            Run
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                const base = SCENARIOS[scenario];
                                setMethod(base.method);
                                setPath(base.path);
                                setBody(base.body);
                                setResult(buildSimulatedResponse(base.method, base.path, base.body));
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
                    <Typography variant="caption" color="text.secondary">Request preview</Typography>
                    <Box component="pre" sx={{ m: "8px 0 0", fontSize: 12, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>
                        {requestPreview}
                    </Box>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    <Alert severity={result.severity} variant="outlined">
                        Simulated response: <strong>{result.status}</strong> - {result.message}
                    </Alert>
                    <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                        {checks.map((item) => (
                            <Chip
                                key={item.text}
                                label={item.text}
                                color={item.ok ? "success" : "warning"}
                                variant="outlined"
                                size="small"
                            />
                        ))}
                    </Stack>
                    <Alert severity={passed === checks.length ? "success" : "info"} variant="outlined">
                        {passed}/{checks.length} request checks passed.
                    </Alert>
                </Stack>
            }
            code={
                <pre>{`fetch("${path.startsWith("/") ? path : `/${path}`}", {
  method: "${method}",
  headers: { "Content-Type": "application/json" },
  ${doesNeedBody ? `body: JSON.stringify(${body.trim() || "{}"})` : "// no body"}
});

// simulated status => ${result.status}`}</pre>
            }
            note="Choose method and path as a pair: REST semantics come from both the verb and the resource route."
        />
    );
}
