import { useMemo, useState } from "react";
import { Alert, Button, Paper, Slider, Stack, Typography } from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

export default function TestScopePlannerPlayground() {
  const [unit, setUnit] = useState(60);
  const [integration, setIntegration] = useState(30);
  const [e2e, setE2e] = useState(10);

  const total = unit + integration + e2e;
  const normalized = useMemo(() => ({
    unit: Math.round((unit / total) * 100),
    integration: Math.round((integration / total) * 100),
    e2e: Math.round((e2e / total) * 100)
  }), [unit, integration, e2e, total]);

  return (
    <PlaygroundShell
      title="Test Scope Planner Playground"
      goal="Plan unit/integration/e2e balance for fast and reliable CI feedback."
      status={{ color: normalized.unit >= 50 ? "success" : "warning", label: `${normalized.unit}/${normalized.integration}/${normalized.e2e}` }}
      controls={<Stack spacing={1.2} sx={{ maxWidth: 520 }}>
        <Typography variant="body2">Unit weight: {unit}</Typography><Slider min={10} max={100} value={unit} onChange={(_, v) => setUnit(v)} />
        <Typography variant="body2">Integration weight: {integration}</Typography><Slider min={0} max={100} value={integration} onChange={(_, v) => setIntegration(v)} />
        <Typography variant="body2">E2E weight: {e2e}</Typography><Slider min={0} max={100} value={e2e} onChange={(_, v) => setE2e(v)} />
        <Stack direction="row" spacing={1}><Button variant="outlined" onClick={() => { setUnit(60); setIntegration(30); setE2e(10); }}>Reset</Button></Stack>
      </Stack>}
      preview={<Paper variant="outlined" sx={{ p: 1.2, borderRadius: 2 }}><Typography variant="caption" color="text.secondary">Normalized ratio</Typography><Typography variant="body2" sx={{ mt: 0.8 }}>{`${normalized.unit}% unit | ${normalized.integration}% integration | ${normalized.e2e}% e2e`}</Typography></Paper>}
      output={<Alert severity={normalized.e2e > 30 ? "warning" : "info"} variant="outlined">{normalized.e2e > 30 ? "High e2e share may slow feedback loops." : "Distribution supports practical TDD feedback speed."}</Alert>}
      note="Use heavy unit coverage plus targeted integration/e2e checks."
    />
  );
}
