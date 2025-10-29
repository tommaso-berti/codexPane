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

const METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"];

export default function RestClientDemo() {
    const [method, setMethod] = useState("GET");
    const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/posts/1");
    const [headers, setHeaders] = useState('Accept: application/json\n');
    const [body, setBody] = useState('{\n  "title": "Hello",\n  "body": "Sample",\n  "userId": 1\n}');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const [respHeaders, setRespHeaders] = useState([]);
    const [respBody, setRespBody] = useState("");

    const codePreview = useMemo(() => {
        const headerLines = headers
            .split("\n")
            .filter(Boolean)
            .map(h => h.split(":").map(s => s.trim()))
            .filter(([k, v]) => k && v);

        const headerObj = Object.fromEntries(headerLines);
        const hasBody = !["GET", "HEAD"].includes(method);

        const prettyHeaders = JSON.stringify(headerObj, null, 2) || "{}";
        const prettyBody = hasBody ? `,\n  body: ${isJsonLike(body) ? body : JSON.stringify(body)}` : "";

        return `fetch("${url}", {
  method: "${method}",
  headers: ${prettyHeaders}${prettyBody}
}).then(r => r.json())`;
    }, [method, url, headers, body]);

    function isJsonLike(text) {
        try {
            JSON.parse(text);
            return true;
        } catch {
            return false;
        }
    }

    async function send() {
        setLoading(true);
        setStatus(null);
        setRespHeaders([]);
        setRespBody("");

        try {
            const headerLines = headers
                .split("\n")
                .filter(Boolean)
                .map(h => h.split(":").map(s => s.trim()))
                .filter(([k, v]) => k && v);

            const headerObj = Object.fromEntries(headerLines);
            const init = { method, headers: headerObj };

            if (!["GET", "HEAD"].includes(method)) {
                init.body = isJsonLike(body) ? body : body.toString();
            }

            const res = await fetch(url, init);
            setStatus(`${res.status} ${res.statusText}`);

            const entries = [];
            res.headers.forEach((v, k) => entries.push([k, v]));
            setRespHeaders(entries);

            const ct = res.headers.get("content-type") || "";
            if (ct.includes("application/json")) {
                const data = await res.json();
                setRespBody(JSON.stringify(data, null, 2));
            } else {
                const text = await res.text();
                setRespBody(text);
            }
        } catch (e) {
            setStatus("Request failed");
            setRespBody(String(e));
        } finally {
            setLoading(false);
        }
    }

    return (
        <Stack spacing={2}>
            <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
                <CardHeader title="REST Client" subheader="Experiment with methods, headers, and body" />
                <CardContent>
                    <Stack spacing={2}>
                        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                            <FormControl sx={{ minWidth: 140 }}>
                                <InputLabel id="method-label">Method</InputLabel>
                                <Select
                                    labelId="method-label"
                                    label="Method"
                                    value={method}
                                    onChange={(e) => setMethod(e.target.value)}
                                >
                                    {METHODS.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}
                                </Select>
                            </FormControl>

                            <TextField
                                fullWidth
                                label="URL"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">{method}</InputAdornment>
                                }}
                            />
                            <Button
                                variant="contained"
                                onClick={send}
                                disabled={loading}
                                sx={{ borderRadius: 3 }}
                            >
                                {loading ? "Sending…" : "Send"}
                            </Button>
                        </Stack>

                        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                            <TextField
                                label="Headers"
                                value={headers}
                                onChange={(e) => setHeaders(e.target.value)}
                                multiline
                                minRows={8}
                                sx={{ flex: 1 }}
                                helperText="One header per line, e.g. Accept: application/json"
                            />
                            <TextField
                                label="Body"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                multiline
                                minRows={8}
                                sx={{ flex: 1 }}
                                disabled={["GET", "HEAD"].includes(method)}
                                helperText="Raw body (JSON recommended)"
                            />
                        </Stack>

                        <Card variant="outlined" sx={{ borderRadius: 3 }}>
                            <CardHeader title="Code preview" />
                            <CardContent>
                                <Box component="pre" sx={{ m: 0, whiteSpace: "pre-wrap" }}>
                                    {codePreview}
                                </Box>
                            </CardContent>
                        </Card>

                        <Divider />

                        <Stack spacing={1}>
                            <Typography variant="subtitle2">Response</Typography>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Typography variant="body2">Status:</Typography>
                                {status ? <Chip label={status} color="primary" /> : <Chip label="—" />}
                            </Stack>
                            <Typography variant="body2" sx={{ mt: 1 }}>Headers</Typography>
                            <Box component="pre" sx={{ m: 0, p: 1, bgcolor: "#0a0a0a", color: "#eaeaea", borderRadius: 2, overflow: "auto" }}>
                                {respHeaders.length
                                    ? respHeaders.map(([k, v]) => `${k}: ${v}`).join("\n")
                                    : "—"}
                            </Box>
                            <Typography variant="body2" sx={{ mt: 1 }}>Body</Typography>
                            <Box component="pre" sx={{ m: 0, p: 1, bgcolor: "#0a0a0a", color: "#eaeaea", borderRadius: 2, overflow: "auto" }}>
                                {respBody || "—"}
                            </Box>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        </Stack>
    );
}