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

const TOKEN_PRESETS = {
    card: {
        label: "Card surface",
        bgcolor: "background.paper",
        color: "text.primary",
        borderColor: "divider"
    },
    primary: {
        label: "Primary emphasis",
        bgcolor: "primary.main",
        color: "primary.contrastText",
        borderColor: "primary.dark"
    },
    success: {
        label: "Success highlight",
        bgcolor: "success.main",
        color: "success.contrastText",
        borderColor: "success.dark"
    }
};

export default function SxPlayground() {
    const [preset, setPreset] = useState("card");
    const [radius, setRadius] = useState(12);
    const [spacing, setSpacing] = useState(2);

    const current = TOKEN_PRESETS[preset];

    const liveSx = useMemo(
        () => ({
            p: spacing,
            borderRadius: radius,
            bgcolor: current.bgcolor,
            color: current.color,
            border: "1px solid",
            borderColor: current.borderColor,
            display: "grid",
            gap: 1,
            minHeight: 120
        }),
        [current, radius, spacing]
    );

    const sxObject = `const sx = {\n  p: ${spacing},\n  borderRadius: ${radius},\n  bgcolor: "${current.bgcolor}",\n  color: "${current.color}",\n  border: "1px solid",\n  borderColor: "${current.borderColor}"\n};`;

    return (
        <PlaygroundShell
            title="SX Token Mapping Playground"
            goal="Map token choices to the visual result of one component surface."
            status={{ color: "info", label: TOKEN_PRESETS[preset].label }}
            controls={
                <Stack spacing={1.4} sx={{ maxWidth: 520 }}>
                    <FormControl size="small">
                        <InputLabel id="sx-preset-label">Token preset</InputLabel>
                        <Select
                            labelId="sx-preset-label"
                            label="Token preset"
                            value={preset}
                            onChange={(event) => setPreset(event.target.value)}
                        >
                            {Object.entries(TOKEN_PRESETS).map(([value, item]) => (
                                <MenuItem key={value} value={value}>{item.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Stack spacing={0.3}>
                        <Typography variant="body2">Border radius: {radius}px</Typography>
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

                    <Stack spacing={0.3}>
                        <Typography variant="body2">Spacing scale (p): {spacing}</Typography>
                        <Slider
                            size="small"
                            value={spacing}
                            min={1}
                            max={4}
                            step={1}
                            marks
                            valueLabelDisplay="auto"
                            onChange={(_, value) => setSpacing(value)}
                        />
                    </Stack>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.3, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Surface preview</Typography>
                    <Box sx={{ mt: 1, ...liveSx }}>
                        <Typography variant="subtitle2">Product card</Typography>
                        <Typography variant="body2">Token-driven style reacts to palette and spacing scale.</Typography>
                    </Box>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    <Alert severity="info" variant="outlined">{sxObject}</Alert>
                    <Alert severity="success" variant="outlined">Changed token preset: {TOKEN_PRESETS[preset].label}</Alert>
                    <Alert severity="info" variant="outlined">Spacing `p` is {spacing}, border radius is {radius}px.</Alert>
                </Stack>
            }
            note="Use semantic tokens first, then tune shape and spacing. This keeps style consistent across themes."
        />
    );
}
