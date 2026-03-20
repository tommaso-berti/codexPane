import { useMemo, useState } from "react";
import { Alert, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

export default function StackOperationsPlayground() {
    const [stack, setStack] = useState(["A", "B"]);
    const [input, setInput] = useState("C");
    const [lastAction, setLastAction] = useState("No operation yet.");

    const top = stack.length ? stack[stack.length - 1] : null;
    const status = useMemo(
        () => ({
            color: stack.length ? "info" : "warning",
            label: stack.length ? `${stack.length} items` : "empty stack"
        }),
        [stack.length]
    );

    const runPush = () => {
        const value = input.trim();
        if (!value) {
            setLastAction("Push ignored: input is empty.");
            return;
        }
        setStack((prev) => [...prev, value]);
        setLastAction(`push("${value}")`);
        setInput("");
    };

    const runPop = () => {
        if (!stack.length) {
            setLastAction("Pop ignored: stack is empty.");
            return;
        }
        const popped = stack[stack.length - 1];
        setStack((prev) => prev.slice(0, -1));
        setLastAction(`pop() -> "${popped}"`);
    };

    return (
        <PlaygroundShell
            title="Stack Operations Playground"
            goal="Observe LIFO behavior by applying push and pop operations."
            status={status}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 520 }}>
                    <TextField
                        size="small"
                        label="Value to push"
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                    />
                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" onClick={runPush}>Run</Button>
                        <Button variant="outlined" color="warning" onClick={runPop}>Apply</Button>
                        <Button variant="text" onClick={() => { setStack(["A", "B"]); setInput("C"); setLastAction("Reset to initial stack."); }}>Reset</Button>
                    </Stack>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.2, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Top element (peek)</Typography>
                    <Typography variant="body2" sx={{ mt: 0.8, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                        {top ? JSON.stringify(top) : "(none)"}
                    </Typography>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    <Alert severity="info" variant="outlined">{lastAction}</Alert>
                    <Paper variant="outlined" sx={{ p: 1.2, borderRadius: 2 }}>
                        <Typography variant="caption" color="text.secondary">Stack state (bottom to top)</Typography>
                        <Typography variant="body2" sx={{ mt: 0.8, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                            [{stack.map((item) => JSON.stringify(item)).join(", ")}]
                        </Typography>
                    </Paper>
                </Stack>
            }
            code={
                <pre>
{`stack.push(value);      // add at top
const out = stack.pop(); // remove from top (LIFO)
const top = stack.at(-1);// peek without removing`}
                </pre>
            }
            note="Stacks are LIFO: the most recently pushed item is the first one popped."
        />
    );
}
