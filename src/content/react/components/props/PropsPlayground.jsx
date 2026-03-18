import { useMemo, useState } from "react";
import {
    Alert,
    Button,
    FormControlLabel,
    Paper,
    Stack,
    Switch,
    TextField,
    Typography
} from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

function MessageBox({ title = "Default title", children, onPing }) {
    return (
        <Paper variant="outlined" sx={{ p: 1.2, borderRadius: 1.5 }}>
            <Typography variant="subtitle2">{title}</Typography>
            <Typography variant="body2" color="text.secondary">{children || "No children provided."}</Typography>
            <Button size="small" sx={{ mt: 1 }} onClick={() => onPing("pong")}>Ping callback</Button>
        </Paper>
    );
}

export default function PropsPlayground() {
    const [title, setTitle] = useState("");
    const [name, setName] = useState("Jamel");
    const [excited, setExcited] = useState(true);
    const [trace, setTrace] = useState("No callback fired yet.");

    const childText = excited ? `Hello, ${name}!` : `Hello, ${name}.`;

    const checks = useMemo(
        () => [
            { ok: true, text: `Resolved title: ${title.trim() ? "custom prop" : "default prop"}.` },
            { ok: childText.trim().length > 0, text: "props.children carries readable content." },
            { ok: trace !== "No callback fired yet.", text: "Callback prop was invoked." }
        ],
        [childText, title, trace]
    );

    return (
        <PlaygroundShell
            title="Props Flow Playground"
            goal="Understand default props, children content, and callback props in one component."
            status={{ color: "info", label: title.trim() ? "Custom title" : "Default title" }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 560 }}>
                    <TextField
                        size="small"
                        label="Title prop (leave empty for default)"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                    <TextField
                        size="small"
                        label="Name in children"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                    <FormControlLabel
                        control={<Switch checked={excited} onChange={(event) => setExcited(event.target.checked)} />}
                        label="Excited punctuation"
                    />
                    <Button variant="outlined" onClick={() => setTrace("No callback fired yet.")}>Reset trace</Button>
                </Stack>
            }
            preview={
                <MessageBox
                    title={title || undefined}
                    onPing={(msg) => setTrace(`Received callback payload: ${msg}`)}
                >
                    {childText}
                </MessageBox>
            }
            output={
                <Stack spacing={1}>
                    <Alert severity="info" variant="outlined">{trace}</Alert>
                    {checks.map((item) => (
                        <Alert key={item.text} severity={item.ok ? "success" : "warning"} variant="outlined">
                            {item.text}
                        </Alert>
                    ))}
                </Stack>
            }
            note="Props define what a component receives: defaults, children, and callbacks are complementary tools."
        />
    );
}
