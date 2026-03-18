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
    ToggleButton,
    ToggleButtonGroup,
    Typography
} from "@mui/material";
import { createTheme, getContrastRatio } from "@mui/material/styles";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const PALETTES = [
    { label: "Blue", main: "#1976d2" },
    { label: "Teal", main: "#00897b" },
    { label: "Orange", main: "#ef6c00" },
    { label: "Pink", main: "#c2185b" }
];

export default function ThemePlayground() {
    const [mode, setMode] = useState("light");
    const [paletteIndex, setPaletteIndex] = useState(0);
    const [radius, setRadius] = useState(10);

    const selected = PALETTES[paletteIndex];

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    primary: { main: selected.main }
                },
                shape: { borderRadius: radius }
            }),
        [mode, radius, selected.main]
    );

    const contrastText = theme.palette.getContrastText(selected.main);
    const ratio = getContrastRatio(selected.main, contrastText);

    const contrastState = ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : "Low";
    const statusColor = contrastState === "AAA" ? "success" : contrastState === "AA" ? "info" : "warning";

    return (
        <PlaygroundShell
            title="Theme Tokens Playground"
            goal="Understand how mode, primary color, and shape radius affect theme output."
            status={{ color: statusColor, label: `${contrastState} contrast` }}
            controls={
                <Stack spacing={1.4} sx={{ maxWidth: 540 }}>
                    <ToggleButtonGroup
                        size="small"
                        color="primary"
                        exclusive
                        value={mode}
                        onChange={(_, value) => value && setMode(value)}
                        aria-label="Color mode"
                    >
                        <ToggleButton value="light">Light</ToggleButton>
                        <ToggleButton value="dark">Dark</ToggleButton>
                    </ToggleButtonGroup>

                    <FormControl size="small">
                        <InputLabel id="theme-palette-label">Primary palette</InputLabel>
                        <Select
                            labelId="theme-palette-label"
                            label="Primary palette"
                            value={paletteIndex}
                            onChange={(event) => setPaletteIndex(event.target.value)}
                        >
                            {PALETTES.map((palette, index) => (
                                <MenuItem key={palette.label} value={index}>{palette.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Stack spacing={0.3}>
                        <Typography variant="body2">Shape radius: {radius}px</Typography>
                        <Slider
                            size="small"
                            value={radius}
                            min={4}
                            max={24}
                            step={2}
                            valueLabelDisplay="auto"
                            onChange={(_, value) => setRadius(value)}
                        />
                    </Stack>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.3, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Theme sample</Typography>
                    <Box sx={{ mt: 1, display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 1 }}>
                        {["Card", "Action", "Badge"].map((label) => (
                            <Box
                                key={label}
                                sx={{
                                    bgcolor: selected.main,
                                    color: contrastText,
                                    borderRadius: `${radius}px`,
                                    px: 1,
                                    py: 1.3,
                                    textAlign: "center",
                                    fontWeight: 700
                                }}
                            >
                                {label}
                            </Box>
                        ))}
                    </Box>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    <Alert severity="info" variant="outlined">Mode: {mode} | Primary: {selected.main} | Radius: {radius}px</Alert>
                    <Alert severity={statusColor} variant="outlined">
                        Contrast ratio for primary text: {ratio.toFixed(2)}:1 ({contrastState})
                    </Alert>
                    <Alert severity="info" variant="outlined">Token snippet: palette.mode, palette.primary.main, shape.borderRadius.</Alert>
                </Stack>
            }
            note="A small token change can affect many components. Validate contrast whenever you customize primary colors."
        />
    );
}
