import { useMemo, useState } from "react";
import { Alert, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

function parseNumbers(input) {
    return input
        .split(",")
        .map((item) => Number(item.trim()))
        .filter((item) => Number.isFinite(item));
}

function heapifyUp(arr) {
    const a = [...arr];
    let idx = a.length - 1;
    const steps = [`insert ${a[idx]} at index ${idx}`];
    while (idx > 0) {
        const parent = Math.floor((idx - 1) / 2);
        if (a[parent] <= a[idx]) break;
        steps.push(`swap ${a[parent]} (parent) with ${a[idx]} (child)`);
        [a[parent], a[idx]] = [a[idx], a[parent]];
        idx = parent;
    }
    return { heap: a, steps };
}

export default function HeapifyPlayground() {
    const [draftHeap, setDraftHeap] = useState("3, 7, 5, 11");
    const [draftInsert, setDraftInsert] = useState("2");
    const [state, setState] = useState({ heap: [3, 7, 5, 11], steps: ["No operation yet."] });

    const apply = () => {
        const base = parseNumbers(draftHeap);
        const value = Number(draftInsert);
        if (!base.length || !Number.isFinite(value)) {
            setState({ heap: base, steps: ["Invalid input. Use comma-separated numbers and one insert value."] });
            return;
        }
        const result = heapifyUp([...base, value]);
        setState(result);
    };

    const reset = () => {
        setDraftHeap("3, 7, 5, 11");
        setDraftInsert("2");
        setState({ heap: [3, 7, 5, 11], steps: ["Reset to default min-heap input."] });
    };

    const treeHint = useMemo(() => state.heap.map((n, i) => `${i}:${n}`).join(" | "), [state.heap]);

    return (
        <PlaygroundShell
            title="Heapify Up Trace"
            goal="Track how a newly inserted value bubbles up to restore min-heap order."
            status={{ color: "info", label: `${state.heap.length} nodes` }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 620 }}>
                    <TextField
                        size="small"
                        label="Current heap array"
                        value={draftHeap}
                        onChange={(event) => setDraftHeap(event.target.value)}
                        helperText="Use min-heap order, e.g. 3, 7, 5, 11"
                    />
                    <TextField
                        size="small"
                        label="Value to insert"
                        value={draftInsert}
                        onChange={(event) => setDraftInsert(event.target.value)}
                    />
                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" onClick={apply}>Apply</Button>
                        <Button variant="outlined" onClick={reset}>Reset</Button>
                    </Stack>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.2, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Array index view</Typography>
                    <Typography sx={{ mt: 0.8, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                        {treeHint}
                    </Typography>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    {state.steps.map((step) => (
                        <Alert key={step} severity="info" variant="outlined">{step}</Alert>
                    ))}
                </Stack>
            }
            code={
                <pre>
{`idx = heap.length - 1;
while (idx > 0) {
  parent = Math.floor((idx - 1) / 2);
  if (heap[parent] <= heap[idx]) break;
  [heap[parent], heap[idx]] = [heap[idx], heap[parent]];
  idx = parent;
}`}
                </pre>
            }
        />
    );
}
