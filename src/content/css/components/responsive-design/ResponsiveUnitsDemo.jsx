import { useMemo, useState } from "react";
import {
    Alert,
    Box,
    Paper,
    Slider,
    Stack,
    Typography
} from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

export default function ResponsiveUnitsDemo() {
    const [rootSize, setRootSize] = useState(16);
    const [parentScale, setParentScale] = useState(1.2);
    const [containerWidth, setContainerWidth] = useState(70);

    const remPx = useMemo(() => rootSize, [rootSize]);
    const emPx = useMemo(() => Math.round(rootSize * parentScale), [rootSize, parentScale]);

    return (
        <PlaygroundShell
            title="Responsive Units Playground"
            goal="Compare rem, em, and percentages to see what each unit is relative to."
            status={{ color: "info", label: "Relative units" }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 560 }}>
                    <Typography variant="caption" color="text.secondary">Root size (`1rem`): {rootSize}px</Typography>
                    <Slider value={rootSize} onChange={(_, value) => setRootSize(Number(value))} min={12} max={22} step={1} valueLabelDisplay="auto" />
                    <Typography variant="caption" color="text.secondary">Parent text scale (`em`): {parentScale}</Typography>
                    <Slider value={parentScale} onChange={(_, value) => setParentScale(Number(value))} min={0.8} max={2} step={0.1} valueLabelDisplay="auto" />
                    <Typography variant="caption" color="text.secondary">Container width (%): {containerWidth}%</Typography>
                    <Slider value={containerWidth} onChange={(_, value) => setContainerWidth(Number(value))} min={40} max={100} step={5} valueLabelDisplay="auto" />
                </Stack>
            }
            preview={
                <Stack spacing={1.2}>
                    <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                        <Typography variant="caption" color="text.secondary">em vs rem</Typography>
                        <Box sx={{ mt: 1, fontSize: (parentScale * 1) + "em", border: "1px dashed", borderColor: "divider", borderRadius: 1.4, p: 1 }}>
                            <Typography sx={{ fontSize: "1em" }}>1em text ({emPx}px approx)</Typography>
                            <Typography sx={{ fontSize: "1rem" }}>1rem text ({remPx}px)</Typography>
                        </Box>
                    </Paper>
                    <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                        <Typography variant="caption" color="text.secondary">Percentage layout</Typography>
                        <Box sx={{ mt: 1, width: "100%", border: "1px dashed", borderColor: "divider", borderRadius: 1.4, p: 1 }}>
                            <Box sx={{ width: containerWidth + "%", bgcolor: "primary.light", color: "primary.contrastText", p: 0.8, borderRadius: 1 }}>
                                {containerWidth}% width
                            </Box>
                        </Box>
                    </Paper>
                </Stack>
            }
            output={<Alert severity="info" variant="outlined">`1rem` follows root size; `1em` follows parent size; `%` follows parent box dimensions.</Alert>}
            note="Use rem for global scale, em for component-local scaling, and percentages for layout relationships."
        />
    );
}
