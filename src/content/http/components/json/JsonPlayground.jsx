import { useMemo, useState } from "react";
import {
    Alert,
    Box,
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

function parseWithMessage(value) {
    try {
        const parsed = JSON.parse(value);
        return { ok: true, parsed, message: "Valid JSON" };
    } catch (error) {
        return { ok: false, parsed: null, message: error?.message || "Invalid JSON" };
    }
}

export default function JsonPlayground() {
    const [input, setInput] = useState('{\n  "book": {\n    "name": "JSON Primer",\n    "price": 29.99,\n    "inStock": true\n  }\n}');
    const [indent, setIndent] = useState(2);
    const [mode, setMode] = useState("validate");

    const parsedResult = useMemo(() => parseWithMessage(input), [input]);

    const outputText = useMemo(() => {
        if (!parsedResult.ok) {
            return "";
        }

        if (mode === "minify") {
            return JSON.stringify(parsedResult.parsed);
        }

        return JSON.stringify(parsedResult.parsed, null, indent);
    }, [indent, mode, parsedResult]);

    const keysCount = parsedResult.ok && parsedResult.parsed && typeof parsedResult.parsed === "object"
        ? Object.keys(parsedResult.parsed).length
        : 0;

    return (
        <PlaygroundShell
            title="JSON Parse & Format Playground"
            goal="Understand when JSON is valid and how parse/stringify formatting changes output."
            status={{
                color: parsedResult.ok ? "success" : "error",
                label: parsedResult.ok ? "JSON valid" : "JSON invalid"
            }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 680 }}>
                    <TextField
                        label="JSON input"
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                        multiline
                        minRows={8}
                        size="small"
                    />

                    <Stack direction={{ xs: "column", md: "row" }} spacing={1}>
                        <FormControl size="small" sx={{ minWidth: 180 }}>
                            <InputLabel id="json-action-label">Action</InputLabel>
                            <Select
                                labelId="json-action-label"
                                label="Action"
                                value={mode}
                                onChange={(event) => setMode(event.target.value)}
                            >
                                <MenuItem value="validate">Validate only</MenuItem>
                                <MenuItem value="format">Format (pretty)</MenuItem>
                                <MenuItem value="minify">Minify</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl size="small" sx={{ minWidth: 180 }} disabled={mode === "minify" || mode === "validate"}>
                            <InputLabel id="json-indent-label">Indent size</InputLabel>
                            <Select
                                labelId="json-indent-label"
                                label="Indent size"
                                value={indent}
                                onChange={(event) => setIndent(Number(event.target.value))}
                            >
                                <MenuItem value={2}>2 spaces</MenuItem>
                                <MenuItem value={4}>4 spaces</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                </Stack>
            }
            preview={
                <Paper
                    variant="outlined"
                    sx={(theme) => ({
                        p: 1.3,
                        borderRadius: 2,
                        bgcolor: theme.palette.mode === "dark"
                            ? alpha(theme.palette.common.white, 0.04)
                            : alpha(theme.palette.common.black, 0.02)
                    })}
                >
                    <Typography variant="caption" color="text.secondary">Parser feedback</Typography>
                    <Box sx={{ mt: 1 }}>
                        <Alert severity={parsedResult.ok ? "success" : "error"} variant="outlined">
                            {parsedResult.message}
                        </Alert>
                    </Box>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    {parsedResult.ok ? (
                        <Alert severity="info" variant="outlined">
                            Root keys: {keysCount}. Current action: {mode === "format" ? "Format" : mode === "minify" ? "Minify" : "Validate"}.
                        </Alert>
                    ) : null}

                    <Paper
                        variant="outlined"
                        sx={(theme) => ({
                            p: 1.2,
                            borderRadius: 2,
                            bgcolor: theme.palette.mode === "dark"
                                ? alpha(theme.palette.common.white, 0.04)
                                : alpha(theme.palette.common.black, 0.02)
                        })}
                    >
                        <Typography variant="caption" color="text.secondary">Output</Typography>
                        <Box component="pre" sx={{ m: "8px 0 0", fontSize: 12, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>
                            {parsedResult.ok
                                ? (mode === "validate" ? "Valid JSON (no transformation selected)." : outputText)
                                : "Fix syntax errors to get transformed output."}
                        </Box>
                    </Paper>
                </Stack>
            }
            note="`JSON.parse` validates structure; `JSON.stringify` controls how that structure is serialized for transport or readability."
        />
    );
}
