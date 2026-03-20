import { useMemo, useState } from "react";
import { Alert, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

function tinyHash(key, size) {
  let n = 0;
  for (const ch of key.toLowerCase()) if (ch === "a" || ch === "e") n += 1;
  return n % size;
}

export default function HashCollisionPlayground() {
  const [a, setA] = useState("peace");
  const [b, setB] = useState("eagle");
  const [size, setSize] = useState(4);
  const { ia, ib, collision } = useMemo(() => ({ ia: tinyHash(a || "", size), ib: tinyHash(b || "", size), collision: tinyHash(a || "", size) === tinyHash(b || "", size) }), [a, b, size]);

  return (
    <PlaygroundShell
      title="Hash Collision Playground"
      goal="Show how different keys can map to the same bucket."
      status={{ color: collision ? "warning" : "success", label: collision ? "collision" : "no collision" }}
      controls={<Stack spacing={1.2} sx={{ maxWidth: 560 }}><TextField size="small" label="Key A" value={a} onChange={(e) => setA(e.target.value)} /><TextField size="small" label="Key B" value={b} onChange={(e) => setB(e.target.value)} /><TextField size="small" type="number" label="Bucket count" value={size} onChange={(e) => setSize(Math.max(2, Number(e.target.value) || 4))} /><Button variant="outlined" onClick={() => { setA("peace"); setB("eagle"); setSize(4); }}>Reset</Button></Stack>}
      preview={<Paper variant="outlined" sx={{ p: 1.2, borderRadius: 2 }}><Typography variant="caption" color="text.secondary">Bucket indices</Typography><Typography variant="body2" sx={{ mt: 0.8 }}>{`A -> ${ia}, B -> ${ib}`}</Typography></Paper>}
      output={<Alert severity={collision ? "warning" : "success"} variant="outlined">{collision ? "Collision detected." : "Different buckets."}</Alert>}
      note="Collisions are expected; hash maps rely on resolution strategies for correctness."
    />
  );
}
