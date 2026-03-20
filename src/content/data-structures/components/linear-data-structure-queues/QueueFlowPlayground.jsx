import { useState } from "react";
import { Alert, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

export default function QueueFlowPlayground() {
  const [queue, setQueue] = useState(["req-1", "req-2"]);
  const [input, setInput] = useState("req-3");
  const [msg, setMsg] = useState("No operation yet.");

  const enqueue = () => {
    const v = input.trim();
    if (!v) return setMsg("Enqueue ignored: empty value.");
    setQueue((prev) => [...prev, v]);
    setMsg(`Enqueued ${v}.`);
  };

  const dequeue = () => {
    if (!queue.length) return setMsg("Dequeue ignored: queue is empty.");
    const old = queue[0];
    setQueue((prev) => prev.slice(1));
    setMsg(`Dequeued ${old}.`);
  };

  return (
    <PlaygroundShell
      title="Queue FIFO Playground"
      goal="Validate first-in-first-out execution order."
      status={{ color: queue.length ? "info" : "warning", label: `${queue.length} items` }}
      controls={<Stack spacing={1.2} sx={{ maxWidth: 520 }}><TextField size="small" label="Queue item" value={input} onChange={(e) => setInput(e.target.value)} /><Stack direction="row" spacing={1}><Button variant="contained" onClick={enqueue}>Run</Button><Button variant="outlined" color="warning" onClick={dequeue}>Apply dequeue</Button><Button variant="text" onClick={() => { setQueue(["req-1", "req-2"]); setInput("req-3"); setMsg("Reset."); }}>Reset</Button></Stack></Stack>}
      preview={<Paper variant="outlined" sx={{ p: 1.2, borderRadius: 2 }}><Typography variant="caption" color="text.secondary">Front to back</Typography><Typography variant="body2" sx={{ mt: 0.8, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>{queue.length ? queue.join(" | ") : "(empty)"}</Typography></Paper>}
      output={<Alert severity="info" variant="outlined">{msg}</Alert>}
      note="Queues are ideal for request pipelines and ordered processing."
    />
  );
}
