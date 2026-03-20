import { useMemo, useState } from "react";
import { Alert, FormControl, InputLabel, MenuItem, Paper, Select, Stack, Typography } from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const presets = {
  named: { exportCode: "module.exports.fn = fn;", importCode: "const mod = require('./mod');" },
  destructured: { exportCode: "module.exports.fn = fn;", importCode: "const { fn } = require('./mod');" },
  object: { exportCode: "module.exports = { fn, other };", importCode: "const mod = require('./mod');" }
};

export default function ModuleExportImportPlayground() {
  const [mode, setMode] = useState("named");
  const p = useMemo(() => presets[mode], [mode]);
  return (
    <PlaygroundShell
      title="CommonJS Export/Import Playground"
      goal="Match require syntax with module.exports shape."
      status={{ color: "info", label: mode }}
      controls={<Stack spacing={1.2} sx={{ maxWidth: 520 }}><FormControl size="small"><InputLabel id="m">Pattern</InputLabel><Select labelId="m" label="Pattern" value={mode} onChange={(e) => setMode(e.target.value)}><MenuItem value="named">Named</MenuItem><MenuItem value="destructured">Destructured</MenuItem><MenuItem value="object">Object</MenuItem></Select></FormControl></Stack>}
      preview={<Paper variant="outlined" sx={{ p: 1.2, borderRadius: 2 }}><Typography variant="caption" color="text.secondary">Export</Typography><Typography component="pre" variant="body2" sx={{ mt: 0.8, mb: 0 }}>{p.exportCode}</Typography></Paper>}
      output={<Alert severity="info" variant="outlined">Import: {p.importCode}</Alert>}
      note="Most CommonJS errors come from import style mismatch, not logic bugs."
    />
  );
}
