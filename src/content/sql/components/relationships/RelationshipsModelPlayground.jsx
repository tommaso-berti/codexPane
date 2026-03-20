import { useMemo, useState } from "react";
import { Alert, FormControl, InputLabel, MenuItem, Paper, Select, Stack, Typography } from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const map = {
  "one-to-one": { schema: "FK + UNIQUE", note: "Use one foreign key with uniqueness constraint." },
  "one-to-many": { schema: "FK on many side", note: "Put foreign key in the child table." },
  "many-to-many": { schema: "Join table", note: "Use cross-reference table with composite key." }
};

export default function RelationshipsModelPlayground() {
  const [kind, setKind] = useState("one-to-many");
  const model = useMemo(() => map[kind], [kind]);
  return (
    <PlaygroundShell
      title="SQL Relationship Modeling Playground"
      goal="Map relationship type to practical table design."
      status={{ color: "info", label: kind }}
      controls={<Stack spacing={1.2} sx={{ maxWidth: 520 }}><FormControl size="small"><InputLabel id="rel">Relationship</InputLabel><Select labelId="rel" label="Relationship" value={kind} onChange={(e) => setKind(e.target.value)}><MenuItem value="one-to-one">One to one</MenuItem><MenuItem value="one-to-many">One to many</MenuItem><MenuItem value="many-to-many">Many to many</MenuItem></Select></FormControl></Stack>}
      preview={<Paper variant="outlined" sx={{ p: 1.2, borderRadius: 2 }}><Typography variant="caption" color="text.secondary">Schema pattern</Typography><Typography variant="body2" sx={{ mt: 0.8 }}>{model.schema}</Typography></Paper>}
      output={<Alert severity="info" variant="outlined">{model.note}</Alert>}
      note="Correct relationship modeling prevents redundant data and fragile joins."
    />
  );
}
