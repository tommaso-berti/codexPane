import { useMemo, useState } from "react";
import {
    Alert,
    Button,
    Paper,
    Stack,
    ToggleButton,
    ToggleButtonGroup,
    Typography
} from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

export default function ContainerPresentationalDemo() {
    const [mode, setMode] = useState("off");
    const [events, setEvents] = useState(["Container initialized."]);

    const pushEvent = (line) => setEvents((prev) => [line, ...prev].slice(0, 4));

    const apply = () => {
        const next = mode === "off" ? "on" : "off";
        setMode(next);
        pushEvent(`Container set active=${next}.`);
    };

    const checks = useMemo(
        () => [
            { ok: true, text: "Container owns the source state." },
            { ok: true, text: "Presentational children receive derived props." },
            { ok: events.length > 1, text: "Interaction generated a parent-to-child update." }
        ],
        [events.length]
    );

    return (
        <PlaygroundShell
            title="Container vs Presentational Playground"
            goal="Understand how container state flows into presentational components as props."
            status={{ color: mode === "on" ? "success" : "info", label: `active=${mode}` }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 560 }}>
                    <ToggleButtonGroup
                        exclusive
                        size="small"
                        value={mode}
                        onChange={(_, value) => value && setMode(value)}
                    >
                        <ToggleButton value="off">Off</ToggleButton>
                        <ToggleButton value="on">On</ToggleButton>
                    </ToggleButtonGroup>
                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" onClick={apply}>Run</Button>
                        <Button variant="outlined" onClick={() => { setMode("off"); setEvents(["Reset complete."]); }}>Reset</Button>
                    </Stack>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.4, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Data flow map</Typography>
                    <Typography sx={{ mt: 1 }}>Container state: active={mode}</Typography>
                    <Typography variant="body2" color="text.secondary">Child A prop: status={mode}</Typography>
                    <Typography variant="body2" color="text.secondary">Child B prop: badge={mode === "on" ? "visible" : "hidden"}</Typography>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    {checks.map((item) => (
                        <Alert key={item.text} severity={item.ok ? "success" : "warning"} variant="outlined">
                            {item.text}
                        </Alert>
                    ))}
                    <Alert severity="info" variant="outlined">Latest event: {events[0]}</Alert>
                </Stack>
            }
            note="Keep logic in containers and keep presentational components focused on rendering."
        />
    );
}
