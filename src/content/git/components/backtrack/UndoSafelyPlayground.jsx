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
    file: {
        label: "Undo one file",
        working: true,
        staged: true,
        commitsAhead: 0
    },
    head: {
        label: "Undo last commit",
        working: false,
        staged: false,
        commitsAhead: 1
    }
};

const COMMANDS = [
    { value: "restore-file", label: "git restore filename" },
    { value: "reset-soft", label: "git reset --soft HEAD~1" },
    { value: "reset-mixed", label: "git reset --mixed HEAD~1" },
    { value: "reset-hard", label: "git reset --hard HEAD~1" }
];

function applyCommand(state, command) {
    const next = { ...state };
    let message = "";
    let severity = "info";

    if (command === "restore-file") {
        next.working = false;
        message = "Discarded working tree changes for the selected file.";
        severity = "warning";
        return { next, message, severity };
    }

    if (command === "reset-soft") {
        next.commitsAhead = Math.max(0, next.commitsAhead - 1);
        next.staged = true;
        message = "Moved HEAD back and kept all reverted commit changes staged.";
        return { next, message, severity };
    }

    if (command === "reset-mixed") {
        next.commitsAhead = Math.max(0, next.commitsAhead - 1);
        next.staged = false;
        next.working = true;
        message = "Moved HEAD back, unstaged changes, kept content in working tree.";
        return { next, message, severity };
    }

    next.commitsAhead = Math.max(0, next.commitsAhead - 1);
    next.staged = false;
    next.working = false;
    message = "Moved HEAD back and discarded staged + working changes.";
    severity = "error";
    return { next, message, severity };
}

export default function UndoSafelyPlayground() {
    const [scenario, setScenario] = useState("file");
    const [command, setCommand] = useState("restore-file");
    const [targetRef, setTargetRef] = useState("HEAD~1");
    const [targetFile, setTargetFile] = useState("scene-2.txt");
    const [state, setState] = useState({ ...SCENARIOS.file });
    const [feedback, setFeedback] = useState({ message: "Select a command and run it.", severity: "info" });

    const run = () => {
        setState((prev) => {
            const { next, message, severity } = applyCommand(prev, command);
            const withTarget = command === "restore-file"
                ? `${message} Target file: ${targetFile}.`
                : `${message} Target ref: ${targetRef}.`;
            setFeedback({ message: withTarget, severity });
            return next;
        });
    };

    const reset = () => {
        setState({ ...SCENARIOS[scenario] });
        setFeedback({ message: "Scenario reset.", severity: "info" });
    };

    const impactRows = useMemo(() => {
        return [
            `Working tree: ${state.working ? "has changes" : "clean"}`,
            `Staging area: ${state.staged ? "has changes" : "empty"}`,
            `History ahead commits: ${state.commitsAhead}`
        ];
    }, [state]);

    return (
        <PlaygroundShell
            title="Undo Safely Playground"
            goal="Compare how restore/reset modes affect working tree, staging, and commit history."
            status={{
                color: command === "reset-hard" ? "error" : "info",
                label: command === "reset-hard" ? "Destructive mode" : "Safe preview"
            }}
            controls={
                <Stack spacing={1.4} sx={{ maxWidth: 580 }}>
                    <FormControl size="small">
                        <InputLabel id="undo-scenario-label">Scenario</InputLabel>
                        <Select
                            labelId="undo-scenario-label"
                            label="Scenario"
                            value={scenario}
                            onChange={(event) => {
                                const value = event.target.value;
                                setScenario(value);
                                setState({ ...SCENARIOS[value] });
                                setFeedback({ message: "Scenario changed.", severity: "info" });
                            }}
                        >
                            {Object.entries(SCENARIOS).map(([key, value]) => (
                                <MenuItem key={key} value={key}>{value.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl size="small">
                        <InputLabel id="undo-command-label">Undo command</InputLabel>
                        <Select
                            labelId="undo-command-label"
                            label="Undo command"
                            value={command}
                            onChange={(event) => setCommand(event.target.value)}
                        >
                            {COMMANDS.map((item) => (
                                <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        size="small"
                        label="Target file"
                        value={targetFile}
                        onChange={(event) => setTargetFile(event.target.value)}
                        disabled={command !== "restore-file"}
                    />
                    <TextField
                        size="small"
                        label="Target ref"
                        value={targetRef}
                        onChange={(event) => setTargetRef(event.target.value)}
                        disabled={command === "restore-file"}
                        placeholder="HEAD~1"
                    />

                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" onClick={run}>Run</Button>
                        <Button variant="outlined" onClick={reset}>Reset</Button>
                    </Stack>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Impact matrix</Typography>
                    <Stack spacing={0.7} sx={{ mt: 1 }}>
                        {impactRows.map((row) => (
                            <Typography key={row} variant="body2" sx={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                                {row}
                            </Typography>
                        ))}
                    </Stack>
                </Paper>
            }
            output={<Alert severity={feedback.severity} variant="outlined">{feedback.message}</Alert>}
            code={
                <pre>{`${command === "restore-file" ? `git restore ${targetFile}` : `git reset ${command.replace("reset-", "--")} ${targetRef}`}

# resulting state
# working: ${state.working ? "changed" : "clean"}
# staged: ${state.staged ? "yes" : "no"}
# commits ahead: ${state.commitsAhead}`}</pre>
            }
            note="Add the exact target (file or ref) before running undo: most mistakes come from the right command with the wrong target."
        />
    );
}
