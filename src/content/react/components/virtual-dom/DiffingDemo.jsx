import { useMemo, useState } from "react";
import {
    Alert,
    Button,
    FormControlLabel,
    Paper,
    Stack,
    Switch,
    Typography
} from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const BASE = ["A", "B", "C", "D"];

export default function DiffingDemo() {
    const [stableKeys, setStableKeys] = useState(true);
    const [list, setList] = useState(BASE);

    const applyReorder = () => setList((prev) => [prev[1], prev[0], prev[2], prev[3]]);
    const reset = () => setList(BASE);

    const audit = useMemo(() => {
        const changedOrder = list.join("") !== BASE.join("");
        return [
            { ok: stableKeys, text: "Stable keys preserve item identity across reorders." },
            { ok: changedOrder, text: "List order changed from the initial render." },
            { ok: stableKeys || !changedOrder, text: "Unstable keys increase remount risk on reorder." }
        ];
    }, [list, stableKeys]);

    return (
        <PlaygroundShell
            title="Diffing and Keys Playground"
            goal="See how key stability affects React updates when list order changes."
            status={{ color: stableKeys ? "success" : "warning", label: stableKeys ? "Stable keys" : "Unstable keys" }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 560 }}>
                    <FormControlLabel
                        control={<Switch checked={stableKeys} onChange={(event) => setStableKeys(event.target.checked)} />}
                        label="Use stable keys"
                    />
                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" onClick={applyReorder}>Apply reorder</Button>
                        <Button variant="outlined" onClick={reset}>Reset</Button>
                    </Stack>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.4, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Rendered list</Typography>
                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                        {list.map((item, index) => (
                            <Paper key={stableKeys ? item : index} variant="outlined" sx={{ px: 1, py: 0.5 }}>
                                {item}
                            </Paper>
                        ))}
                    </Stack>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    {audit.map((item) => (
                        <Alert key={item.text} severity={item.ok ? "success" : "warning"} variant="outlined">
                            {item.text}
                        </Alert>
                    ))}
                </Stack>
            }
            note="When order can change, key identity should come from data, not from array index."
        />
    );
}
