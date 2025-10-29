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

export default function FetchAwaitDemo() {
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
        const bodyPart = method === "POST" ? `,\n    body: ${isJsonLike(body) ? body : JSON.stringify(body)}` : "";

        return `async function send() {
  try {
    const res = await fetch("${url}", {
      method: "${method}",
      headers: ${headerJson}${bodyPart}
    });
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    const ct = res.headers.get("content-type") || "";
    const data = ct.includes("application/json") ? await res.json() : await res.text();
    // use data
  } catch (err) {
    console.error(err);
  }
}`;
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

    async function send() {
        setLoading(true);
        setErrorMsg("");
        setRespBody("");
        setRespHeaders([]);
        setStatus("");

        try {
            const init = { method, headers: parseHeaderInput() };
            if (method === "POST") {
                if (!Object.keys(init.headers).some(k => k.toLowerCase() === "content-type")) {
                    init.headers["Content-Type"] = "application/json";
                }
                init.body = isJsonLike(body) ? body : body.toString();
            }

            const res = await fetch(url, init);
            setStatus(`${res.status} ${res.statusText}`);

            const entries = [];
            res.headers.forEach((v, k) => entries.push([k, v]));
            setRespHeaders(entries);

            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            const ct = res.headers.get("content-type") || "";
            const data = ct.includes("application/json") ? await res.json() : await res.text();
            setRespBody(typeof data === "string" ? data : JSON.stringify(data, null, 2));
        } catch (e) {
            setErrorMsg(e?.message || "Request failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Stack spacing={2}>
            <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
                <CardHeader title="Async/Await Fetch Client" subheader="Clear flow, easy debugging" />
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
                                        setUrl(
                                            m === "GET"
                                                ? "https://jsonplaceholder.typicode.com/posts/1"
                                                : "https://jsonplaceholder.typicode.com/posts"
                                        );
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
                            <CardHeader title="Code preview (async/await)" />
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