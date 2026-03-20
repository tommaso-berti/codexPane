import { useState } from "react";
import { Alert, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

export default function DoublyLinkedListPlayground() {
  const [list, setList] = useState(["A", "B", "C"]);
  const [input, setInput] = useState("D");
  const [msg, setMsg] = useState("No operation yet.");

  const addTail = () => {
    const v = input.trim();
    if (!v) return setMsg("Add ignored: empty value.");
    setList((prev) => [...prev, v]);
    setMsg(`Tail moved to ${v}.`);
  };

  const removeTail = () => {
    if (!list.length) return setMsg("Remove ignored: list is empty.");
    const old = list[list.length - 1];
    setList((prev) => prev.slice(0, -1));
    setMsg(`Removed ${old} from tail.`);
  };

  return (
    <PlaygroundShell
      title="Doubly Linked List Tail Playground"
      goal="Observe append and remove at the tail."
      status={{ color: list.length ? "info" : "warning", label: `${list.length} nodes` }}
      controls={<Stack spacing={1.2} sx={{ maxWidth: 520 }}><TextField size="small" label="Node value" value={input} onChange={(e) => setInput(e.target.value)} /><Stack direction="row" spacing={1}><Button variant="contained" onClick={addTail}>Run</Button><Button variant="outlined" color="warning" onClick={removeTail}>Apply remove</Button><Button variant="text" onClick={() => { setList(["A", "B", "C"]); setInput("D"); setMsg("Reset."); }}>Reset</Button></Stack></Stack>}
      preview={<Paper variant="outlined" sx={{ p: 1.2, borderRadius: 2 }}><Typography variant="caption" color="text.secondary">Bidirectional chain</Typography><Typography variant="body2" sx={{ mt: 0.8, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>{list.length ? list.join(" <-> ") : "(empty)"}</Typography></Paper>}
      output={<Alert severity="info" variant="outlined">{msg}</Alert>}
      note="Doubly linked lists simplify operations at both ends by storing previous links."
    />
  );
}
