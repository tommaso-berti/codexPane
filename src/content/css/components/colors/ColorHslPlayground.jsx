import { useMemo, useState } from "react";
import {
    Alert,
    Box,
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
    { label: "Sky", h: 204, s: 80, l: 56 },
    { label: "Lime", h: 96, s: 65, l: 49 },
    { label: "Coral", h: 12, s: 82, l: 62 }
];

export default function ColorHslPlayground() {
    const [hue, setHue] = useState(PRESETS[0].h);
    const [saturation, setSaturation] = useState(PRESETS[0].s);
    const [lightness, setLightness] = useState(PRESETS[0].l);

    const hslColor = useMemo(() => "hsl(" + hue + " " + saturation + "% " + lightness + "%)", [hue, saturation, lightness]);

    return (
        <PlaygroundShell
            title="HSL Playground"
            goal="Learn how hue, saturation, and lightness each change the final color."
            status={{ color: "info", label: "HSL color" }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 560 }}>
                    <FormControl size="small">
                        <InputLabel id="hsl-preset-label">Preset</InputLabel>
                        <Select
                            labelId="hsl-preset-label"
                            label="Preset"
                            value={PRESETS.find((preset) => preset.h === hue && preset.s === saturation && preset.l === lightness)?.label || "Custom"}
                            onChange={(event) => {
                                const next = PRESETS.find((preset) => preset.label === event.target.value);
                                if (!next) return;
                                setHue(next.h);
                                setSaturation(next.s);
                                setLightness(next.l);
                            }}
                        >
                            {PRESETS.map((preset) => (
                                <MenuItem key={preset.label} value={preset.label}>{preset.label}</MenuItem>
                            ))}
                            <MenuItem value="Custom">Custom</MenuItem>
                        </Select>
                    </FormControl>

                    <Typography variant="caption" color="text.secondary">Hue: {hue}</Typography>
                    <Slider value={hue} onChange={(_, value) => setHue(Number(value))} min={0} max={360} valueLabelDisplay="auto" />

                    <Typography variant="caption" color="text.secondary">Saturation: {saturation}%</Typography>
                    <Slider value={saturation} onChange={(_, value) => setSaturation(Number(value))} min={0} max={100} valueLabelDisplay="auto" />

                    <Typography variant="caption" color="text.secondary">Lightness: {lightness}%</Typography>
                    <Slider value={lightness} onChange={(_, value) => setLightness(Number(value))} min={0} max={100} valueLabelDisplay="auto" />
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Swatch</Typography>
                    <Box
                        sx={{
                            mt: 1,
                            minHeight: 120,
                            borderRadius: 2,
                            border: "1px solid",
                            borderColor: "divider",
                            bgcolor: hslColor
                        }}
                    />
                </Paper>
            }
            output={<Alert severity="info" variant="outlined">background-color: {hslColor};</Alert>}
            note="Lock saturation/lightness and rotate hue to generate balanced color families."
        />
    );
}
