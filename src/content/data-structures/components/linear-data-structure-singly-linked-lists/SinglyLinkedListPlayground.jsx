import { useState } from "react";
import { Alert, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

export default function SinglyLinkedListPlayground() {
  const [list, setList] = useState(["A", "B", "C"]);
  const [input, setInput] = useState("X");
  const [msg, setMsg] = useState("No operation yet.");

  const addHead = () => {
    const v = input.trim();
    if (!v) return setMsg("Add ignored: empty value.");
    setList((prev) => [v, ...prev]);
    setMsg(`Head is now ${v}.`);
  };

  const removeHead = () => {
    if (!list.length) return setMsg("Remove ignored: list is empty.");
    const old = list[0];
    setList((prev) => prev.slice(1));
    setMsg(`Removed ${old} from head.`);
  };

  return (
    <PlaygroundShell
      title="Singly Linked List Head Playground"
      goal="Practice head insert and remove pointer effects."
      status={{ color: list.length ? "info" : "warning", label: `${list.length} nodes` }}
      controls={<Stack spacing={1.2} sx={{ maxWidth: 520 }}><TextField size="small" label="Node value" value={input} onChange={(e) => setInput(e.target.value)} /><Stack direction="row" spacing={1}><Button variant="contained" onClick={addHead}>Run</Button><Button variant="outlined" color="warning" onClick={removeHead}>Apply remove</Button><Button variant="text" onClick={() => { setList(["A", "B", "C"]); setInput("X"); setMsg("Reset."); }}>Reset</Button></Stack></Stack>}
      preview={<Paper variant="outlined" sx={{ p: 1.2, borderRadius: 2 }}><Typography variant="caption" color="text.secondary">Chain</Typography><Typography variant="body2" sx={{ mt: 0.8, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>{list.length ? `${list.join(" -> ")} -> null` : "null"}</Typography></Paper>}
      output={<Alert severity="info" variant="outlined">{msg}</Alert>}
      note="Singly linked lists are optimized for head operations."
    />
  );
}
