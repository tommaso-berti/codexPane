import { useMemo, useState } from "react";
import {
    Alert,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const SHAPES = {
    primitive: { label: "Primitive counter" },
    array: { label: "Array list" },
    object: { label: "Object form" }
};

export default function UseStatePlayground() {
    const [shape, setShape] = useState("primitive");
    const [count, setCount] = useState(0);
    const [itemInput, setItemInput] = useState("alpha");
    const [list, setList] = useState(["alpha"]);
    const [form, setForm] = useState({ firstName: "", role: "user" });

    const beforeAfter = useMemo(() => {
        if (shape === "primitive") return `before: ${count} -> after: ${count + 1}`;
        if (shape === "array") return `before length: ${list.length} -> after length: ${list.length + 1}`;
        return `before role: ${form.role} -> after role: ${form.role === "user" ? "admin" : "user"}`;
    }, [count, form.role, list.length, shape]);

    const apply = () => {
        if (shape === "primitive") setCount((prev) => prev + 1);
        if (shape === "array" && itemInput.trim()) setList((prev) => [...prev, itemInput.trim()]);
        if (shape === "object") setForm((prev) => ({ ...prev, role: prev.role === "user" ? "admin" : "user" }));
    };

    const reset = () => {
        setCount(0);
        setItemInput("alpha");
        setList(["alpha"]);
        setForm({ firstName: "", role: "user" });
    };

    return (
        <PlaygroundShell
            title="useState Update Shapes Playground"
            goal="Compare immutable updates across primitive, array, and object state shapes."
            status={{ color: "info", label: SHAPES[shape].label }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 560 }}>
                    <FormControl size="small">
                        <InputLabel id="state-shape-label">State shape</InputLabel>
                        <Select
                            labelId="state-shape-label"
                            label="State shape"
                            value={shape}
                            onChange={(event) => setShape(event.target.value)}
                        >
                            {Object.entries(SHAPES).map(([value, item]) => (
                                <MenuItem key={value} value={value}>{item.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {shape === "array" ? (
                        <TextField
                            size="small"
                            label="New item"
                            value={itemInput}
                            onChange={(event) => setItemInput(event.target.value)}
                        />
                    ) : null}

                    {shape === "object" ? (
                        <TextField
                            size="small"
                            label="First name"
                            value={form.firstName}
                            onChange={(event) => setForm((prev) => ({ ...prev, firstName: event.target.value }))}
                        />
                    ) : null}

                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" onClick={apply}>Apply</Button>
                        <Button variant="outlined" onClick={reset}>Reset</Button>
                    </Stack>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.4, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Current state</Typography>
                    {shape === "primitive" ? <Typography sx={{ mt: 1 }}>count: {count}</Typography> : null}
                    {shape === "array" ? <Typography sx={{ mt: 1 }}>items: {list.join(", ")}</Typography> : null}
                    {shape === "object" ? <Typography sx={{ mt: 1 }}>form: {JSON.stringify(form)}</Typography> : null}
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    <Alert severity="info" variant="outlined">{beforeAfter}</Alert>
                    <Alert severity="success" variant="outlined">Each update uses a new value/object/array instead of mutation.</Alert>
                </Stack>
            }
            note="Choose state shape by domain needs, then keep updates immutable for predictable renders."
        />
    );
}
