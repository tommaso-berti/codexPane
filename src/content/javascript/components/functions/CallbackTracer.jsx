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

const CALLBACKS = {
    addTwo: { label: "addTwo(x)", fn: (x) => x + 2 },
    double: { label: "double(x)", fn: (x) => x * 2 }
};

export default function CallbackTracer() {
    const [callbackKey, setCallbackKey] = useState("addTwo");
    const [value, setValue] = useState(5);

    const trace = useMemo(() => {
        const callback = CALLBACKS[callbackKey].fn;
        const input = Number(value);
        const output = callback(input);

        return [
            `higherOrderFunc(callback, ${input})`,
            `-> callback(${input})`,
            `-> returns ${output}`,
            `final result = ${output}`
        ];
    }, [callbackKey, value]);

    return (
        <PlaygroundShell
            title="Callback Invocation Trace Playground"
            goal="See how a higher-order function receives and invokes a callback reference."
            status={{ color: "info", label: CALLBACKS[callbackKey].label }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 620 }}>
                    <FormControl size="small" sx={{ minWidth: 220 }}>
                        <InputLabel id="callback-label">Callback</InputLabel>
                        <Select labelId="callback-label" label="Callback" value={callbackKey} onChange={(event) => setCallbackKey(event.target.value)}>
                            {Object.entries(CALLBACKS).map(([key, valueItem]) => (
                                <MenuItem key={key} value={key}>{valueItem.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField size="small" type="number" label="Input value" value={value} onChange={(event) => setValue(Number(event.target.value))} />
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
                    <Typography variant="caption" color="text.secondary">Invocation trace</Typography>
                    <Stack spacing={0.4} sx={{ mt: 1 }}>
                        {trace.map((line) => (
                            <Typography key={line} variant="body2" sx={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                                {line}
                            </Typography>
                        ))}
                    </Stack>
                </Paper>
            }
            output={
                <Alert severity="success" variant="outlined">
                    Callback output: {trace[trace.length - 1].replace("final result = ", "")}
                </Alert>
            }
            note="Pass the function reference (without parentheses). Calling it immediately passes a value, not a callback."
        />
    );
}
