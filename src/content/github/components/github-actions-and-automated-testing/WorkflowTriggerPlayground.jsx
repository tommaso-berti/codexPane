import { useMemo, useState } from "react";
import {
    Alert,
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

const TRIGGERS = ["push", "pull_request", "workflow_dispatch"];

export default function WorkflowTriggerPlayground() {
    const [trigger, setTrigger] = useState("pull_request");
    const [branchPattern, setBranchPattern] = useState("main");
    const [runLint, setRunLint] = useState(true);
    const [runTests, setRunTests] = useState(true);
    const [runDeploy, setRunDeploy] = useState(false);

    const checks = useMemo(() => {
        const list = [];
        list.push({
            ok: Boolean(branchPattern.trim()),
            label: "Branch filter is defined"
        });
        list.push({
            ok: runLint || runTests,
            label: "At least one quality job is enabled"
        });
        list.push({
            ok: !(runDeploy && trigger === "pull_request"),
            label: "Deploy is not triggered on pull requests"
        });
        return list;
    }, [branchPattern, runDeploy, runLint, runTests, trigger]);

    const passed = checks.filter((item) => item.ok).length;
    const runSummary = "Trigger: " + trigger + " on " + branchPattern + ". Jobs: " + [runLint ? "lint" : null, runTests ? "test" : null, runDeploy ? "deploy" : null].filter(Boolean).join(", ");

    return (
        <PlaygroundShell
            title="Workflow Trigger Playground"
            goal="Design a workflow trigger and job set that matches CI/CD intent without accidental runs."
            status={{ color: passed === checks.length ? "success" : "warning", label: passed + "/" + checks.length + " checks pass" }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 620 }}>
                    <FormControl size="small">
                        <InputLabel id="workflow-trigger-label">Trigger</InputLabel>
                        <Select
                            labelId="workflow-trigger-label"
                            label="Trigger"
                            value={trigger}
                            onChange={(event) => setTrigger(event.target.value)}
                        >
                            {TRIGGERS.map((item) => (
                                <MenuItem key={item} value={item}>{item}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        size="small"
                        label="Branch pattern"
                        value={branchPattern}
                        onChange={(event) => setBranchPattern(event.target.value)}
                        placeholder="main or release/*"
                    />
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                        <FormControlLabel control={<Switch checked={runLint} onChange={(event) => setRunLint(event.target.checked)} />} label="Run lint" />
                        <FormControlLabel control={<Switch checked={runTests} onChange={(event) => setRunTests(event.target.checked)} />} label="Run tests" />
                        <FormControlLabel control={<Switch checked={runDeploy} onChange={(event) => setRunDeploy(event.target.checked)} />} label="Run deploy" />
                    </Stack>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.4, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Simulated run summary</Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>{runSummary}</Typography>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    {checks.map((item) => (
                        <Alert key={item.label} severity={item.ok ? "success" : "warning"} variant="outlined">{item.label}</Alert>
                    ))}
                </Stack>
            }
            note="Keep deployment conditions stricter than CI checks: trigger deploy only on trusted events and branches."
        />
    );
}
