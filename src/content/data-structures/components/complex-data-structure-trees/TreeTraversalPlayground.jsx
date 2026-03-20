import { useMemo, useState } from "react";
import { Alert, FormControl, InputLabel, MenuItem, Paper, Select, Stack, Typography } from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const tree = { value: 39, left: { value: 23, left: { value: 11 }, right: { value: 35, left: { value: 31 } } }, right: { value: 64, left: { value: 52 }, right: { value: 80 } } };

function bfs(root) { const q = [root]; const out = []; while (q.length) { const n = q.shift(); if (!n) continue; out.push(n.value); if (n.left) q.push(n.left); if (n.right) q.push(n.right); } return out; }
function dfs(root, out = []) { if (!root) return out; out.push(root.value); dfs(root.left, out); dfs(root.right, out); return out; }

export default function TreeTraversalPlayground() {
  const [mode, setMode] = useState("BFS");
  const order = useMemo(() => mode === "BFS" ? bfs(tree) : dfs(tree), [mode]);
  return (
    <PlaygroundShell
      title="Tree Traversal Playground"
      goal="Compare level-order and depth-first traversal orders."
      status={{ color: "info", label: mode }}
      controls={<Stack spacing={1.2} sx={{ maxWidth: 520 }}><FormControl size="small"><InputLabel id="tree-mode">Mode</InputLabel><Select labelId="tree-mode" label="Mode" value={mode} onChange={(e) => setMode(e.target.value)}><MenuItem value="BFS">BFS</MenuItem><MenuItem value="DFS">DFS (pre-order)</MenuItem></Select></FormControl></Stack>}
      preview={<Paper variant="outlined" sx={{ p: 1.2, borderRadius: 2 }}><Typography variant="caption" color="text.secondary">Tree root</Typography><Typography variant="body2" sx={{ mt: 0.8 }}>39</Typography></Paper>}
      output={<Alert severity="info" variant="outlined">Order: {order.join(" -> ")}</Alert>}
      note="BFS explores by layers; DFS explores by branch depth."
    />
  );
}
