import { useMemo, useState } from "react";
import { Alert, Button, FormControl, InputLabel, MenuItem, Paper, Select, Stack, Typography } from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const STRATEGIES = {
    none: {
        label: "No memoization",
        renderCost: 1,
        explanation: "Child re-renders whenever parent re-renders."
    },
    memo_only: {
        label: "React.memo only",
        renderCost: 0.6,
        explanation: "Child skips renders only if props stay shallow-equal."
    },
    memo_and_callback: {
        label: "React.memo + useCallback",
        renderCost: 0.35,
        explanation: "Stable callback reference prevents avoidable child renders."
    }
};

export default function ReactMethodsTracePlayground() {
    const [draftStrategy, setDraftStrategy] = useState("none");
    const [draftParentUpdates, setDraftParentUpdates] = useState(3);
    const [state, setState] = useState({ strategy: "none", parentUpdates: 3, childRenders: 3 });

    const strategyInfo = STRATEGIES[state.strategy];

    const apply = () => {
        let predicted = draftParentUpdates;
        if (draftStrategy === "memo_only") predicted = Math.ceil(draftParentUpdates * 0.67);
        if (draftStrategy === "memo_and_callback") predicted = Math.ceil(draftParentUpdates * 0.34);
        setState({
            strategy: draftStrategy,
            parentUpdates: draftParentUpdates,
            childRenders: Math.max(predicted, 1)
        });
    };

    const run = () => {
        setState((prev) => {
            const nextParent = Math.min(prev.parentUpdates + 1, 8);
            let nextChild = nextParent;
            if (prev.strategy === "memo_only") nextChild = Math.ceil(nextParent * 0.67);
            if (prev.strategy === "memo_and_callback") nextChild = Math.ceil(nextParent * 0.34);
            return { ...prev, parentUpdates: nextParent, childRenders: Math.max(nextChild, 1) };
        });
    };

    const reset = () => {
        setDraftStrategy("none");
        setDraftParentUpdates(3);
        setState({ strategy: "none", parentUpdates: 3, childRenders: 3 });
    };

    const efficiency = useMemo(() => {
        const saved = Math.max(state.parentUpdates - state.childRenders, 0);
        return `${saved} child render(s) avoided`;
    }, [state.childRenders, state.parentUpdates]);

    return (
        <PlaygroundShell
            title="React Memoization Trace"
            goal="Compare how React.memo, useMemo, and useCallback reduce unnecessary child work."
            status={{ color: state.strategy === "none" ? "warning" : "success", label: strategyInfo.label }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 640 }}>
                    <FormControl size="small" fullWidth>
                        <InputLabel id="react-strategy">Optimization strategy</InputLabel>
                        <Select
                            labelId="react-strategy"
                            label="Optimization strategy"
                            value={draftStrategy}
                            onChange={(event) => setDraftStrategy(event.target.value)}
                        >
                            <MenuItem value="none">No memoization</MenuItem>
                            <MenuItem value="memo_only">React.memo only</MenuItem>
                            <MenuItem value="memo_and_callback">React.memo + useCallback</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl size="small" fullWidth>
                        <InputLabel id="parent-updates">Parent updates</InputLabel>
                        <Select
                            labelId="parent-updates"
                            label="Parent updates"
                            value={draftParentUpdates}
                            onChange={(event) => setDraftParentUpdates(Number(event.target.value))}
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((value) => (
                                <MenuItem key={value} value={value}>{value}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" onClick={apply}>Apply</Button>
                        <Button variant="outlined" onClick={run}>Run</Button>
                        <Button variant="text" onClick={reset}>Reset</Button>
                    </Stack>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.2, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Render trace</Typography>
                    <Typography sx={{ mt: 0.8, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                        {`parent renders: ${state.parentUpdates}\nchild renders: ${state.childRenders}`}
                    </Typography>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    <Alert severity="info" variant="outlined">{strategyInfo.explanation}</Alert>
                    <Alert severity={state.strategy === "none" ? "warning" : "success"} variant="outlined">
                        {efficiency} ({Math.round(strategyInfo.renderCost * 100)}% relative child cost profile).
                    </Alert>
                </Stack>
            }
            code={
                <pre>
{`const Child = React.memo(({ onSelect, items }) => { ... });
const sortedItems = useMemo(() => sort(items), [items]);
const onSelect = useCallback((id) => setActive(id), []);`}
                </pre>
            }
        />
    );
}
