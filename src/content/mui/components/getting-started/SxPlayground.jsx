import * as React from "react";
import { useMemo, useState } from "react";
import {
    Box,
    Stack,
    Slider,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    Paper,
    Divider
} from "@mui/material";

export default function SxPlayground() {
    const [radius, setRadius] = useState(12);
    const [bg, setBg] = useState("primary.main");
    const [gap, setGap] = useState(12);

    const liveSx = useMemo(
        () => ({
            p: 2,
            borderRadius: radius / 4,
            bgcolor: bg,
            color: "primary.contrastText",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: `${gap / 8}rem`,
            minHeight: 120
        }),
        [radius, bg, gap]
    );

    const code = `// Live sx object
const sx = {
  p: 2,
  borderRadius: ${radius} / 4,
  bgcolor: "${bg}",
  color: "primary.contrastText",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "${(gap / 8).toFixed(2)}rem",
  minHeight: 120
};`;

    return (
        <Stack spacing={2}>
            <Typography variant="h6">Tune theme-aware styles</Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <FormControl size="small" sx={{ minWidth: 180 }}>
                    <InputLabel>Background</InputLabel>
                    <Select
                        label="Background"
                        value={bg}
                        onChange={(e) => setBg(e.target.value)}
                    >
                        <MenuItem value="primary.main">primary.main</MenuItem>
                        <MenuItem value="secondary.main">secondary.main</MenuItem>
                        <MenuItem value="success.main">success.main</MenuItem>
                        <MenuItem value="warning.main">warning.main</MenuItem>
                        <MenuItem value="error.main">error.main</MenuItem>
                        <MenuItem value="info.main">info.main</MenuItem>
                    </Select>
                </FormControl>

                <Stack sx={{ minWidth: 240 }}>
                    <Typography variant="caption">Border radius</Typography>
                    <Slider
                        size="small"
                        value={radius}
                        min={4}
                        max={32}
                        step={2}
                        valueLabelDisplay="auto"
                        onChange={(_, v) => setRadius(v)}
                    />
                </Stack>

                <Stack sx={{ minWidth: 240 }}>
                    <Typography variant="caption">Gap</Typography>
                    <Slider
                        size="small"
                        value={gap}
                        min={0}
                        max={48}
                        step={4}
                        valueLabelDisplay="auto"
                        onChange={(_, v) => setGap(v)}
                    />
                </Stack>
            </Stack>

            <Paper sx={{ p: 2 }}>
                <Typography variant="overline">Preview</Typography>
                <Box sx={liveSx}>
                    <Box sx={{ bgcolor: "rgba(255,255,255,.2)", px: 1, py: 0.5, borderRadius: 1 }}>Item 1</Box>
                    <Box sx={{ bgcolor: "rgba(255,255,255,.2)", px: 1, py: 0.5, borderRadius: 1 }}>Item 2</Box>
                    <Box sx={{ bgcolor: "rgba(255,255,255,.2)", px: 1, py: 0.5, borderRadius: 1 }}>Item 3</Box>
                </Box>
            </Paper>

            <Divider />

            <Paper sx={{ p: 2, bgcolor: "grey.50" }}>
                <Typography variant="overline">Code</Typography>
                <pre style={{ margin: 0 }}>
        <code>{code}</code>
      </pre>
            </Paper>
        </Stack>
    );
}