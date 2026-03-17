import { useMemo, useState } from "react";
import {
    Alert,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    Typography
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const SCENARIOS = {
    timers: {
        label: "Timers + microtasks",
        order: ["sync: A", "sync: B", "microtask: Promise.then", "macrotask: setTimeout"],
        summary: "Microtasks run before timers once the stack is empty."
    },
    io: {
        label: "Async I/O callback",
        order: ["sync: request start", "macrotask: response callback", "microtask: follow-up then"],
        summary: "I/O callback enters queue later, then microtasks flush before the next macrotask."
    },
    blocking: {
        label: "Blocking loop",
        order: ["sync: start block", "sync: long loop running", "sync: block ends", "queued callbacks run after block"],
        summary: "Long synchronous work delays all queued tasks."
    }
};

export default function EventLoopPlayground() {
    const [scenario, setScenario] = useState("timers");
    const [ran, setRan] = useState(false);

    const selected = useMemo(() => SCENARIOS[scenario], [scenario]);

    return (
        <PlaygroundShell
            title="Event Loop Ordering Playground"
            goal="See the execution order between synchronous code, microtasks, and macrotasks."
            status={{ color: ran ? "success" : "info", label: selected.label }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 620 }}>
                    <FormControl size="small" sx={{ minWidth: 240 }}>
                        <InputLabel id="event-loop-scenario-label">Scenario</InputLabel>
                        <Select
                            labelId="event-loop-scenario-label"
                            label="Scenario"
                            value={scenario}
                            onChange={(event) => setScenario(event.target.value)}
                        >
                            {Object.entries(SCENARIOS).map(([key, value]) => (
                                <MenuItem key={key} value={key}>{value.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" onClick={() => setRan(true)}>Run</Button>
                        <Button variant="outlined" onClick={() => setRan(false)}>Clear</Button>
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
                    <Typography variant="caption" color="text.secondary">Ordering rule</Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>{selected.summary}</Typography>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    {!ran ? (
                        <Alert severity="info" variant="outlined">Run the scenario to reveal execution order.</Alert>
                    ) : (
                        <Paper variant="outlined" sx={{ p: 1.2, borderRadius: 2 }}>
                            <Typography variant="caption" color="text.secondary">Observed order</Typography>
                            <Stack spacing={0.4} sx={{ mt: 1 }}>
                                {selected.order.map((line, index) => (
                                    <Typography key={line} variant="body2" sx={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                                        {index + 1}. {line}
                                    </Typography>
                                ))}
                            </Stack>
                        </Paper>
                    )}
                </Stack>
            }
            note="Reasoning about task queues helps prevent timing bugs and UI jank."
        />
    );
}
