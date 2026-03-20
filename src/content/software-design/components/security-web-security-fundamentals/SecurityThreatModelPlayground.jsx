import { useMemo, useState } from "react";
import { Alert, FormControl, InputLabel, MenuItem, Paper, Select, Stack, Typography } from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const mitigations = {
  xss: "Sanitize input, encode output, and enforce CSP.",
  csrf: "Use CSRF tokens and SameSite cookies.",
  injection: "Use parameterized queries and strict validation.",
  auth: "Enforce strong auth, rate limiting, and secure sessions."
};

export default function SecurityThreatModelPlayground() {
  const [threat, setThreat] = useState("xss");
  const rec = useMemo(() => mitigations[threat], [threat]);

  return (
    <PlaygroundShell
      title="Threat-to-Mitigation Playground"
      goal="Map common web threats to practical first-line controls."
      status={{ color: "info", label: threat.toUpperCase() }}
      controls={<Stack spacing={1.2} sx={{ maxWidth: 520 }}><FormControl size="small"><InputLabel id="threat">Threat</InputLabel><Select labelId="threat" label="Threat" value={threat} onChange={(e) => setThreat(e.target.value)}><MenuItem value="xss">XSS</MenuItem><MenuItem value="csrf">CSRF</MenuItem><MenuItem value="injection">Injection</MenuItem><MenuItem value="auth">Broken Auth</MenuItem></Select></FormControl></Stack>}
      preview={<Paper variant="outlined" sx={{ p: 1.2, borderRadius: 2 }}><Typography variant="caption" color="text.secondary">Recommended control set</Typography><Typography variant="body2" sx={{ mt: 0.8 }}>{rec}</Typography></Paper>}
      output={<Alert severity="info" variant="outlined">Use this as a starting baseline, then adapt to your architecture and threat model.</Alert>}
      note="Security design is about layered controls, not single fixes."
    />
  );
}
