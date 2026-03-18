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
    TextField,
    Typography
} from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const SCENARIOS = {
    store: { label: "Store setup", expected: "src/app/store.js" },
    slice: { label: "Feature slice", expected: "src/features/todos/todosSlice.js" },
    ui: { label: "Shared button component", expected: "src/components/Button.jsx" }
};

export default function FolderMappingPlayground() {
    const [scenario, setScenario] = useState("store");
    const [pathInput, setPathInput] = useState(SCENARIOS.store.expected);
    const [result, setResult] = useState("No mapping checked yet.");

    const expected = SCENARIOS[scenario].expected;

    const run = () => {
        const ok = pathInput.trim() === expected;
        setResult(ok ? "Path mapping looks correct." : `Expected: ${expected}`);
    };

    const reset = () => {
        setScenario("store");
        setPathInput(SCENARIOS.store.expected);
        setResult("Reset complete.");
    };

    const checks = useMemo(
        () => [
            { ok: pathInput.trim().startsWith("src/"), text: "Path is rooted under src/." },
            { ok: pathInput.trim() === expected, text: "Path matches scenario expectation." }
        ],
        [expected, pathInput]
    );

    return (
        <PlaygroundShell
            title="Redux Folder Mapping Playground"
            goal="Map each Redux concern to the right project folder location."
            status={{ color: checks[1].ok ? "success" : "warning", label: SCENARIOS[scenario].label }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 680 }}>
                    <FormControl size="small">
                        <InputLabel id="folder-scenario-label">Concern</InputLabel>
                        <Select
                            labelId="folder-scenario-label"
                            label="Concern"
                            value={scenario}
                            onChange={(event) => {
                                const value = event.target.value;
                                setScenario(value);
                                setPathInput(SCENARIOS[value].expected);
                            }}
                        >
                            {Object.entries(SCENARIOS).map(([value, item]) => (
                                <MenuItem key={value} value={value}>{item.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        size="small"
                        label="Path"
                        value={pathInput}
                        onChange={(event) => setPathInput(event.target.value)}
                    />
                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" onClick={run}>Run</Button>
                        <Button variant="outlined" onClick={reset}>Reset</Button>
                    </Stack>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.4, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Scenario expectation</Typography>
                    <Typography sx={{ mt: 1 }}>{SCENARIOS[scenario].label}</Typography>
                    <Typography variant="body2" color="text.secondary">Expected path: {expected}</Typography>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    <Alert severity={checks[1].ok ? "success" : "warning"} variant="outlined">{result}</Alert>
                    {checks.map((item) => (
                        <Alert key={item.text} severity={item.ok ? "success" : "warning"} variant="outlined">
                            {item.text}
                        </Alert>
                    ))}
                </Stack>
            }
            code={
                <pre>{`const folderMap = {
  store: "src/app/store.js",
  slice: "src/features/todos/todosSlice.js",
  ui: "src/components/Button.jsx"
};

const expectedPath = folderMap["${scenario}"];
const isCorrect = "${pathInput.trim()}" === expectedPath;`}</pre>
            }
            note="A predictable folder map keeps Redux setup scalable as feature count grows."
        />
    );
}
