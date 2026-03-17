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

export default function LoopVisualizer() {
    const [loopType, setLoopType] = useState("for");
    const [iterations, setIterations] = useState(4);
    const [arrayRaw, setArrayRaw] = useState('["a","b","c"]');

    const steps = useMemo(() => {
        if (loopType === "forof") {
            try {
                const arr = JSON.parse(arrayRaw);
                if (!Array.isArray(arr)) return { error: "for...of requires a JSON array." };
                return { rows: arr.map((value, index) => ({ index, value })) };
            } catch {
                return { error: "Invalid JSON array." };
            }
        }

        const count = Math.max(0, Number(iterations) || 0);
        return { rows: Array.from({ length: count }, (_, index) => ({ index, value: "-" })) };
    }, [arrayRaw, iterations, loopType]);

    return (
        <PlaygroundShell
            title="Loop Traversal Trace Playground"
            goal="Understand what each loop iterates (counter vs values) step by step."
            status={{
                color: steps.error ? "error" : "info",
                label: steps.error ? "invalid input" : `${steps.rows.length} steps`
            }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 620 }}>
                    <FormControl size="small" sx={{ minWidth: 180 }}>
                        <InputLabel id="loop-type-label">Loop type</InputLabel>
                        <Select labelId="loop-type-label" label="Loop type" value={loopType} onChange={(event) => setLoopType(event.target.value)}>
                            <MenuItem value="for">for</MenuItem>
                            <MenuItem value="while">while</MenuItem>
                            <MenuItem value="forof">for...of</MenuItem>
                        </Select>
                    </FormControl>

                    {loopType === "forof" ? (
                        <TextField
                            size="small"
                            label="Iterable array (JSON)"
                            value={arrayRaw}
                            onChange={(event) => setArrayRaw(event.target.value)}
                        />
                    ) : (
                        <TextField
                            size="small"
                            type="number"
                            label="Iterations"
                            value={iterations}
                            onChange={(event) => setIterations(Number(event.target.value))}
                        />
                    )}
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
                    <Typography variant="caption" color="text.secondary">Traversal intent</Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        {loopType === "forof"
                            ? "for...of iterates values from an iterable."
                            : `${loopType} iterates while a numeric condition stays true.`}
                    </Typography>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    {steps.error ? (
                        <Alert severity="error" variant="outlined">{steps.error}</Alert>
                    ) : (
                        <Paper variant="outlined" sx={{ p: 1.2, borderRadius: 2 }}>
                            <Typography variant="caption" color="text.secondary">Execution trace</Typography>
                            <Stack spacing={0.5} sx={{ mt: 1 }}>
                                {steps.rows.map((row, position) => (
                                    <Typography key={position} variant="body2" sx={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                                        step {position}: i={row.index}{row.value !== "-" ? `, value=${JSON.stringify(row.value)}` : ""}
                                    </Typography>
                                ))}
                            </Stack>
                        </Paper>
                    )}
                </Stack>
            }
            note="Use `for...of` when you care about iterable values; use `for/while` when you need explicit counter control."
        />
    );
}
