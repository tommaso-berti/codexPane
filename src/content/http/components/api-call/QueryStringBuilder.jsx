import React, { useMemo, useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    IconButton,
    Stack,
    TextField,
    Tooltip,
    Typography
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function QueryStringBuilder() {
    const [baseUrl, setBaseUrl] = useState("https://api.themoviedb.org/3");
    const [endpoint, setEndpoint] = useState("genre/movie/list");
    const [params, setParams] = useState([
        { key: "api_key", value: "YOUR_API_KEY" },
        { key: "with_genres", value: "28" }
    ]);

    const query = useMemo(() => {
        const entries = params
            .filter(p => p.key.trim() !== "")
            .map(p => `${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`);
        return entries.length ? `?${entries.join("&")}` : "";
    }, [params]);

    const url = useMemo(() => {
        const slash = baseUrl.endsWith("/") || endpoint.startsWith("/") ? "" : "/";
        return `${baseUrl}${slash}${endpoint}${query}`;
    }, [baseUrl, endpoint, query]);

    function updateParam(i, field, value) {
        setParams(prev => prev.map((p, idx) => (idx === i ? { ...p, [field]: value } : p)));
    }

    function addParam() {
        setParams(prev => [...prev, { key: "", value: "" }]);
    }

    function removeParam(i) {
        setParams(prev => prev.filter((_, idx) => idx !== i));
    }

    async function copy() {
        try {
            await navigator.clipboard.writeText(url);
            alert("URL copied!");
        } catch {
            // no-op
        }
    }

    return (
        <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
            <CardHeader title="Query String Builder" subheader="Combine base URL, endpoint, and query params" />
            <CardContent>
                <Stack spacing={2}>
                    <TextField label="Base URL" value={baseUrl} onChange={e => setBaseUrl(e.target.value)} />
                    <TextField label="Endpoint" value={endpoint} onChange={e => setEndpoint(e.target.value)} />
                    <Divider />
                    <Typography variant="subtitle2">Parameters</Typography>
                    <Stack spacing={1}>
                        {params.map((p, i) => (
                            <Stack key={i} direction={{ xs: "column", sm: "row" }} spacing={1}>
                                <TextField
                                    label="key"
                                    value={p.key}
                                    onChange={e => updateParam(i, "key", e.target.value)}
                                    sx={{ flex: 1 }}
                                />
                                <TextField
                                    label="value"
                                    value={p.value}
                                    onChange={e => updateParam(i, "value", e.target.value)}
                                    sx={{ flex: 2 }}
                                />
                                <Button color="error" onClick={() => removeParam(i)}>Remove</Button>
                            </Stack>
                        ))}
                        <Button variant="outlined" onClick={addParam}>Add parameter</Button>
                    </Stack>

                    <Divider />

                    <Typography variant="subtitle2">Result</Typography>
                    <Box
                        component="pre"
                        sx={{ m: 0, p: 1, bgcolor: "#0a0a0a", color: "#eaeaea", borderRadius: 2, overflowX: "auto" }}
                    >
                        {url}
                    </Box>

                    <Stack direction="row" spacing={1}>
                        <Tooltip title="Copy URL">
                            <IconButton onClick={copy} color="primary">
                                <ContentCopyIcon />
                            </IconButton>
                        </Tooltip>
                        <Box component="code" sx={{ color: "text.secondary" }}>
                            {`fetch("${url}")
  .then(r => {
    if (!r.ok) throw new Error(\`HTTP \${r.status}\`);
    return r.json();
  })
  .then(data => console.log(data))
  .catch(err => console.error(err));`}
                        </Box>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}