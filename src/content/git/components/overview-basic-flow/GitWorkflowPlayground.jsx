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
    untracked: {
        label: "New untracked file",
        working: "scene-1.txt (untracked)",
        tracked: false,
        staged: false,
        commits: 0
    },
    modified: {
        label: "Tracked file edited",
        working: "scene-2.txt (modified)",
        tracked: true,
        staged: false,
        commits: 2
    }
};

const ACTIONS = [
    { value: "status", label: "git status" },
    { value: "add", label: "git add scene-1.txt" },
    { value: "commit", label: "git commit -m \"save change\"" },
    { value: "log", label: "git log --oneline" }
];

function cloneState(base) {
    return { ...base };
}

export default function GitWorkflowPlayground() {
    const [scenario, setScenario] = useState("untracked");
    const [action, setAction] = useState("status");
    const [fileName, setFileName] = useState("scene-1.txt");
    const [commitMessage, setCommitMessage] = useState("save change");
    const [state, setState] = useState(() => cloneState(SCENARIOS.untracked));
    const [message, setMessage] = useState("Run an action to inspect or change repository state.");

    const reset = () => {
        const next = cloneState(SCENARIOS[scenario]);
        setState(next);
        setMessage("Scenario reset.");
    };

    const runAction = () => {
        setState((prev) => {
            const next = { ...prev };

            if (action === "status") {
                setMessage(next.staged
                    ? "Changes are staged and ready to commit."
                    : next.working
                        ? "Working tree has pending changes."
                        : "Working tree is clean.");
                return next;
            }

            if (action === "add") {
                if (!next.working) {
                    setMessage("Nothing to stage.");
                    return next;
                }
                next.staged = true;
                next.tracked = true;
                setMessage(`Moved ${fileName} from working tree to staging area.`);
                return next;
            }

            if (action === "commit") {
                if (!next.staged) {
                    setMessage("Commit skipped: stage at least one change first.");
                    return next;
                }
                next.commits += 1;
                next.staged = false;
                next.working = "";
                setMessage(`Created commit "${commitMessage}" from staged changes.`);
                return next;
            }

            if (action === "log") {
                setMessage(`History has ${next.commits} commit${next.commits === 1 ? "" : "s"}.`);
                return next;
            }

            return next;
        });
    };

    const summary = useMemo(() => {
        const lines = [
            `Working tree: ${state.working || "clean"}`,
            `Staging area: ${state.staged ? "has staged changes" : "empty"}`,
            `Commit count: ${state.commits}`
        ];
        return lines;
    }, [state]);

    const status = state.staged
        ? { color: "warning", label: "Staged changes" }
        : state.working
            ? { color: "info", label: "Working changes" }
            : { color: "success", label: "Clean tree" };

    return (
        <PlaygroundShell
            title="Git Workflow Playground"
            goal="Understand how changes move from working tree to staging area to commit history."
            status={status}
            controls={
                <Stack spacing={1.4} sx={{ maxWidth: 560 }}>
                    <FormControl size="small">
                        <InputLabel id="git-workflow-scenario-label">Scenario</InputLabel>
                        <Select
                            labelId="git-workflow-scenario-label"
                            label="Scenario"
                            value={scenario}
                            onChange={(event) => {
                                const key = event.target.value;
                                setScenario(key);
                                setState(cloneState(SCENARIOS[key]));
                                setMessage("Scenario changed.");
                            }}
                        >
                            {Object.entries(SCENARIOS).map(([key, value]) => (
                                <MenuItem key={key} value={key}>{value.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl size="small">
                        <InputLabel id="git-workflow-action-label">Action</InputLabel>
                        <Select
                            labelId="git-workflow-action-label"
                            label="Action"
                            value={action}
                            onChange={(event) => setAction(event.target.value)}
                        >
                            {ACTIONS.map((item) => (
                                <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        size="small"
                        label="File name"
                        value={fileName}
                        onChange={(event) => setFileName(event.target.value)}
                        placeholder="scene-1.txt"
                    />
                    <TextField
                        size="small"
                        label="Commit message"
                        value={commitMessage}
                        onChange={(event) => setCommitMessage(event.target.value)}
                        placeholder="save change"
                    />

                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" onClick={runAction}>Run</Button>
                        <Button variant="outlined" onClick={reset}>Reset</Button>
                    </Stack>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Current repository snapshot</Typography>
                    <Stack spacing={0.7} sx={{ mt: 1 }}>
                        {summary.map((line) => (
                            <Typography key={line} variant="body2" sx={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                                {line}
                            </Typography>
                        ))}
                    </Stack>
                </Paper>
            }
            output={<Alert severity="info" variant="outlined">{message}</Alert>}
            code={
                <pre>{`git status
${state.working ? "# working tree has changes" : "# working tree clean"}

git add ${fileName}
git commit -m "${commitMessage}"
git log --oneline
# commits: ${state.commits}`}</pre>
            }
            note="Run workflow steps in sequence, then tweak file/message inputs to reinforce what each command actually consumes."
        />
    );
}
