import { useMemo, useState } from "react";
import {
    Alert,
    Box,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Slider,
    Stack,
    Switch,
    Typography
} from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const POSITION_OPTIONS = ["static", "relative", "absolute", "fixed"];

export default function PositionPlayground() {
    const [position, setPosition] = useState("relative");
    const [offset, setOffset] = useState(24);
    const [withAncestor, setWithAncestor] = useState(true);

    const explanation = useMemo(() => {
        if (position === "static") return "Offsets have no effect on static elements.";
        if (position === "fixed") return "Fixed elements are anchored to the viewport.";
        if (position === "absolute") {
            return withAncestor
                ? "Absolute element is anchored to the nearest positioned ancestor."
                : "Without a positioned ancestor, absolute element falls back to the page container.";
        }
        return "Relative element keeps its original space, then shifts visually.";
    }, [position, withAncestor]);

    return (
        <PlaygroundShell
            title="Positioning Playground"
            goal="Understand how position and offsets depend on a positioned ancestor."
            status={{ color: position === "absolute" && !withAncestor ? "warning" : "info", label: `position: ${position}` }}
            controls={
                <Stack spacing={1.4} sx={{ maxWidth: 520 }}>
                    <FormControl size="small">
                        <InputLabel id="position-type-label">position</InputLabel>
                        <Select
                            labelId="position-type-label"
                            label="position"
                            value={position}
                            onChange={(event) => setPosition(event.target.value)}
                        >
                            {POSITION_OPTIONS.map((value) => (
                                <MenuItem key={value} value={value}>{value}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Typography variant="caption" color="text.secondary">offset (top/left): {offset}px</Typography>
                    <Slider
                        value={offset}
                        onChange={(_, value) => setOffset(Number(value))}
                        min={0}
                        max={80}
                        step={4}
                        disabled={position === "static"}
                        valueLabelDisplay="auto"
                    />

                    <FormControlLabel
                        control={<Switch checked={withAncestor} onChange={(event) => setWithAncestor(event.target.checked)} />}
                        label="Use positioned ancestor"
                        disabled={position === "fixed"}
                    />
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Layout preview</Typography>
                    <Box
                        sx={(theme) => ({
                            mt: 1,
                            minHeight: 210,
                            p: 1,
                            borderRadius: 1.5,
                            border: "1px dashed",
                            borderColor: theme.palette.divider,
                            bgcolor: theme.palette.background.default,
                            position: "relative",
                            overflow: "hidden"
                        })}
                    >
                        <Box
                            sx={(theme) => ({
                                minHeight: 160,
                                borderRadius: 1,
                                p: 1,
                                border: withAncestor ? "1px dashed" : "none",
                                borderColor: theme.palette.mode === "dark" ? theme.palette.grey[700] : theme.palette.grey[400],
                                position: withAncestor ? "relative" : "static"
                            })}
                        >
                            <Typography variant="caption" color="text.secondary">{withAncestor ? "positioned ancestor" : "normal flow container"}</Typography>
                            <Box
                                sx={(theme) => ({
                                    mt: 1,
                                    position,
                                    top: position === "static" ? undefined : offset,
                                    left: position === "static" ? undefined : offset,
                                    width: 150,
                                    py: 0.8,
                                    borderRadius: 1,
                                    textAlign: "center",
                                    fontWeight: 700,
                                    color: theme.palette.primary.contrastText,
                                    bgcolor: theme.palette.primary.main
                                })}
                            >
                                box
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            }
            output={<Alert severity={position === "absolute" && !withAncestor ? "warning" : "info"} variant="outlined">{explanation}</Alert>}
            note="For absolute positioning, define an explicit anchor (`position: relative`) on the intended parent."
        />
    );
}
