import { useMemo, useState } from "react";
import {
    Alert,
    Button,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

function matchRoute(pathname) {
    if (pathname === "/") return "Home route";
    if (pathname === "/about") return "About route";
    if (pathname.startsWith("/articles/")) return "Article dynamic route";
    if (pathname.startsWith("/list")) return "List route";
    return "Not found";
}

export default function RoutingPlayground() {
    const [path, setPath] = useState("/list");
    const [query, setQuery] = useState("order=ASC");
    const [history, setHistory] = useState(["/list?order=ASC"]);

    const url = useMemo(() => (query.trim() ? `${path}?${query}` : path), [path, query]);
    const routeName = useMemo(() => matchRoute(path), [path]);

    const navigate = () => setHistory((prev) => [...prev, url]);
    const reset = () => {
        setPath("/list");
        setQuery("order=ASC");
        setHistory(["/list?order=ASC"]);
    };

    return (
        <PlaygroundShell
            title="Route Matching Playground"
            goal="Understand how path and query shape route matching and navigation history."
            status={{ color: routeName === "Not found" ? "warning" : "success", label: routeName }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 560 }}>
                    <TextField size="small" label="Pathname" value={path} onChange={(event) => setPath(event.target.value)} />
                    <TextField size="small" label="Query string (without ?)" value={query} onChange={(event) => setQuery(event.target.value)} />
                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" onClick={navigate}>Run</Button>
                        <Button variant="outlined" onClick={reset}>Reset</Button>
                    </Stack>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.4, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Current URL</Typography>
                    <Typography sx={{ mt: 1 }}>{url}</Typography>
                    <Typography variant="body2" color="text.secondary">Matched: {routeName}</Typography>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    <Alert severity={routeName === "Not found" ? "warning" : "success"} variant="outlined">
                        Route resolution: {routeName}
                    </Alert>
                    <Alert severity="info" variant="outlined">History length: {history.length}</Alert>
                    <Paper variant="outlined" sx={{ p: 1.2, borderRadius: 2 }}>
                        <Typography variant="caption" color="text.secondary">History trace</Typography>
                        <Typography component="pre" sx={{ m: "8px 0 0", fontSize: 12 }}>{history.join("\n")}</Typography>
                    </Paper>
                </Stack>
            }
            note="Route intent comes from pathname first; query parameters refine view state."
        />
    );
}
