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
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const SCENARIOS = {
    mount: {
        label: "Mount only",
        timeline: ["mount -> effect runs", "re-render -> skipped", "unmount -> cleanup"]
    },
    dependency: {
        label: "Dependency change",
        timeline: ["mount -> effect runs", "dep change -> cleanup", "dep change -> effect runs"]
    },
    unmount: {
        label: "Unmount cleanup",
        timeline: ["mount -> subscribe", "unmount -> cleanup unsubscribe"]
    }
};

export default function UseEffectPlayground() {
    const [scenario, setScenario] = useState("mount");
    const [runCount, setRunCount] = useState(0);

    const timeline = useMemo(() => SCENARIOS[scenario].timeline, [scenario]);

    return (
        <PlaygroundShell
            title="useEffect Timeline Playground"
            goal="Understand when effects run and when cleanup executes."
            status={{ color: "info", label: SCENARIOS[scenario].label }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 560 }}>
                    <FormControl size="small">
                        <InputLabel id="effect-scenario-label">Scenario</InputLabel>
                        <Select
                            labelId="effect-scenario-label"
                            label="Scenario"
                            value={scenario}
                            onChange={(event) => setScenario(event.target.value)}
                        >
                            {Object.entries(SCENARIOS).map(([value, item]) => (
                                <MenuItem key={value} value={value}>{item.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" onClick={() => setRunCount((prev) => prev + 1)}>Run</Button>
                        <Button variant="outlined" onClick={() => setRunCount(0)}>Reset</Button>
                    </Stack>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.4, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Effect flow</Typography>
                    <Stack component="ol" sx={{ mt: 1, pl: 2, mb: 0 }} spacing={0.5}>
                        {timeline.map((item) => (
                            <Typography component="li" key={item} variant="body2">{item}</Typography>
                        ))}
                    </Stack>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    <Alert severity="info" variant="outlined">Simulation runs: {runCount}</Alert>
                    <Alert severity="success" variant="outlined">Cleanup runs before the next effect or on unmount.</Alert>
                </Stack>
            }
            code={
                <pre>{`useEffect(() => {
  // setup: ${timeline[0]}
  return () => {
    // cleanup: ${timeline[timeline.length - 1]}
  };
}, ${scenario === "mount" ? "[]" : scenario === "dependency" ? "[dep]" : "[subscription]"});`}</pre>
            }
            note="Model effects as synchronization steps: setup first, cleanup symmetry second."
        />
    );
}
