import { useMemo, useState } from "react";
import { Alert, Button, MenuItem, Paper, Select, Stack, TextField, Typography } from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

function parseBurst(raw) {
  return raw.split(",").map((n) => Number(n.trim())).filter((n) => Number.isFinite(n) && n > 0);
}

export default function SchedulingPolicyPlayground() {
  const [policy, setPolicy] = useState("sjf");
  const [burstRaw, setBurstRaw] = useState("8,4,2,6");
  const jobs = useMemo(() => parseBurst(burstRaw), [burstRaw]);
  const ordered = useMemo(() => {
    if (policy === "sjf") return [...jobs].sort((a, b) => a - b);
    if (policy === "lifo") return [...jobs].reverse();
    return [...jobs];
  }, [jobs, policy]);

  return (
    <PlaygroundShell
      title="CPU Scheduling Policy Playground"
      goal="Compare execution order under FIFO, SJF, and LIFO-like policies."
      status={{ color: ordered.length ? "info" : "warning", label: policy.toUpperCase() }}
      controls={<Stack spacing={1.2} sx={{ maxWidth: 520 }}>
        <Select size="small" value={policy} onChange={(e) => setPolicy(e.target.value)}>
          <MenuItem value="fifo">FIFO</MenuItem>
          <MenuItem value="sjf">SJF</MenuItem>
          <MenuItem value="lifo">LIFO (conceptual)</MenuItem>
        </Select>
        <TextField size="small" label="CPU bursts (comma-separated)" value={burstRaw} onChange={(e) => setBurstRaw(e.target.value)} />
        <Stack direction="row" spacing={1}><Button variant="outlined" onClick={() => { setPolicy("sjf"); setBurstRaw("8,4,2,6"); }}>Reset</Button></Stack>
      </Stack>}
      preview={<Paper variant="outlined" sx={{ p: 1.2, borderRadius: 2 }}><Typography variant="caption" color="text.secondary">Execution order</Typography><Typography variant="body2" sx={{ mt: 0.8 }}>{ordered.length ? ordered.join(" -> ") : "Provide valid bursts"}</Typography></Paper>}
      output={<Alert severity={ordered.length ? "info" : "error"} variant="outlined">{ordered.length ? "Use this to reason about throughput vs response time tradeoffs." : "Add at least one positive burst time."}</Alert>}
      note="Real kernels use preemptive and priority-aware algorithms, but this mental model is useful."
    />
  );
}
