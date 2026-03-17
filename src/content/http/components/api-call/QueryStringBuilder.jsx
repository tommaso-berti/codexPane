import { useMemo, useState } from "react";
import {
    Alert,
    Box,
    Button,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

function buildUrl(baseUrl, endpoint, params) {
    const cleanBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

    const pairs = params
        .filter((entry) => entry.key.trim())
        .map((entry) => `${encodeURIComponent(entry.key)}=${encodeURIComponent(entry.value)}`);

    const query = pairs.length ? `?${pairs.join("&")}` : "";
    return `${cleanBase}${cleanEndpoint}${query}`;
}

export default function QueryStringBuilder() {
    const [baseUrl, setBaseUrl] = useState("https://api.themoviedb.org/3");
    const [endpoint, setEndpoint] = useState("discover/movie");
    const [apiKey, setApiKey] = useState("YOUR_API_KEY");
    const [genre, setGenre] = useState("28");
    const [searchTerm, setSearchTerm] = useState("action movies");

    const params = useMemo(() => ([
        { key: "api_key", value: apiKey },
        { key: "with_genres", value: genre },
        { key: "query", value: searchTerm }
    ]), [apiKey, genre, searchTerm]);

    const url = useMemo(() => buildUrl(baseUrl, endpoint, params), [baseUrl, endpoint, params]);

    const parsedPairs = params
        .filter((entry) => entry.key.trim())
        .map((entry) => `${entry.key} = ${entry.value}`);

    const hasSpaces = /\s/.test(searchTerm);
    const encodedSearch = encodeURIComponent(searchTerm);

    return (
        <PlaygroundShell
            title="Query String Mapping Playground"
            goal="Build a correct query string and see how typed values map to encoded URL parameters."
            status={{
                color: url.includes("?") ? "success" : "info",
                label: parsedPairs.length + " params"
            }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 700 }}>
                    <TextField size="small" label="Base URL" value={baseUrl} onChange={(event) => setBaseUrl(event.target.value)} />
                    <TextField size="small" label="Endpoint" value={endpoint} onChange={(event) => setEndpoint(event.target.value)} />
                    <Stack direction={{ xs: "column", md: "row" }} spacing={1}>
                        <TextField size="small" label="api_key" value={apiKey} onChange={(event) => setApiKey(event.target.value)} fullWidth />
                        <TextField size="small" label="with_genres" value={genre} onChange={(event) => setGenre(event.target.value)} fullWidth />
                    </Stack>
                    <TextField
                        size="small"
                        label="query"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        helperText="Try spaces or symbols to observe URL encoding."
                    />
                    <Stack direction="row" spacing={1}>
                        <Button variant="outlined" onClick={() => {
                            setBaseUrl("https://api.themoviedb.org/3");
                            setEndpoint("discover/movie");
                            setApiKey("YOUR_API_KEY");
                            setGenre("28");
                            setSearchTerm("action movies");
                        }}>
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
                    <Typography variant="caption" color="text.secondary">Final URL</Typography>
                    <Box component="pre" sx={{ m: "8px 0 0", fontSize: 12, lineHeight: 1.55, whiteSpace: "pre-wrap", overflowX: "auto" }}>
                        {url}
                    </Box>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    <Alert severity="info" variant="outlined">
                        Parameter mapping: {parsedPairs.join(" | ")}
                    </Alert>
                    <Alert severity={hasSpaces ? "success" : "info"} variant="outlined">
                        Encoded `query` value: {encodedSearch}
                    </Alert>
                </Stack>
            }
            note="Use `encodeURIComponent` for user input so spaces and special characters remain safe and unambiguous in query strings."
        />
    );
}
