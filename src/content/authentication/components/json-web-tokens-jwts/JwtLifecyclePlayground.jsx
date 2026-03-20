import { useMemo, useState } from "react";
import { Alert, FormControl, InputLabel, MenuItem, Paper, Select, Stack, Typography } from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const phases = {
  issued: "Token created and returned to client after authentication.",
  sent: "Client sends token in Authorization header.",
  verified: "Server verifies signature and expiration before granting access.",
  expired: "Server rejects token and requires re-authentication."
};

export default function JwtLifecyclePlayground() {
  const [phase, setPhase] = useState("issued");
  const message = useMemo(() => phases[phase], [phase]);
  return (
    <PlaygroundShell
      title="JWT Lifecycle Playground"
      goal="Walk through issuance, usage, verification, and expiry states."
      status={{ color: phase === "expired" ? "warning" : "info", label: phase }}
      controls={<Stack spacing={1.2} sx={{ maxWidth: 520 }}><FormControl size="small"><InputLabel id="jwt">Lifecycle</InputLabel><Select labelId="jwt" label="Lifecycle" value={phase} onChange={(e) => setPhase(e.target.value)}><MenuItem value="issued">Issued</MenuItem><MenuItem value="sent">Sent</MenuItem><MenuItem value="verified">Verified</MenuItem><MenuItem value="expired">Expired</MenuItem></Select></FormControl></Stack>}
      preview={<Paper variant="outlined" sx={{ p: 1.2, borderRadius: 2 }}><Typography variant="caption" color="text.secondary">Current phase</Typography><Typography variant="body2" sx={{ mt: 0.8 }}>{phase}</Typography></Paper>}
      output={<Alert severity={phase === "expired" ? "warning" : "info"} variant="outlined">{message}</Alert>}
      note="JWT signatures protect integrity, but payload should still avoid sensitive secrets."
    />
  );
}
