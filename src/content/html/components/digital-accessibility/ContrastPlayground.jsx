import { useMemo, useState } from "react";
import {
    Box,
    Button,
    Chip,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import HtmlPlaygroundShell from "../HtmlPlaygroundShell.jsx";

function hexToRgb(hex) {
    const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
    if (!match) return [0, 0, 0];
    return [parseInt(match[1], 16), parseInt(match[2], 16), parseInt(match[3], 16)];
}

function luminance([r, g, b]) {
    const srgb = [r, g, b]
        .map((value) => value / 255)
        .map((value) => (value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4));
    return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

function contrastRatio(foreground, background) {
    const l1 = luminance(hexToRgb(foreground));
    const l2 = luminance(hexToRgb(background));
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
}

const PRESETS = [
    { label: "AA Pass", fg: "#1f2937", bg: "#ffffff" },
    { label: "AA Fail", fg: "#9ca3af", bg: "#ffffff" },
    { label: "Dark UI", fg: "#e2e8f0", bg: "#0f172a" }
];

export default function ContrastPlayground() {
    const [foreground, setForeground] = useState("#111827");
    const [background, setBackground] = useState("#ffffff");

    const ratio = useMemo(() => contrastRatio(foreground, background), [foreground, background]);
    const ratioLabel = `${ratio.toFixed(2)}:1`;

    const wcag = {
        aaNormal: ratio >= 4.5,
        aaLarge: ratio >= 3,
        aaaNormal: ratio >= 7,
        aaaLarge: ratio >= 4.5
    };

    const chipSx = (ok) => (theme) => {
        const tone = ok ? "success" : "error";
        return {
            border: "1px solid",
            borderColor: alpha(theme.palette[tone].main, theme.palette.mode === "dark" ? 0.58 : 0.35),
            bgcolor: alpha(theme.palette[tone].main, theme.palette.mode === "dark" ? 0.28 : 0.12),
            color: theme.palette.mode === "dark" ? theme.palette[tone].light : theme.palette[tone].dark,
            "& .MuiChip-label": { color: "inherit", fontWeight: 700 }
        };
    };

    return (
        <HtmlPlaygroundShell
            title="Contrast Playground"
            goal="Evaluate whether text and UI colors meet WCAG contrast thresholds."
            status={{
                color: wcag.aaNormal ? "success" : "warning",
                label: wcag.aaNormal ? "AA normal pass" : "AA normal fail"
            }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 520 }}>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2}>
                        <TextField
                            label="Foreground"
                            type="color"
                            value={foreground}
                            onChange={(event) => setForeground(event.target.value)}
                            size="small"
                            sx={{ width: 160 }}
                        />
                        <TextField
                            label="Background"
                            type="color"
                            value={background}
                            onChange={(event) => setBackground(event.target.value)}
                            size="small"
                            sx={{ width: 160 }}
                        />
                    </Stack>
                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                        {PRESETS.map((preset) => (
                            <Button
                                key={preset.label}
                                size="small"
                                variant="outlined"
                                onClick={() => {
                                    setForeground(preset.fg);
                                    setBackground(preset.bg);
                                }}
                            >
                                {preset.label}
                            </Button>
                        ))}
                    </Stack>
                </Stack>
            }
            preview={
                <Paper
                    variant="outlined"
                    sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: background,
                        color: foreground,
                        borderColor: "divider"
                    }}
                >
                    <Typography variant="h6" sx={{ color: "inherit", mb: 0.5 }}>
                        Preview Heading
                    </Typography>
                    <Typography variant="body2" sx={{ color: "inherit", mb: 1.2 }}>
                        This is body text. It should stay readable with your chosen colors.
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        <Box
                            component="button"
                            type="button"
                            sx={{
                                px: 1.4,
                                py: 0.7,
                                borderRadius: 1.5,
                                border: "1px solid currentColor",
                                bgcolor: "transparent",
                                color: "inherit",
                                cursor: "pointer"
                            }}
                        >
                            Primary action
                        </Box>
                        <Typography component="a" href="#" sx={{ color: "inherit", textDecoration: "underline" }}>
                            Learn more
                        </Typography>
                    </Box>
                </Paper>
            }
            output={
                <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                    <Typography variant="h4" sx={{ mb: 1 }}>
                        {ratioLabel}
                    </Typography>
                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                        <Chip size="small" variant="filled" color={wcag.aaNormal ? "success" : "error"} sx={chipSx(wcag.aaNormal)} label="AA normal 4.5:1" />
                        <Chip size="small" variant="filled" color={wcag.aaLarge ? "success" : "error"} sx={chipSx(wcag.aaLarge)} label="AA large 3:1" />
                        <Chip size="small" variant="filled" color={wcag.aaaNormal ? "success" : "error"} sx={chipSx(wcag.aaaNormal)} label="AAA normal 7:1" />
                        <Chip size="small" variant="filled" color={wcag.aaaLarge ? "success" : "error"} sx={chipSx(wcag.aaaLarge)} label="AAA large 4.5:1" />
                    </Stack>
                </Paper>
            }
            note="Aim for at least 4.5:1 for normal text and 3:1 for large text."
        />
    );
}
