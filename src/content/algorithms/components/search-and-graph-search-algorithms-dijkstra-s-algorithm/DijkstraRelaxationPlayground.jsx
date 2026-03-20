import { useMemo, useState } from "react";
import { Alert, Button, FormControl, InputLabel, MenuItem, Paper, Select, Stack, Typography } from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const EDGES = {
    A: [{ to: "B", weight: 2 }, { to: "C", weight: 5 }],
    B: [{ to: "C", weight: 1 }, { to: "D", weight: 4 }],
    C: [{ to: "D", weight: 1 }],
    D: []
};

const INITIAL = { current: "A", neighbor: "B", distanceToCurrent: 0 };

export default function DijkstraRelaxationPlayground() {
    const [draft, setDraft] = useState(INITIAL);
    const [state, setState] = useState({ ...INITIAL, bestKnown: 2, decision: "No step applied yet." });

    const neighbors = useMemo(() => EDGES[draft.current] || [], [draft.current]);

    const apply = () => {
        const edge = (EDGES[draft.current] || []).find((item) => item.to === draft.neighbor);
        if (!edge) {
            setState((prev) => ({ ...prev, decision: "Invalid edge for this current node." }));
            return;
        }
        const candidate = draft.distanceToCurrent + edge.weight;
        const improved = candidate < state.bestKnown;
        setState({
            ...draft,
            bestKnown: improved ? candidate : state.bestKnown,
            decision: improved
                ? `Relaxed: updated distance(${draft.neighbor}) to ${candidate}.`
                : `Skipped: candidate ${candidate} is not better than ${state.bestKnown}.`
        });
    };

    const reset = () => setState({ ...INITIAL, bestKnown: 2, decision: "Reset to initial distances." });

    return (
        <PlaygroundShell
            title="Dijkstra Relaxation Trace"
            goal="Simulate one relaxation step and see when a shortest-path estimate is updated."
            status={{ color: "info", label: `best ${state.bestKnown}` }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 640 }}>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2}>
                        <FormControl size="small" fullWidth>
                            <InputLabel id="dijkstra-current">Current node</InputLabel>
                            <Select
                                labelId="dijkstra-current"
                                label="Current node"
                                value={draft.current}
                                onChange={(event) => {
                                    const nextCurrent = event.target.value;
                                    const firstNeighbor = (EDGES[nextCurrent] || [])[0]?.to || "D";
                                    setDraft((prev) => ({ ...prev, current: nextCurrent, neighbor: firstNeighbor }));
                                }}
                            >
                                {Object.keys(EDGES).map((node) => (
                                    <MenuItem key={node} value={node}>{node}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl size="small" fullWidth>
                            <InputLabel id="dijkstra-neighbor">Neighbor</InputLabel>
                            <Select
                                labelId="dijkstra-neighbor"
                                label="Neighbor"
                                value={draft.neighbor}
                                onChange={(event) => setDraft((prev) => ({ ...prev, neighbor: event.target.value }))}
                            >
                                {neighbors.length ? neighbors.map((edge) => (
                                    <MenuItem key={edge.to} value={edge.to}>{`${edge.to} (w=${edge.weight})`}</MenuItem>
                                )) : <MenuItem value="D">No outgoing edges</MenuItem>}
                            </Select>
                        </FormControl>
                    </Stack>
                    <FormControl size="small" fullWidth>
                        <InputLabel id="dijkstra-dist">Distance to current</InputLabel>
                        <Select
                            labelId="dijkstra-dist"
                            label="Distance to current"
                            value={draft.distanceToCurrent}
                            onChange={(event) => setDraft((prev) => ({ ...prev, distanceToCurrent: Number(event.target.value) }))}
                        >
                            {[0, 1, 2, 3, 4, 5, 6].map((n) => <MenuItem key={n} value={n}>{n}</MenuItem>)}
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
                    <Typography variant="caption" color="text.secondary">Graph edges</Typography>
                    <Typography sx={{ mt: 0.8, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", whiteSpace: "pre-wrap" }}>
                        {`A -> B(2), C(5)\nB -> C(1), D(4)\nC -> D(1)`}
                    </Typography>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    <Alert severity="info" variant="outlined">{state.decision}</Alert>
                    <Alert severity="success" variant="outlined">
                        Priority queue keeps exploring smallest known distance next.
                    </Alert>
                </Stack>
            }
            code={
                <pre>
{`candidate = dist[current] + weight(current, neighbor);
if (candidate < dist[neighbor]) {
  dist[neighbor] = candidate;
  push(neighbor, candidate); // min-priority queue
}`}
                </pre>
            }
        />
    );
}
