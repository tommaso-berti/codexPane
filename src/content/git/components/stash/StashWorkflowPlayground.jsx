import { useMemo, useState } from "react";
import {
    Alert,
    Button,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    Switch,
    Typography
} from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const SCENARIOS = {
    tracked: {
        label: "Tracked edits only",
        working: "2 tracked files modified",
        untracked: 0
    },
    mixed: {
        label: "Tracked + untracked",
        working: "1 tracked file modified",
        untracked: 2
    }
};

export default function StashWorkflowPlayground() {
    const [scenario, setScenario] = useState("tracked");
    const [includeUntracked, setIncludeUntracked] = useState(false);
    const [usePatch, setUsePatch] = useState(false);
    const [retrieveMode, setRetrieveMode] = useState("apply");
    const [stashList, setStashList] = useState([]);
    const [workingState, setWorkingState] = useState({ ...SCENARIOS.tracked });
    const [feedback, setFeedback] = useState("Create a stash to start the workflow.");

    const pushStash = () => {
        const nextId = "stash@{" + stashList.length + "}";
        const summary = workingState.working + (includeUntracked && workingState.untracked > 0 ? " + untracked files" : "");
        const patchText = usePatch ? " (interactive patch)" : "";

        setStashList((prev) => [{ id: nextId, message: summary + patchText }, ...prev]);
        setWorkingState((prev) => ({ ...prev, working: "clean", untracked: 0 }));
        setFeedback("Saved current changes into " + nextId + ".");
    };

    const retrieve = () => {
        if (stashList.length === 0) {
            setFeedback("No stash entries to restore.");
            return;
        }
        const top = stashList[0];
        setWorkingState({
            working: "restored changes from " + top.id,
            untracked: includeUntracked ? 1 : 0
        });
        if (retrieveMode === "pop") {
            setStashList((prev) => prev.slice(1));
            setFeedback("Applied and dropped " + top.id + ".");
        } else {
            setFeedback("Applied " + top.id + " and kept it in stash list.");
        }
    };

    const reset = () => {
        setStashList([]);
        setWorkingState({ ...SCENARIOS[scenario] });
        setFeedback("Scenario reset.");
    };

    const snapshotRows = useMemo(() => {
        return [
            "Working tree: " + workingState.working,
            "Untracked files: " + workingState.untracked,
            "Stash entries: " + stashList.length
        ];
    }, [stashList.length, workingState]);

    return (
        <PlaygroundShell
            title="Stash Workflow Playground"
            goal="Practice saving and restoring work with stash push, apply/pop, and untracked options."
            status={{ color: stashList.length > 0 ? "info" : "success", label: stashList.length + " stashes" }}
            controls={
                <Stack spacing={1.4} sx={{ maxWidth: 600 }}>
                    <FormControl size="small">
                        <InputLabel id="stash-scenario-label">Scenario</InputLabel>
                        <Select
                            labelId="stash-scenario-label"
                            label="Scenario"
                            value={scenario}
                            onChange={(event) => {
                                const value = event.target.value;
                                setScenario(value);
                                setWorkingState({ ...SCENARIOS[value] });
                                setStashList([]);
                                setFeedback("Scenario changed.");
                            }}
                        >
                            {Object.entries(SCENARIOS).map(([key, value]) => (
                                <MenuItem key={key} value={key}>{value.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControlLabel
                        control={<Switch checked={includeUntracked} onChange={(event) => setIncludeUntracked(event.target.checked)} />}
                        label="Include untracked files (-u)"
                    />
                    <FormControlLabel
                        control={<Switch checked={usePatch} onChange={(event) => setUsePatch(event.target.checked)} />}
                        label="Interactive patch mode (-p)"
                    />

                    <FormControl size="small">
                        <InputLabel id="stash-retrieve-label">Retrieve mode</InputLabel>
                        <Select
                            labelId="stash-retrieve-label"
                            label="Retrieve mode"
                            value={retrieveMode}
                            onChange={(event) => setRetrieveMode(event.target.value)}
                        >
                            <MenuItem value="apply">apply (keep stash)</MenuItem>
                            <MenuItem value="pop">pop (remove stash)</MenuItem>
                        </Select>
                    </FormControl>

                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" onClick={pushStash}>Run stash push</Button>
                        <Button variant="outlined" onClick={retrieve}>Apply / Pop</Button>
                        <Button variant="text" onClick={reset}>Reset</Button>
                    </Stack>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Repository snapshot</Typography>
                    <Stack spacing={0.7} sx={{ mt: 1 }}>
                        {snapshotRows.map((line) => (
                            <Typography key={line} variant="body2" sx={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                                {line}
                            </Typography>
                        ))}
                    </Stack>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1.1, display: "block" }}>
                        Stash list
                    </Typography>
                    <Stack spacing={0.5} sx={{ mt: 0.6 }}>
                        {stashList.length === 0 ? (
                            <Typography variant="body2" color="text.secondary">(empty)</Typography>
                        ) : stashList.map((entry) => (
                            <Typography key={entry.id + entry.message} variant="body2" sx={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                                {entry.id + ": " + entry.message}
                            </Typography>
                        ))}
                    </Stack>
                </Paper>
            }
            output={<Alert severity="info" variant="outlined">{feedback}</Alert>}
            code={
                <pre>{`git stash push ${includeUntracked ? "-u " : ""}${usePatch ? "-p " : ""}-m "WIP"
git stash list
git stash ${retrieveMode}

# top stash
${stashList[0] ? `${stashList[0].id}: ${stashList[0].message}` : "(none)"}`}</pre>
            }
            note="Use `apply` when you want to reuse a stash later; use `pop` when the stash should be consumed immediately."
        />
    );
}
