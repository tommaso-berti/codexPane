import { useMemo, useState } from "react";
import {
    Alert,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

export default function FunctionFormsPlayground() {
    const [form, setForm] = useState("declaration");
    const [a, setA] = useState(3);
    const [b, setB] = useState(4);

    const functionSource = useMemo(() => {
        if (form === "declaration") return "function sum(x, y) { return x + y; }";
        if (form === "expression") return "const sum = function (x, y) { return x + y; };";
        return "const sum = (x, y) => x + y;";
    }, [form]);

    const result = Number(a) + Number(b);

    return (
        <PlaygroundShell
            title="Function Forms Equivalence Playground"
            goal="Compare declaration, expression, and arrow syntax while keeping behavior identical."
            status={{ color: "info", label: form }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 620 }}>
                    <FormControl size="small" sx={{ minWidth: 240 }}>
                        <InputLabel id="function-form-label">Function form</InputLabel>
                        <Select labelId="function-form-label" label="Function form" value={form} onChange={(event) => setForm(event.target.value)}>
                            <MenuItem value="declaration">Declaration</MenuItem>
                            <MenuItem value="expression">Expression</MenuItem>
                            <MenuItem value="arrow">Arrow</MenuItem>
                        </Select>
                    </FormControl>

                    <Stack direction={{ xs: "column", md: "row" }} spacing={1}>
                        <TextField size="small" type="number" label="x" value={a} onChange={(event) => setA(Number(event.target.value))} />
                        <TextField size="small" type="number" label="y" value={b} onChange={(event) => setB(Number(event.target.value))} />
                    </Stack>
                </Stack>
            }
            preview={
                <Paper
                    variant="outlined"
                    sx={(theme) => ({
                        p: 1.3,
                        borderRadius: 2,
                        bgcolor: theme.palette.mode === "dark" ? alpha(theme.palette.common.white, 0.04) : alpha(theme.palette.common.black, 0.02)
                    })}
                >
                    <Typography variant="caption" color="text.secondary">Generated source</Typography>
                    <Typography variant="body2" sx={{ mt: 1, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                        {functionSource}
                    </Typography>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    <Alert severity="success" variant="outlined">sum({a}, {b}) = {result}</Alert>
                    <Alert severity="info" variant="outlined">
                        Syntax differs, but all three forms can represent the same function logic.
                    </Alert>
                </Stack>
            }
            note="Choose form by readability and context. Use declaration when hoisting clarity is useful; arrow for concise callbacks."
        />
    );
}
