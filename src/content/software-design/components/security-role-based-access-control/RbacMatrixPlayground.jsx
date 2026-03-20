import { useState } from "react";
import { Alert, Button, Checkbox, FormControlLabel, Paper, Stack, Typography } from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

export default function RbacMatrixPlayground() {
  const [state, setState] = useState({ admin: true, editor: true, viewer: false });
  const toggle = (k) => setState((p) => ({ ...p, [k]: !p[k] }));
  const granted = Object.entries(state).filter(([, v]) => v).map(([k]) => k);

  return (
    <PlaygroundShell
      title="RBAC Permission Matrix Playground"
      goal="Validate role permissions before implementing route-level authorization."
      status={{ color: granted.length ? "info" : "warning", label: `${granted.length} roles allowed` }}
      controls={<Stack spacing={0.8} sx={{ maxWidth: 520 }}>
        <FormControlLabel control={<Checkbox checked={state.admin} onChange={() => toggle("admin")} />} label="Admin can delete user" />
        <FormControlLabel control={<Checkbox checked={state.editor} onChange={() => toggle("editor")} />} label="Editor can delete user" />
        <FormControlLabel control={<Checkbox checked={state.viewer} onChange={() => toggle("viewer")} />} label="Viewer can delete user" />
        <Stack direction="row" spacing={1}><Button variant="outlined" onClick={() => setState({ admin: true, editor: true, viewer: false })}>Reset</Button></Stack>
      </Stack>}
      preview={<Paper variant="outlined" sx={{ p: 1.2, borderRadius: 2 }}><Typography variant="caption" color="text.secondary">Effective policy</Typography><Typography variant="body2" sx={{ mt: 0.8 }}>{granted.length ? granted.join(", ") : "No role can perform this action."}</Typography></Paper>}
      output={<Alert severity={state.viewer ? "warning" : "success"} variant="outlined">{state.viewer ? "Viewer delete permission is risky in most systems." : "Policy is aligned with least-privilege baseline."}</Alert>}
      note="Model permissions explicitly before wiring middleware checks."
    />
  );
}
