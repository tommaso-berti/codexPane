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
    TextField,
    Typography
} from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const LOG_PRESETS = {
    oneline: "git log --oneline",
    graph: "git log --oneline --graph --decorate",
    search: "git log -S \"navbar\""
};

const BASE_HISTORY = [
    "a18f21d feat: add navbar",
    "c2de901 fix: improve mobile spacing",
    "d99a712 docs: update readme"
];

export default function HistoryAmendPlayground() {
    const [logMode, setLogMode] = useState("oneline");
    const [amendNoEdit, setAmendNoEdit] = useState(true);
    const [includeStagedFix, setIncludeStagedFix] = useState(false);
    const [newMessage, setNewMessage] = useState("refactor: simplify navbar styles");
    const [history, setHistory] = useState(BASE_HISTORY);
    const [feedback, setFeedback] = useState("Choose a log mode or run amend simulation.");

    const runAmend = () => {
        const previous = history[0];
        const message = amendNoEdit ? previous.split(" ").slice(1).join(" ") : newMessage;
        const suffix = includeStagedFix ? " + staged changes" : " + message only";
        const nextTop = "amended-" + Math.random().toString(16).slice(2, 9) + " " + message + suffix;
        setHistory((prev) => [nextTop, ...prev.slice(1)]);
        setFeedback("Rewrote the latest commit. This simulates history rewrite on the current branch.");
    };

    const reset = () => {
        setHistory(BASE_HISTORY);
        setFeedback("History reset to base scenario.");
    };

    const renderedLog = useMemo(() => {
        if (logMode === "graph") {
            return history.map((line, index) => (index === 0 ? "* " + line : "| * " + line));
        }
        if (logMode === "search") {
            return history.filter((line) => line.includes("navbar") || line.includes("amended"));
        }
        return history;
    }, [history, logMode]);

    return (
        <PlaygroundShell
            title="History & Amend Playground"
            goal="Compare log views and see how `commit --amend` rewrites the latest commit."
            status={{ color: "warning", label: "History rewrite simulated" }}
            controls={
                <Stack spacing={1.4} sx={{ maxWidth: 620 }}>
                    <FormControl size="small">
                        <InputLabel id="history-log-mode-label">Log preset</InputLabel>
                        <Select
                            labelId="history-log-mode-label"
                            label="Log preset"
                            value={logMode}
                            onChange={(event) => setLogMode(event.target.value)}
                        >
                            <MenuItem value="oneline">{LOG_PRESETS.oneline}</MenuItem>
                            <MenuItem value="graph">{LOG_PRESETS.graph}</MenuItem>
                            <MenuItem value="search">{LOG_PRESETS.search}</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControlLabel
                        control={<Switch checked={amendNoEdit} onChange={(event) => setAmendNoEdit(event.target.checked)} />}
                        label="Use --no-edit (keep current message)"
                    />
                    <FormControlLabel
                        control={<Switch checked={includeStagedFix} onChange={(event) => setIncludeStagedFix(event.target.checked)} />}
                        label="Include staged content in amend"
                    />

                    <TextField
                        size="small"
                        label="New message (when --no-edit is off)"
                        value={newMessage}
                        onChange={(event) => setNewMessage(event.target.value)}
                        disabled={amendNoEdit}
                    />

                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" onClick={runAmend}>Apply amend</Button>
                        <Button variant="outlined" onClick={reset}>Reset</Button>
                    </Stack>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Current log output</Typography>
                    <Stack spacing={0.7} sx={{ mt: 1 }}>
                        {renderedLog.length === 0 ? (
                            <Typography variant="body2" color="text.secondary">No commits match current filter.</Typography>
                        ) : renderedLog.map((line) => (
                            <Typography key={line} variant="body2" sx={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                                {line}
                            </Typography>
                        ))}
                    </Stack>
                </Paper>
            }
            output={<Alert severity="warning" variant="outlined">{feedback}</Alert>}
            note="`git commit --amend` replaces the last commit object; avoid amending commits already pushed to shared branches."
        />
    );
}
