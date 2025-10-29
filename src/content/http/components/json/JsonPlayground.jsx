import React, { useMemo, useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";

export default function JsonPlayground() {
    const [input, setInput] = useState(
        '{ "book": { "name": "JSON Primer", "price": 29.99, "inStock": true, "rating": null } }'
    );
    const [indent, setIndent] = useState(2);
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");

    const prettyPreview = useMemo(() => {
        try {
            const v = JSON.parse(input);
            return JSON.stringify(v, null, indent);
        } catch {
            return "";
        }
    }, [input, indent]);

    function onValidate() {
        try {
            JSON.parse(input);
            setError("");
            setOutput("Valid JSON ✅");
        } catch (e) {
            setError(String(e.message || e));
            setOutput("");
        }
    }

    function onPretty() {
        try {
            const v = JSON.parse(input);
            setOutput(JSON.stringify(v, null, indent));
            setError("");
        } catch (e) {
            setError(String(e.message || e));
            setOutput("");
        }
    }

    function onMinify() {
        try {
            const v = JSON.parse(input);
            setOutput(JSON.stringify(v));
            setError("");
        } catch (e) {
            setError(String(e.message || e));
            setOutput("");
        }
    }

    function onStringifyExample() {
        const jsValue = { book: "JSON Primer", price: 29.99, inStock: true, rating: null };
        setOutput(JSON.stringify(jsValue, null, indent));
        setError("");
    }

    return (
        <Stack spacing={2}>
            <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
                <CardHeader
                    title="JSON Playground"
                    subheader="Validate, pretty-print, and minify JSON. See stringify in action."
                />
                <CardContent>
                    <Stack spacing={2}>
                        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                            <TextField
                                label="JSON input"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                multiline
                                minRows={8}
                                sx={{ flex: 1 }}
                                placeholder='{"key":"value"}'
                            />
                            <Stack sx={{ minWidth: 240 }} spacing={2}>
                                <FormControl>
                                    <InputLabel id="indent-label">Indentation</InputLabel>
                                    <Select
                                        labelId="indent-label"
                                        label="Indentation"
                                        value={indent}
                                        variant="outlined"
                                        onChange={(e) => setIndent(Number(e.target.value))}
                                    >
                                        <MenuItem value={0}>0 (minify)</MenuItem>
                                        <MenuItem value={2}>2 spaces</MenuItem>
                                        <MenuItem value={4}>4 spaces</MenuItem>
                                    </Select>
                                </FormControl>
                                <Button variant="contained" onClick={onValidate}>Validate</Button>
                                <Button variant="outlined" onClick={onPretty}>Pretty print</Button>
                                <Button variant="outlined" onClick={onMinify}>Minify</Button>
                                <Button variant="text" onClick={onStringifyExample}>Stringify example object</Button>
                            </Stack>
                        </Stack>

                        {error && (
                            <Typography color="error" variant="body2">
                                {error}
                            </Typography>
                        )}

                        <Divider />

                        <Typography variant="subtitle2">Live preview</Typography>
                        <Box component="pre" sx={{ m: 0, p: 1, bgcolor: "#0a0a0a", color: "#eaeaea", borderRadius: 2, overflow: "auto" }}>
                            {prettyPreview || "—"}
                        </Box>

                        <Typography variant="subtitle2" sx={{ mt: 1 }}>Output</Typography>
                        <Box component="pre" sx={{ m: 0, p: 1, bgcolor: "#0a0a0a", color: "#eaeaea", borderRadius: 2, overflow: "auto" }}>
                            {output || "—"}
                        </Box>
                    </Stack>
                </CardContent>
            </Card>
        </Stack>
    );
}