import React, { useEffect, useMemo, useState } from "react";
import {
    Card, CardHeader, CardContent, CardActions,
    Button, TextField, Switch, FormControlLabel,
    Chip, Stack, Divider, Typography, Box
} from "@mui/material";

function CodeBlock({ code }) {
    return (
        <Box component="pre" sx={{
            p: 1.5, borderRadius: 1, bgcolor: "#0b1021", color: "#e6e6e6",
            fontSize: 12, whiteSpace: "pre-wrap", overflowX: "auto", m: 0
        }}>
            {code}
        </Box>
    );
}

export default function UseEffectPlayground() {
    // dependency-based effect
    const [count, setCount] = useState(0);

    useEffect(() => {
        return () => { /* no cleanup needed here */ };
    }, [count]);

    // mount-only effect with cleanup (interval timer)
    const [seconds, setSeconds] = useState(0);
    useEffect(() => {
        const id = setInterval(() => setSeconds((s) => s + 1), 1000);
        return () => clearInterval(id);
    }, []);

    // controlled input + persisted to localStorage after each change (top-level hook, guarded inside)
    const [name, setName] = useState(() => localStorage.getItem("name") || "");
    useEffect(() => {
        if (name !== "") localStorage.setItem("name", name);
    }, [name]);

    // mount-only simulated fetch
    const [items, setItems] = useState(null);
    useEffect(() => {
        let ignore = false;
        const timer = setTimeout(() => {
            if (!ignore) setItems(["alpha", "beta", "gamma"]); // mock data
        }, 600);
        return () => { ignore = true; clearTimeout(timer); };
    }, []);

    const code = useMemo(() => {
        return `// dependency-based effect
useEffect(() => {
  document.title = \`Count is \${count}\`;
}, [count]);

// mount-only interval with cleanup
useEffect(() => {
  const id = setInterval(() => setSeconds(s => s + 1), 1000);
  return () => clearInterval(id);
}, []);

// persist name when it changes
useEffect(() => {
  if (name !== "") localStorage.setItem("name", name);
}, [name]);

// simulate fetch on mount with guard
useEffect(() => {
  let ignore = false;
  const timer = setTimeout(() => {
    if (!ignore) setItems(["alpha", "beta", "gamma"]);
  }, 600);
  return () => { ignore = true; clearTimeout(timer); };
}, []);`;
    }, [count, name, seconds, items]);

    return (
        <Card sx={{ borderRadius: 3, overflow: "hidden" }}>
            <CardHeader title="useEffect Playground" subheader="Mount effects, dependencies, and cleanup" />
            <CardContent sx={{ display: "grid", gap: 2 }}>
                {/* Dependency effect */}
                <Box sx={{ display: "flex", gap: 1, alignItems: "center", flexWrap: "wrap" }}>
                    <Typography variant="subtitle2">Dependency based title</Typography>
                    <Button variant="contained" size="small" onClick={() => setCount(c => c + 1)}>
                        Increment count
                    </Button>
                    <Chip label={`count = ${count}`} color="primary" variant="outlined" />
                </Box>

                <Divider />

                {/* Interval cleanup */}
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <Typography variant="subtitle2">Interval seconds (cleanup on unmount)</Typography>
                    <Chip label={`${seconds}s`} />
                </Box>

                <Divider />

                {/* Controlled input + persistence */}
                <Box sx={{ display: "grid", gap: 1, maxWidth: 420 }}>
                    <Typography variant="subtitle2">Persisted name</Typography>
                    <TextField
                        label="Name"
                        size="small"
                        value={name}
                        onChange={({ target }) => setName(target.value)}
                    />
                    <Typography variant="body2">Stored value: {name || "(empty)"}</Typography>
                </Box>

                <Divider />

                {/* Simulated fetch on mount */}
                <Box sx={{ display: "grid", gap: 1 }}>
                    <Typography variant="subtitle2">Fetched items on mount</Typography>
                    {items ? (
                        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                            {items.map((it) => <Chip key={it} label={it} />)}
                        </Stack>
                    ) : (
                        <Typography variant="body2">Loading…</Typography>
                    )}
                </Box>

                <Divider />

                <Typography variant="subtitle2" sx={{ mb: 1 }}>Code summary</Typography>
                <CodeBlock code={code} />
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-end" }}>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                        setCount(0);
                        setSeconds(0);
                        setName("");
                        setItems(null);
                    }}
                >
                    Reset
                </Button>
            </CardActions>
        </Card>
    );
}