import { useState } from "react";
import { Alert, Button, Checkbox, FormControlLabel, Paper, Stack, Typography } from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

export default function DeploymentReadinessPlayground() {
  const [checks, setChecks] = useState({ tests: true, rollback: false, monitoring: true, envs: true });
  const ready = checks.tests && checks.rollback && checks.monitoring && checks.envs;
  const toggle = (k) => setChecks((p) => ({ ...p, [k]: !p[k] }));

  return (
    <PlaygroundShell
      title="Deployment Readiness Playground"
      goal="Assess if release prerequisites are satisfied before deployment."
      status={{ color: ready ? "success" : "warning", label: ready ? "ready" : "not-ready" }}
      controls={<Stack spacing={0.8} sx={{ maxWidth: 520 }}>
        <FormControlLabel control={<Checkbox checked={checks.tests} onChange={() => toggle("tests")} />} label="Regression tests green" />
        <FormControlLabel control={<Checkbox checked={checks.rollback} onChange={() => toggle("rollback")} />} label="Rollback plan documented" />
        <FormControlLabel control={<Checkbox checked={checks.monitoring} onChange={() => toggle("monitoring")} />} label="Monitoring and alerts configured" />
        <FormControlLabel control={<Checkbox checked={checks.envs} onChange={() => toggle("envs")} />} label="Environment config verified" />
        <Stack direction="row" spacing={1}><Button variant="outlined" onClick={() => setChecks({ tests: true, rollback: false, monitoring: true, envs: true })}>Reset</Button></Stack>
      </Stack>}
      preview={<Paper variant="outlined" sx={{ p: 1.2, borderRadius: 2 }}><Typography variant="caption" color="text.secondary">Go/No-go</Typography><Typography variant="body2" sx={{ mt: 0.8 }}>{ready ? "Go" : "No-go"}</Typography></Paper>}
      output={<Alert severity={ready ? "success" : "info"} variant="outlined">{ready ? "Proceed with deployment window." : "Close missing readiness checks before release."}</Alert>}
      note="Consistent pre-release gates reduce incident frequency."
    />
  );
}
