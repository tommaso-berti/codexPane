import { useMemo, useState } from "react";
import {
    Alert,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Slider,
    Stack,
    Typography
} from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const PRESETS = [
    { label: "System Sans", value: 'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif' },
    { label: "Serif", value: 'Georgia, "Times New Roman", serif' },
    { label: "Monospace", value: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace' }
];

const SAMPLE = "The quick brown fox jumps over the lazy dog. 0123456789";

export default function FontPreview() {
    const [family, setFamily] = useState(PRESETS[0].value);
    const [size, setSize] = useState(18);
    const [lineHeight, setLineHeight] = useState(1.5);

    const cssLine = useMemo(() => "font-family: " + family + "; font-size: " + size + "px; line-height: " + lineHeight + ";", [family, size, lineHeight]);

    return (
        <PlaygroundShell
            title="Font Stack Playground"
            goal="See how changing font family, size, and line-height affects readability."
            status={{ color: "info", label: "Typography preview" }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 560 }}>
                    <FormControl size="small">
                        <InputLabel id="font-family-label">Font family</InputLabel>
                        <Select
                            labelId="font-family-label"
                            label="Font family"
                            value={family}
                            onChange={(event) => setFamily(event.target.value)}
                        >
                            {PRESETS.map((preset) => (
                                <MenuItem key={preset.label} value={preset.value}>{preset.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Typography variant="caption" color="text.secondary">Font size: {size}px</Typography>
                    <Slider value={size} onChange={(_, value) => setSize(Number(value))} min={12} max={34} step={1} valueLabelDisplay="auto" />
                    <Typography variant="caption" color="text.secondary">Line height: {lineHeight}</Typography>
                    <Slider value={lineHeight} onChange={(_, value) => setLineHeight(Number(value))} min={1.1} max={2} step={0.1} valueLabelDisplay="auto" />
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Preview sentence</Typography>
                    <Typography sx={{ mt: 1, fontFamily: family, fontSize: size, lineHeight }}>{SAMPLE}</Typography>
                </Paper>
            }
            output={<Alert severity="info" variant="outlined">{cssLine}</Alert>}
            note="Always keep a generic fallback at the end of your font stack (sans-serif, serif, monospace)."
        />
    );
}
