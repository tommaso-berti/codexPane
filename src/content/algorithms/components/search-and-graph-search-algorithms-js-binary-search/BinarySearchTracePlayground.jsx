import { useMemo, useState } from "react";
import { Alert, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

function solve(list, target) {
  let left = 0;
  let right = list.length - 1;
  const trace = [];
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const value = list[mid];
    trace.push({ left, right, mid, value });
    if (value === target) return { index: mid, trace };
    if (value < target) left = mid + 1;
    else right = mid - 1;
  }
  return { index: -1, trace };
}

export default function BinarySearchTracePlayground() {
  const [raw, setRaw] = useState("1,2,7,8,22,28,41");
  const [targetRaw, setTargetRaw] = useState("22");
  const [result, setResult] = useState({ index: -1, trace: [] });
  const [error, setError] = useState("");

  const run = () => {
    const list = raw.split(",").map((x) => Number(x.trim())).filter((x) => Number.isFinite(x));
    const target = Number(targetRaw);
    if (!list.length || !Number.isFinite(target)) {
      setError("Provide a numeric sorted list and target.");
      return;
    }
    setError("");
    setResult(solve(list, target));
  };

  const status = useMemo(() => ({ color: error ? "error" : "info", label: `${result.trace.length} checks` }), [error, result.trace.length]);

  return (
    <PlaygroundShell
      title="Binary Search Trace Playground"
      goal="Track how left, right, and mid move at each iteration."
      status={status}
      controls={<Stack spacing={1.2} sx={{ maxWidth: 620 }}><TextField size="small" label="Sorted list" value={raw} onChange={(e) => setRaw(e.target.value)} /><TextField size="small" label="Target" value={targetRaw} onChange={(e) => setTargetRaw(e.target.value)} /><Stack direction="row" spacing={1}><Button variant="contained" onClick={run}>Run</Button><Button variant="outlined" onClick={() => { setRaw("1,2,7,8,22,28,41"); setTargetRaw("22"); setResult({ index: -1, trace: [] }); setError(""); }}>Reset</Button></Stack></Stack>}
      preview={<Paper variant="outlined" sx={{ p: 1.2, borderRadius: 2 }}><Typography variant="caption" color="text.secondary">Outcome</Typography><Typography variant="body2" sx={{ mt: 0.8 }}>{result.trace.length ? (result.index >= 0 ? `Found at index ${result.index}` : "Not found") : "Run to generate trace"}</Typography></Paper>}
      output={<Stack spacing={1}>{error ? <Alert severity="error" variant="outlined">{error}</Alert> : null}<Paper variant="outlined" sx={{ p: 1.2, borderRadius: 2 }}><Typography variant="caption" color="text.secondary">Trace</Typography><Stack spacing={0.4} sx={{ mt: 1 }}>{result.trace.map((r, i) => <Typography key={i} variant="body2" sx={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>{`step ${i + 1}: left=${r.left}, right=${r.right}, mid=${r.mid}, value=${r.value}`}</Typography>)}</Stack></Paper></Stack>}
      note="Binary search requires sorted input and reduces search space by half each step."
    />
  );
}
