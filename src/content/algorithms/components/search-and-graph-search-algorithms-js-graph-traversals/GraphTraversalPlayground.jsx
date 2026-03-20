import { useMemo, useState } from "react";
import { Alert, FormControl, InputLabel, MenuItem, Paper, Select, Stack, Typography } from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const graph = { A: ["B", "C"], B: ["D", "E"], C: ["F"], D: [], E: ["F"], F: [] };

function bfs(start) {
  const visited = new Set([start]);
  const q = [start];
  const out = [];
  while (q.length) {
    const n = q.shift();
    out.push(n);
    for (const nx of graph[n] || []) if (!visited.has(nx)) { visited.add(nx); q.push(nx); }
  }
  return out;
}

function dfs(start) {
  const visited = new Set();
  const out = [];
  const walk = (n) => { visited.add(n); out.push(n); for (const nx of graph[n] || []) if (!visited.has(nx)) walk(nx); };
  walk(start);
  return out;
}

export default function GraphTraversalPlayground() {
  const [mode, setMode] = useState("BFS");
  const [start, setStart] = useState("A");
  const order = useMemo(() => mode === "BFS" ? bfs(start) : dfs(start), [mode, start]);

  return (
    <PlaygroundShell
      title="Graph Traversal Playground"
      goal="Compare visit order between BFS and DFS."
      status={{ color: "info", label: `${mode} from ${start}` }}
      controls={<Stack spacing={1.2} sx={{ maxWidth: 560 }}><FormControl size="small"><InputLabel id="mode">Traversal</InputLabel><Select labelId="mode" label="Traversal" value={mode} onChange={(e) => setMode(e.target.value)}><MenuItem value="BFS">BFS</MenuItem><MenuItem value="DFS">DFS</MenuItem></Select></FormControl><FormControl size="small"><InputLabel id="start">Start</InputLabel><Select labelId="start" label="Start" value={start} onChange={(e) => setStart(e.target.value)}>{Object.keys(graph).map((k) => <MenuItem key={k} value={k}>{k}</MenuItem>)}</Select></FormControl></Stack>}
      preview={<Paper variant="outlined" sx={{ p: 1.2, borderRadius: 2 }}><Typography variant="caption" color="text.secondary">Graph</Typography><Typography variant="body2" sx={{ mt: 0.8 }}>A to B,C | B to D,E | C to F</Typography></Paper>}
      output={<Alert severity="info" variant="outlined">Order: {order.join(" -> ")}</Alert>}
      note="Use BFS for layer exploration and DFS for depth-oriented workflows."
    />
  );
}
