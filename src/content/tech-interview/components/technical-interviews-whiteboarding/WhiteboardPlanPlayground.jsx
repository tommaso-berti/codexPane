import { useMemo, useState } from "react";
import { Alert, Button, Paper, Slider, Stack, Typography } from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

export default function WhiteboardPlanPlayground() {
  const [clarify, setClarify] = useState(2);
  const [design, setDesign] = useState(4);
  const [test, setTest] = useState(3);

  const total = clarify + design + test;
  const status = useMemo(() => (total <= 10 ? "balanced" : "over-time"), [total]);

  return (
    <PlaygroundShell
      title="Whiteboard Time Allocation Playground"
      goal="Balance clarification, solution design, and test discussion within interview time."
      status={{ color: status === "balanced" ? "success" : "warning", label: `${total} min` }}
      controls={<Stack spacing={1.2} sx={{ maxWidth: 520 }}>
        <Typography variant="body2">Clarify requirements: {clarify} min</Typography><Slider min={0} max={6} step={1} value={clarify} onChange={(_, v) => setClarify(v)} />
        <Typography variant="body2">Design/coding: {design} min</Typography><Slider min={1} max={10} step={1} value={design} onChange={(_, v) => setDesign(v)} />
        <Typography variant="body2">Edge cases/tests: {test} min</Typography><Slider min={0} max={6} step={1} value={test} onChange={(_, v) => setTest(v)} />
        <Stack direction="row" spacing={1}><Button variant="outlined" onClick={() => { setClarify(2); setDesign(4); setTest(3); }}>Reset</Button></Stack>
      </Stack>}
      preview={<Paper variant="outlined" sx={{ p: 1.2, borderRadius: 2 }}><Typography variant="caption" color="text.secondary">Interview pacing</Typography><Typography variant="body2" sx={{ mt: 0.8 }}>{status === "balanced" ? "Pacing is realistic." : "Plan exceeds a typical whiteboard slot."}</Typography></Paper>}
      output={<Alert severity={status === "balanced" ? "success" : "warning"} variant="outlined">{status === "balanced" ? "Good balance across communication and implementation." : "Reduce coding scope or tighten explanation."}</Alert>}
      note="Interviewers score communication and tradeoffs, not only final code."
    />
  );
}
