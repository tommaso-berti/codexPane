import { useMemo, useState } from "react";
import {
    Alert,
    Button,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

function createProxyWithCache() {
    const store = new Map();

    const target = {
        getData(key) {
            return `network:${key.toUpperCase()}`;
        }
    };

    return new Proxy(target, {
        get(targetObj, prop, receiver) {
            if (prop !== "read") {
                return Reflect.get(targetObj, prop, receiver);
            }

            return (key) => {
                if (store.has(key)) {
                    return { source: "cache", value: store.get(key), cacheSize: store.size };
                }
                const value = targetObj.getData(key);
                store.set(key, value);
                return { source: "network", value, cacheSize: store.size };
            };
        }
    });
}

export default function ProxyPlayground() {
    const proxyApi = useMemo(() => createProxyWithCache(), []);
    const [key, setKey] = useState("city1");
    const [result, setResult] = useState({ source: "none", value: "Run a request", cacheSize: 0 });

    const run = () => {
        const normalized = key.trim() || "city1";
        setResult(proxyApi.read(normalized));
    };

    return (
        <PlaygroundShell
            title="Proxy Cache Interception Playground"
            goal="Observe how a Proxy intercepts calls and adds caching without changing target logic."
            status={{ color: result.source === "cache" ? "success" : "info", label: result.source }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 520 }}>
                    <TextField size="small" label="Lookup key" value={key} onChange={(event) => setKey(event.target.value)} />
                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" onClick={run}>Run</Button>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                setKey("city1");
                                setResult({ source: "none", value: "Run a request", cacheSize: 0 });
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
                        bgcolor: theme.palette.mode === "dark" ? alpha(theme.palette.common.white, 0.04) : alpha(theme.palette.common.black, 0.02)
                    })}
                >
                    <Typography variant="caption" color="text.secondary">Interception result</Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        Source: <strong>{result.source}</strong> | Value: <strong>{result.value}</strong>
                    </Typography>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    <Alert severity={result.source === "cache" ? "success" : "info"} variant="outlined">
                        {result.source === "cache" ? "Cache hit: response returned without calling the target fetch." : "Cache miss: proxy delegated to target and stored the value."}
                    </Alert>
                    <Alert severity="info" variant="outlined">Cache size: {result.cacheSize}</Alert>
                </Stack>
            }
            note="Proxy is useful when you need cross-cutting behavior (cache, logging, validation) around an existing object."
        />
    );
}
