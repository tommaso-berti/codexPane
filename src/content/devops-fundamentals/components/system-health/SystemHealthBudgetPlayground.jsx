import { useMemo, useState } from "react";
import { Alert, Button, Paper, Slider, Stack, Typography } from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

export default function SystemHealthBudgetPlayground() {
  const [latency, setLatency] = useState(220);
  const [errorRate, setErrorRate] = useState(1.5);
  const [availability, setAvailability] = useState(99.7);

  const status = useMemo(() => {
    if (latency <= 200 && errorRate <= 1 && availability >= 99.9) return { level: "healthy", color: "success" };
    if (latency <= 300 && errorRate <= 2 && availability >= 99.5) return { level: "warning", color: "warning" };
    return { level: "critical", color: "error" };
  }, [latency, errorRate, availability]);

  return (
    <PlaygroundShell
      title="System Health Budget Playground"
      goal="Evaluate service health from latency, error rate, and availability targets."
      status={{ color: status.color, label: status.level }}
      controls={<Stack spacing={1.5} sx={{ maxWidth: 520 }}>
        <Typography variant="body2">Latency (ms): {latency}</Typography>
        <Slider min={50} max={500} value={latency} onChange={(_, v) => setLatency(v)} />
        <Typography variant="body2">Error rate (%): {errorRate.toFixed(1)}</Typography>
        <Slider min={0} max={5} step={0.1} value={errorRate} onChange={(_, v) => setErrorRate(v)} />
        <Typography variant="body2">Availability (%): {availability.toFixed(2)}</Typography>
        <Slider min={95} max={100} step={0.01} value={availability} onChange={(_, v) => setAvailability(v)} />
        <Stack direction="row" spacing={1}><Button variant="outlined" onClick={() => { setLatency(220); setErrorRate(1.5); setAvailability(99.7); }}>Reset</Button></Stack>
      </Stack>}
      preview={<Paper variant="outlined" sx={{ p: 1.2, borderRadius: 2 }}><Typography variant="caption" color="text.secondary">Current budget</Typography><Typography variant="body2" sx={{ mt: 0.8 }}>{`Latency ${latency}ms | Error ${errorRate.toFixed(1)}% | Availability ${availability.toFixed(2)}%`}</Typography></Paper>}
      output={<Alert severity={status.color} variant="outlined">{status.level === "healthy" ? "SLOs are within target." : status.level === "warning" ? "Some indicators are drifting; schedule remediation." : "SLO breach risk is high; trigger incident response."}</Alert>}
      note="Track a small set of user-impacting metrics instead of vanity numbers."
    />
  );
}
