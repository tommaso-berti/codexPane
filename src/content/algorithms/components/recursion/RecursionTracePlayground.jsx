import { useMemo, useState } from "react";
import { Alert, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

function buildTrace(word) {
    const clean = (word || "").trim();
    if (!clean) return [];
    const rows = [];
    for (let i = 0; i <= clean.length; i += 1) {
        const remaining = clean.slice(i);
        rows.push({
            step: i,
            remaining,
            phase: remaining ? "recursive step" : "base case"
        });
    }
    return rows;
}

export default function RecursionTracePlayground() {
    const [value, setValue] = useState("stack");
    const [input, setInput] = useState("stack");
    const trace = useMemo(() => buildTrace(value), [value]);

    return (
        <PlaygroundShell
            title="Recursion Trace Playground"
            goal="Visualize how each recursive call moves toward the base case."
            status={{ color: trace.length ? "info" : "warning", label: trace.length ? `${trace.length} frames` : "no input" }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 520 }}>
                    <TextField
                        size="small"
                        label="Input text"
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                        helperText="Use a short word to inspect call-stack shrinking."
                    />
                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" onClick={() => setValue(input)}>Run</Button>
                        <Button variant="outlined" onClick={() => { setInput("stack"); setValue("stack"); }}>Reset</Button>
                    </Stack>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.4, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Current input</Typography>
                    <Typography variant="body2" sx={{ mt: 0.8, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                        {JSON.stringify(value)}
                    </Typography>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    {!trace.length ? (
                        <Alert severity="warning" variant="outlined">Provide at least one character to generate recursive frames.</Alert>
                    ) : (
                        <Paper variant="outlined" sx={{ p: 1.2, borderRadius: 2 }}>
                            <Typography variant="caption" color="text.secondary">Call stack frames</Typography>
                            <Stack spacing={0.5} sx={{ mt: 1 }}>
                                {trace.map((row) => (
                                    <Typography key={row.step} variant="body2" sx={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                                        {`frame ${row.step}: remaining=${JSON.stringify(row.remaining)} -> ${row.phase}`}
                                    </Typography>
                                ))}
                            </Stack>
                        </Paper>
                    )}
                </Stack>
            }
            note="Recursive calls must make progress toward a base case to terminate safely."
        />
    );
}
