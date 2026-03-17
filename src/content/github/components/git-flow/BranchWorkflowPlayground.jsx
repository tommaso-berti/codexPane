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

const STEPS = [
    { value: "branch", label: "Create branch" },
    { value: "commit", label: "Commit on feature" },
    { value: "rebase", label: "Rebase on main" },
    { value: "merge", label: "Merge into main" }
];

export default function BranchWorkflowPlayground() {
    const [branchName, setBranchName] = useState("feature/login-form");
    const [step, setStep] = useState("branch");
    const [state, setState] = useState({ branched: false, committed: false, rebased: false, merged: false });
    const [feedback, setFeedback] = useState("Select a step and apply it in order.");

    const applyStep = () => {
        setState((prev) => {
            const next = { ...prev };

            if (step === "branch") {
                next.branched = true;
                setFeedback("Created and switched to " + branchName + ".");
                return next;
            }

            if (step === "commit") {
                if (!next.branched) {
                    setFeedback("Create a feature branch before committing.");
                    return next;
                }
                next.committed = true;
                setFeedback("Added one commit on " + branchName + ".");
                return next;
            }

            if (step === "rebase") {
                if (!next.committed) {
                    setFeedback("Commit your work before rebasing.");
                    return next;
                }
                next.rebased = true;
                setFeedback("Rebased " + branchName + " on top of main.");
                return next;
            }

            if (!next.rebased) {
                setFeedback("Rebase before merge to reduce integration surprises.");
                return next;
            }
            next.merged = true;
            setFeedback("Merged " + branchName + " into main.");
            return next;
        });
    };

    const reset = () => {
        setState({ branched: false, committed: false, rebased: false, merged: false });
        setFeedback("Workflow reset.");
    };

    const graphLines = useMemo(() => {
        const lines = ["main: o---o"]; 
        if (state.branched) lines.push(branchName + ":     \\\\---o");
        if (state.committed) lines.push(branchName + ":     \\\\---o---o");
        if (state.rebased) lines.push(branchName + " (rebased): o---o---o");
        if (state.merged) lines.push("main (merged): o---o---o---M");
        return lines;
    }, [branchName, state]);

    const checks = [
        { ok: state.branched, label: "Feature branch exists" },
        { ok: state.committed, label: "Feature commit exists" },
        { ok: state.rebased, label: "Feature branch rebased" },
        { ok: state.merged, label: "Feature merged to main" }
    ];

    const passed = checks.filter((c) => c.ok).length;

    return (
        <PlaygroundShell
            title="Branch Workflow Playground"
            goal="Practice the safe sequence: branch, commit, rebase, and merge."
            status={{ color: state.merged ? "success" : "info", label: passed + "/4 workflow steps" }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 620 }}>
                    <TextField
                        size="small"
                        label="Feature branch"
                        value={branchName}
                        onChange={(event) => setBranchName(event.target.value)}
                    />
                    <FormControl size="small">
                        <InputLabel id="flow-step-label">Step</InputLabel>
                        <Select
                            labelId="flow-step-label"
                            label="Step"
                            value={step}
                            onChange={(event) => setStep(event.target.value)}
                        >
                            {STEPS.map((item) => (
                                <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" onClick={applyStep}>Apply</Button>
                        <Button variant="outlined" onClick={reset}>Reset</Button>
                    </Stack>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.4, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Mini history graph</Typography>
                    <pre style={{ margin: "8px 0 0", fontSize: 12, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                        {graphLines.join("\n")}
                    </pre>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    <Alert severity="info" variant="outlined">{feedback}</Alert>
                    {checks.map((item) => (
                        <Alert key={item.label} severity={item.ok ? "success" : "warning"} variant="outlined">
                            {item.label}
                        </Alert>
                    ))}
                </Stack>
            }
            note="Use a focused feature branch and linearize with rebase before merging to keep history readable."
        />
    );
}
