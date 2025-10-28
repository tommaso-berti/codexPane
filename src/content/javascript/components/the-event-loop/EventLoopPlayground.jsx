import React, { useCallback, useMemo, useRef, useState } from "react";
import {
    Box,
    Stack,
    Button,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Tabs,
    Tab,
    Paper,
    Typography,
    Divider,
    IconButton,
    Chip,
    Snackbar,
    Alert,
    Tooltip
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import BoltIcon from "@mui/icons-material/Bolt";

const SCENES = [
    {
        id: "timers",
        label: "Timers and microtasks",
        icon: <AccessTimeIcon fontSize="small" />,
        code: `// Timers vs microtasks ordering
console.log("A: start");
setTimeout(() => console.log("timeout (0ms)"), 0);          // macrotask
setTimeout(() => console.log("timeout (10ms)"), 10);        // macrotask
Promise.resolve().then(() => console.log("microtask: then"));// microtask
queueMicrotask(() => console.log("microtask: queueMicrotask"));
console.log("B: end of synchronous code");`,
    },
    {
        id: "io",
        label: "Simulated fetch",
        icon: <CloudDownloadIcon fontSize="small" />,
        code: `// A fake fetch that resolves after 100ms
console.log("fetch: start (simulated)");
await new Promise(r => setTimeout(r, 100)); // macrotask completes later
console.log("fetch: response ready");
await Promise.resolve().then(() => console.log("then after fetch (microtask)"));`,
    },
    {
        id: "block",
        label: "Block the thread",
        icon: <BoltIcon fontSize="small" />,
        code: `// Busy loop that blocks the event loop ~300ms
console.log("⚠ blocking for ~300ms...");
const start = performance.now();
while (performance.now() - start < 300) { /* blocking */ }
console.log("✅ block finished");`,
    },
];

function CodeBlock({ code, onCopy }) {
    return (
        <Paper variant="outlined" sx={{ p: 2, bgcolor: "grey.50", position: "relative", overflow: "auto" }}>
            <Box sx={{ position: "absolute", top: 8, right: 8 }}>
                <Tooltip title="Copy code">
                    <IconButton size="small" onClick={onCopy}>
                        <ContentCopyIcon fontSize="inherit" />
                    </IconButton>
                </Tooltip>
            </Box>
            <Typography component="pre" sx={{ m: 0, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 13, whiteSpace: "pre" }}>
                {code.split("\n").map((line, i) => (
                    `${String(i + 1).padStart(2, " ")}  ${line}`
                )).join("\n")}
            </Typography>
        </Paper>
    );
}

export default function EventLoopPlayground() {
    const [scene, setScene] = useState(SCENES[0].id);
    const [logs, setLogs] = useState([]);
    const [snack, setSnack] = useState("");
    const idRef = useRef(0);

    const current = useMemo(() => SCENES.find(s => s.id === scene), [scene]);

    const push = useCallback((msg, kind = "sync") => {
        setLogs(prev => [...prev, { id: idRef.current++, msg, kind, t: new Date().toLocaleTimeString() }]);
    }, []);

    // Runners implement the behavior reflected in the code preview
    const runTimers = useCallback(() => {
        push("A: start", "sync");
        setTimeout(() => push("timeout (0ms)", "macro"), 0);
        setTimeout(() => push("timeout (10ms)", "macro"), 10);
        Promise.resolve().then(() => push("microtask: then", "micro"));
        queueMicrotask(() => push("microtask: queueMicrotask", "micro"));
        push("B: end of synchronous code", "sync");
    }, [push]);

    const runIO = useCallback(async () => {
        push("fetch: start (simulated)", "sync");
        await new Promise(r => setTimeout(r, 100));
        push("fetch: response ready", "macro");
        await Promise.resolve().then(() => push("then after fetch (microtask)", "micro"));
    }, [push]);

    const runBlock = useCallback(() => {
        push("⚠ blocking for ~300ms...", "sync");
        const start = performance.now();
        while (performance.now() - start < 300) { /* busy */ }
        push("✅ block finished", "sync");
    }, [push]);

    const run = useCallback(() => {
        if (scene === "timers") runTimers();
        else if (scene === "io") runIO();
        else runBlock();
    }, [scene, runTimers, runIO, runBlock]);

    const clear = () => setLogs([]);

    const chipColor = (kind) =>
        kind === "micro" ? "success" : kind === "macro" ? "primary" : "default";

    const handleCopy = () => {
        navigator.clipboard.writeText(current.code);
        setSnack("Code copied to clipboard");
    };

    return (
        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardHeader
                title="Event loop playground"
                subheader="Preview the code, then run it and observe the order (sync → microtasks → macrotasks)."
            />
            <CardContent>
                <Tabs
                    value={scene}
                    onChange={(_, v) => setScene(v)}
                    variant="scrollable"
                    allowScrollButtonsMobile
                    sx={{ mb: 2 }}
                >
                    {SCENES.map((s) => (
                        <Tab key={s.id} value={s.id} icon={s.icon} iconPosition="start" label={s.label} />
                    ))}
                </Tabs>

                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                    {/* Code preview */}
                    <Box sx={{ flex: 1, minWidth: 280 }}>
                        <Typography variant="subtitle2" gutterBottom>Code preview</Typography>
                        <CodeBlock code={current.code} onCopy={handleCopy} />
                    </Box>

                    {/* Output log */}
                    <Box sx={{ flex: 1, minWidth: 280 }}>
                        <Typography variant="subtitle2" gutterBottom>Log</Typography>
                        <Paper variant="outlined" sx={{ p: 1.5, height: 240, overflow: "auto", bgcolor: "grey.50" }}>
                            {logs.length === 0 ? (
                                <Typography variant="body2" color="text.secondary">No events yet. Click “Run”.</Typography>
                            ) : (
                                <Stack spacing={0.75}>
                                    {logs.map((l) => (
                                        <Stack key={l.id} direction="row" alignItems="center" spacing={1}>
                                            <Typography variant="caption" color="text.secondary" sx={{ minWidth: 82 }}>{l.t}</Typography>
                                            <Chip size="small" label={l.kind} color={chipColor(l.kind)} variant="outlined" />
                                            <Typography variant="body2" sx={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                                                {l.msg}
                                            </Typography>
                                        </Stack>
                                    ))}
                                </Stack>
                            )}
                        </Paper>
                    </Box>
                </Stack>
            </CardContent>

            <Divider />
            <CardActions sx={{ p: 2, justifyContent: "space-between" }}>
                <Stack direction="row" spacing={1.5}>
                    <Button variant="contained" color="primary" startIcon={<PlayArrowIcon />} onClick={run}>
                        Run
                    </Button>
                    <Button variant="outlined" color="inherit" startIcon={<ClearAllIcon />} onClick={clear}>
                        Clear
                    </Button>
                </Stack>
                <Typography variant="caption" color="text.secondary">
                    Tip: microtasks (Promises) run before timers once the call stack is clear.
                </Typography>
            </CardActions>

            <Snackbar
                open={!!snack}
                autoHideDuration={2000}
                onClose={() => setSnack("")}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
                    {snack}
                </Alert>
            </Snackbar>
        </Card>
    );
}