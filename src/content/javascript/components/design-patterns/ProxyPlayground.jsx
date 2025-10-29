import React, { useMemo, useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

function makeCachingProxy() {
    const store = {};
    const target = {
        fetchCity(code) {
            // pretend network latency
            return new Promise((resolve) =>
                setTimeout(() => resolve(`Result for ${code}`), 400)
            );
        },
    };

    const cache = {};
    const handler = {
        get(t, prop, receiver) {
            if (prop === "get") {
                return async (code) => {
                    if (cache[code]) return `cache → ${cache[code]}`;
                    const res = await t.fetchCity(code);
                    cache[code] = res;
                    return `network → ${res}`;
                };
            }
            return Reflect.get(t, prop, receiver);
        },
    };

    return new Proxy(target, handler);
}

export default function ProxyPlayground() {
    const api = useMemo(() => makeCachingProxy(), []);
    const [code, setCode] = useState("city1");
    const [log, setLog] = useState([]);

    const run = async () => {
        const res = await api.get(code.trim());
        setLog((l) => [`${new Date().toLocaleTimeString()}: ${res}`, ...l]);
    };

    return (
        <Stack spacing={2}>
            <Typography variant="h6">Proxy demo: intercept and cache</Typography>
            <Stack direction="row" spacing={1} alignItems="center">
                <TextField
                    size="small"
                    label="Key"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
                <Button variant="contained" onClick={run}>
                    get
                </Button>
            </Stack>
            <Box sx={{ p: 2, bgcolor: "#f9fafb", borderRadius: 2 }}>
                <Typography variant="subtitle2">Logs</Typography>
                <Box component="pre" sx={{ m: 0, whiteSpace: "pre-wrap", fontSize: 12 }}>
                    {log.length ? log.join("\n") : "Try the same key twice to see caching."}
                </Box>
            </Box>
            <Typography variant="caption" color="text.secondary">
                Tip: Proxies can add logging, validation, rate-limits, and lazy loading without changing the target object.
            </Typography>
        </Stack>
    );
}