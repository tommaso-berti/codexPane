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

export default function ArrayMethodsPlayground() {
    const [rawArray, setRawArray] = useState('["a","b","c","d"]');
    const [method, setMethod] = useState("slice");
    const [value, setValue] = useState("1");

    const parsed = useMemo(() => {
        try {
            const arr = JSON.parse(rawArray);
            return Array.isArray(arr) ? arr : null;
        } catch {
            return null;
        }
    }, [rawArray]);

    const analysis = useMemo(() => {
        if (!parsed) {
            return { error: "Input must be a valid JSON array." };
        }

        const before = [...parsed];

        if (method === "slice") {
            const start = Number(value) || 0;
            return {
                before,
                after: before.slice(start),
                mutated: false,
                summary: "slice returns a new array and keeps the original unchanged."
            };
        }

        if (method === "map") {
            return {
                before,
                after: before.map((item) => `${item}-x`),
                mutated: false,
                summary: "map returns a new transformed array."
            };
        }

        const clone = [...before];
        clone.push(value);
        return {
            before,
            after: clone,
            mutated: true,
            summary: "push mutates the original array by adding one element at the end."
        };
    }, [method, parsed, value]);

    return (
        <PlaygroundShell
            title="Array Mutation vs Copy Playground"
            goal="Compare non-destructive and destructive array methods on the same input."
            status={{
                color: analysis.error ? "error" : analysis.mutated ? "warning" : "success",
                label: analysis.error ? "invalid input" : analysis.mutated ? "mutates array" : "returns copy"
            }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 680 }}>
                    <TextField
                        size="small"
                        label="Input array (JSON)"
                        value={rawArray}
                        onChange={(event) => setRawArray(event.target.value)}
                    />

                    <Stack direction={{ xs: "column", md: "row" }} spacing={1}>
                        <FormControl size="small" sx={{ minWidth: 180 }}>
                            <InputLabel id="array-method-label">Method</InputLabel>
                            <Select
                                labelId="array-method-label"
                                label="Method"
                                value={method}
                                onChange={(event) => setMethod(event.target.value)}
                            >
                                <MenuItem value="slice">slice (copy)</MenuItem>
                                <MenuItem value="map">map (copy)</MenuItem>
                                <MenuItem value="push">push (mutate)</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            size="small"
                            label={method === "slice" ? "Slice start index" : "Value"}
                            value={value}
                            onChange={(event) => setValue(event.target.value)}
                            fullWidth
                        />
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
                    <Typography variant="caption" color="text.secondary">Method behavior</Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>{analysis.error || analysis.summary}</Typography>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    {analysis.error ? (
                        <Alert severity="error" variant="outlined">{analysis.error}</Alert>
                    ) : (
                        <>
                            <Paper variant="outlined" sx={{ p: 1.2, borderRadius: 2 }}>
                                <Typography variant="caption" color="text.secondary">Before</Typography>
                                <Typography variant="body2" sx={{ mt: 0.5, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                                    {JSON.stringify(analysis.before)}
                                </Typography>
                            </Paper>
                            <Paper variant="outlined" sx={{ p: 1.2, borderRadius: 2 }}>
                                <Typography variant="caption" color="text.secondary">After</Typography>
                                <Typography variant="body2" sx={{ mt: 0.5, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                                    {JSON.stringify(analysis.after)}
                                </Typography>
                            </Paper>
                            <Alert severity={analysis.mutated ? "warning" : "success"} variant="outlined">
                                {analysis.mutated ? "This method mutates the source array." : "This method keeps the source array unchanged."}
                            </Alert>
                        </>
                    )}
                </Stack>
            }
            note="Prefer non-destructive methods when you need predictable state updates, especially in UI state management."
        />
    );
}
