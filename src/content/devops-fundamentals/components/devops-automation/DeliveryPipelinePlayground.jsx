import { useState } from "react";
import { Alert, Button, Checkbox, FormControlLabel, Paper, Stack, Typography } from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

export default function DeliveryPipelinePlayground() {
  const [checks, setChecks] = useState({ tests: true, lint: true, scan: false, deployApproval: true });
  const canDeploy = checks.tests && checks.lint && checks.scan && checks.deployApproval;

  const toggle = (k) => setChecks((p) => ({ ...p, [k]: !p[k] }));

  return (
    <PlaygroundShell
      title="Delivery Pipeline Gate Playground"
      goal="See how automation gates affect release readiness."
      status={{ color: canDeploy ? "success" : "warning", label: canDeploy ? "deploy-ready" : "blocked" }}
      controls={<Stack spacing={0.8} sx={{ maxWidth: 520 }}>
        <FormControlLabel control={<Checkbox checked={checks.tests} onChange={() => toggle("tests")} />} label="Tests passed" />
        <FormControlLabel control={<Checkbox checked={checks.lint} onChange={() => toggle("lint")} />} label="Lint/quality gate" />
        <FormControlLabel control={<Checkbox checked={checks.scan} onChange={() => toggle("scan")} />} label="Security scan passed" />
        <FormControlLabel control={<Checkbox checked={checks.deployApproval} onChange={() => toggle("deployApproval")} />} label="Release approval" />
        <Stack direction="row" spacing={1}><Button variant="text" onClick={() => setChecks({ tests: true, lint: true, scan: false, deployApproval: true })}>Reset</Button></Stack>
      </Stack>}
      preview={<Paper variant="outlined" sx={{ p: 1.2, borderRadius: 2 }}><Typography variant="caption" color="text.secondary">Pipeline</Typography><Typography variant="body2" sx={{ mt: 0.8 }}>{canDeploy ? "All gates passed." : "At least one gate is failing."}</Typography></Paper>}
      output={<Alert severity={canDeploy ? "success" : "info"} variant="outlined">{canDeploy ? "Run deployment automatically." : "Keep the pipeline blocked until all gates pass."}</Alert>}
      note="Automated gates reduce risky manual hand-offs and late defect discovery."
    />
  );
}
