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

const INITIAL = ["Print trail map", "Pack snacks", "Summit the mountain"];

export default function ReducerPlayground() {
    const [items, setItems] = useState(INITIAL);
    const [input, setInput] = useState("");
    const [lastAction, setLastAction] = useState("No action dispatched yet.");

    const dispatchAdd = () => {
        const text = input.trim();
        if (!text) {
            setLastAction("Ignored addTodo: payload is empty.");
            return;
        }
        setItems((prev) => [...prev, text]);
        setLastAction(`dispatch({ type: "todos/addTodo", payload: "${text}" })`);
        setInput("");
    };

    const dispatchClear = () => {
        setItems([]);
        setLastAction('dispatch({ type: "todos/removeAll" })');
    };

    const reset = () => {
        setItems(INITIAL);
        setInput("");
        setLastAction("Reset to initial reducer state.");
    };

    const checks = useMemo(
        () => [
            { ok: true, text: `Current todos count: ${items.length}` },
            { ok: !input.trim(), text: "Input payload is currently clean (empty)." },
            { ok: lastAction.includes("dispatch"), text: "Action flow has been exercised." }
        ],
        [input, items.length, lastAction]
    );

    return (
        <PlaygroundShell
            title="Reducer Action Flow Playground"
            goal="Understand how dispatched actions transform reducer state." 
            status={{ color: items.length ? "info" : "warning", label: `${items.length} todos` }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 620 }}>
                    <TextField
                        size="small"
                        label="Todo payload"
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                    />
                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" onClick={dispatchAdd}>Run</Button>
                        <Button variant="outlined" color="warning" onClick={dispatchClear}>Apply clear</Button>
                        <Button variant="text" onClick={reset}>Reset</Button>
                    </Stack>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.4, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Current reducer state</Typography>
                    <Stack component="ul" sx={{ mt: 1, pl: 2.5, mb: 0 }} spacing={0.4}>
                        {items.length ? items.map((item) => (
                            <Typography key={item} component="li" variant="body2">{item}</Typography>
                        )) : <Typography component="li" variant="body2">(empty)</Typography>}
                    </Stack>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    <Alert severity="info" variant="outlined">{lastAction}</Alert>
                    {checks.map((item) => (
                        <Alert key={item.text} severity={item.ok ? "success" : "warning"} variant="outlined">
                            {item.text}
                        </Alert>
                    ))}
                </Stack>
            }
            note="Reducers stay deterministic when actions are explicit and state updates are immutable."
        />
    );
}
