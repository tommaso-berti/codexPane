import { useMemo, useState } from "react";
import { Alert, Button, FormControl, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

function bucket(key, size) {
    return key.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0) % size;
}

const INITIAL = {
    keyA: "cat",
    keyB: "tac",
    tableSize: 4
};

export default function HashMapCollisionTracePlayground() {
    const [draft, setDraft] = useState(INITIAL);
    const [state, setState] = useState({ ...INITIAL, trace: "Apply inputs to evaluate collisions." });

    const apply = () => {
        const idxA = bucket(draft.keyA, draft.tableSize);
        const idxB = bucket(draft.keyB, draft.tableSize);
        const collided = idxA === idxB;
        setState({
            ...draft,
            trace: collided
                ? `Collision: "${draft.keyA}" and "${draft.keyB}" both map to bucket ${idxA}.`
                : `No collision: ${draft.keyA} -> ${idxA}, ${draft.keyB} -> ${idxB}.`
        });
    };

    const reset = () => {
        setDraft(INITIAL);
        setState({ ...INITIAL, trace: "Reset. Try keys with similar letters to force collisions." });
    };

    const chainPreview = useMemo(() => {
        const idxA = bucket(state.keyA, state.tableSize);
        const idxB = bucket(state.keyB, state.tableSize);
        if (idxA !== idxB) return `bucket ${idxA}: [${state.keyA}] | bucket ${idxB}: [${state.keyB}]`;
        return `bucket ${idxA}: [${state.keyA}] -> [${state.keyB}]`;
    }, [state]);

    return (
        <PlaygroundShell
            title="Hash Collision Trace"
            goal="Compare two keys and inspect how separate chaining handles same-bucket assignments."
            status={{ color: "info", label: `size ${state.tableSize}` }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 620 }}>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2}>
                        <TextField
                            size="small"
                            label="Key A"
                            value={draft.keyA}
                            onChange={(event) => setDraft((prev) => ({ ...prev, keyA: event.target.value }))}
                            fullWidth
                        />
                        <TextField
                            size="small"
                            label="Key B"
                            value={draft.keyB}
                            onChange={(event) => setDraft((prev) => ({ ...prev, keyB: event.target.value }))}
                            fullWidth
                        />
                    </Stack>
                    <FormControl size="small" fullWidth>
                        <InputLabel id="hash-size">Table size</InputLabel>
                        <Select
                            labelId="hash-size"
                            label="Table size"
                            value={draft.tableSize}
                            onChange={(event) => setDraft((prev) => ({ ...prev, tableSize: Number(event.target.value) }))}
                        >
                            {[3, 4, 5, 6, 7].map((n) => <MenuItem key={n} value={n}>{n}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" onClick={apply}>Apply</Button>
                        <Button variant="outlined" onClick={reset}>Reset</Button>
                    </Stack>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.2, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Bucket view</Typography>
                    <Typography sx={{ mt: 0.8, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                        {chainPreview}
                    </Typography>
                </Paper>
            }
            output={
                <Alert severity="info" variant="outlined">{state.trace}</Alert>
            }
            code={
                <pre>
{`index = hash(key) % tableSize;
if (!bucket[index]) bucket[index] = [];
bucket[index].push({ key, value }); // separate chaining`}
                </pre>
            }
        />
    );
}
