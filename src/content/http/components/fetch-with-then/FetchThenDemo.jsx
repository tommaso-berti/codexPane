import React, { useMemo, useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Divider,
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";

const METHODS = ["GET", "POST"];

export default function FetchThenDemo() {
    const [method, setMethod] = useState("GET");
    const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/posts/1");
    const [headers, setHeaders] = useState("Accept: application/json\n");
    const [body, setBody] = useState('{\n  "title": "Hello",\n  "body": "Sample",\n  "userId": 1\n}');
    const [status, setStatus] = useState("");
    const [respHeaders, setRespHeaders] = useState([]);
    const [respBody, setRespBody] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const codePreview = useMemo(() => {
        const headerLines = headers
            .split("\n")
            .filter(Boolean)
            .map(h => h.split(":").map(s => s.trim()))
            .filter(([k, v]) => k && v);
        const headerObj = Object.fromEntries(headerLines);
        const headerJson = JSON.stringify(headerObj, null, 2) || "{}";
        const hasBody = method !== "GET";
        const bodyPart = hasBody ? `,\n  body: ${isJsonLike(body) ? body : JSON.stringify(body)}` : "";

        return `fetch("${url}", {
  method: "${method}",
  headers: ${headerJson}${bodyPart}
}).then(response => {
  if (response.ok) {
    return response.json();
  }
  throw new Error(\`Request failed (\${response.status})\`);
}).then(jsonResponse => {
  // use jsonResponse
}).catch(err => {
  console.error(err);
});`;
    }, [method, url, headers, body]);

    function isJsonLike(text) {
        try { JSON.parse(text); return true; } catch { return false; }
    }

    function parseHeaderInput() {
        return Object.fromEntries(
            headers
                .split("\n")
                .filter(Boolean)
                .map(h => h.split(":").map(s => s.trim()))
                .filter(([k, v]) => k && v)
        );
    }

    function send() {
        setLoading(true);
        setErrorMsg("");
        setRespBody("");
        setRespHeaders([]);
        setStatus("");

        const init = { method, headers: parseHeaderInput() };
        if (method !== "GET") {
            // add default content-type if missing
            if (!Object.keys(init.headers).some(k => k.toLowerCase() === "content-type")) {
                init.headers["Content-Type"] = "application/json";
            }
            init.body = isJsonLike(body) ? body : body.toString();
        }

        fetch(url, init).then(response => {
            setStatus(`${response.status} ${response.statusText}`);
            const entries = [];
            response.headers.forEach((v, k) => entries.push([k, v]));
            setRespHeaders(entries);

            if (response.ok) {
                const ct = response.headers.get("content-type") || "";
                if (ct.includes("application/json")) return response.json();
                return response.text();
            }
            throw new Error(`HTTP ${response.status}`);
        }, networkError => {
            setErrorMsg(networkError?.message || "Network error");
            setLoading(false);
        })
            .then(data => {
                setRespBody(typeof data === "string" ? data : JSON.stringify(data, null, 2));
            })
            .catch(err => setErrorMsg(err.message))
            .finally(() => setLoading(false));
    }

    return (
        <Stack spacing={2}>
            <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
                <CardHeader title="Fetch with .then() Client" subheader="Try GET and POST with chained .then()" />
                <CardContent>
                    <Stack spacing={2}>
                        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                            <FormControl sx={{ minWidth: 140 }}>
                                <InputLabel id="method-label">Method</InputLabel>
                                <Select
                                    labelId="method-label"
                                    label="Method"
                                    value={method}
                                    onChange={(e) => {
                                        const m = e.target.value;
                                        setMethod(m);
                                        if (m === "GET") setUrl("https://jsonplaceholder.typicode.com/posts/1");
                                        else setUrl("https://jsonplaceholder.typicode.com/posts");
                                    }}
                                >
                                    {METHODS.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}
                                </Select>
                            </FormControl>

                            <TextField
                                fullWidth
                                label="URL"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                InputProps={{ startAdornment: <InputAdornment position="start">{method}</InputAdornment> }}
                            />

                            <Button variant="contained" onClick={send} disabled={loading} sx={{ borderRadius: 3 }}>
                                {loading ? "Sending…" : "Send"}
                            </Button>
                        </Stack>

                        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                            <TextField
                                label="Headers"
                                value={headers}
                                onChange={(e) => setHeaders(e.target.value)}
                                multiline
                                minRows={6}
                                sx={{ flex: 1 }}
                                helperText="One per line, e.g. Accept: application/json"
                            />
                            <TextField
                                label="Body"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                multiline
                                minRows={6}
                                sx={{ flex: 1 }}
                                disabled={method === "GET"}
                                helperText="JSON body for POST"
                            />
                        </Stack>

                        <Card variant="outlined" sx={{ borderRadius: 3 }}>
                            <CardHeader title="Code preview (.then chain)" />
                            <CardContent>
                                <Box component="pre" sx={{ m: 0, whiteSpace: "pre-wrap" }}>
                                    {codePreview}
                                </Box>
                            </CardContent>
                        </Card>

                        <Divider />

                        <Stack direction="row" spacing={2} alignItems="center">
                            <Typography variant="body2">Status:</Typography>
                            <Chip label={status || "—"} color={status ? "primary" : "default"} />
                            {errorMsg && <Chip label={errorMsg} color="error" />}
                        </Stack>

                        <Typography variant="body2">Response headers</Typography>
                        <Box component="pre" sx={{ m: 0, p: 1, bgcolor: "#0a0a0a", color: "#eaeaea", borderRadius: 2, overflow: "auto" }}>
                            {respHeaders.length ? respHeaders.map(([k, v]) => `${k}: ${v}`).join("\n") : "—"}
                        </Box>

                        <Typography variant="body2" sx={{ mt: 1 }}>Response body</Typography>
                        <Box component="pre" sx={{ m: 0, p: 1, bgcolor: "#0a0a0a", color: "#eaeaea", borderRadius: 2, overflow: "auto" }}>
                            {respBody || "—"}
                        </Box>
                    </Stack>
                </CardContent>
            </Card>
        </Stack>
    );
}