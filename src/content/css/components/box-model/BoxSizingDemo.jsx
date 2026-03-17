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

export default function BoxSizingDemo() {
    const [declaredWidth, setDeclaredWidth] = useState(220);
    const [padding, setPadding] = useState(16);
    const [border, setBorder] = useState(6);

    const contentTotal = useMemo(() => declaredWidth + (padding * 2) + (border * 2), [declaredWidth, padding, border]);

    return (
        <PlaygroundShell
            title="Box Sizing Playground"
            goal="Compare how declared width behaves in content-box versus border-box."
            status={{ color: "info", label: "Width comparison" }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 560 }}>
                    <Typography variant="caption" color="text.secondary">Declared width: {declaredWidth}px</Typography>
                    <Slider value={declaredWidth} onChange={(_, value) => setDeclaredWidth(Number(value))} min={140} max={320} step={10} valueLabelDisplay="auto" />
                    <Typography variant="caption" color="text.secondary">Padding: {padding}px</Typography>
                    <Slider value={padding} onChange={(_, value) => setPadding(Number(value))} min={0} max={32} step={2} valueLabelDisplay="auto" />
                    <Typography variant="caption" color="text.secondary">Border: {border}px</Typography>
                    <Slider value={border} onChange={(_, value) => setBorder(Number(value))} min={0} max={16} step={1} valueLabelDisplay="auto" />
                </Stack>
            }
            preview={
                <Stack direction={{ xs: "column", md: "row" }} spacing={1.2}>
                    <Paper variant="outlined" sx={{ p: 1.2, borderRadius: 2, flex: 1 }}>
                        <Typography variant="caption" color="text.secondary">content-box</Typography>
                        <Box sx={{ mt: 1, width: declaredWidth, boxSizing: "content-box", p: padding / 8, border: border + "px solid", borderColor: "primary.main", bgcolor: "primary.50", minHeight: 70, display: "grid", placeItems: "center" }}>
                            <Typography variant="caption">total: {contentTotal}px</Typography>
                        </Box>
                    </Paper>
                    <Paper variant="outlined" sx={{ p: 1.2, borderRadius: 2, flex: 1 }}>
                        <Typography variant="caption" color="text.secondary">border-box</Typography>
                        <Box sx={{ mt: 1, width: declaredWidth, boxSizing: "border-box", p: padding / 8, border: border + "px solid", borderColor: "success.main", bgcolor: "success.50", minHeight: 70, display: "grid", placeItems: "center" }}>
                            <Typography variant="caption">total: {declaredWidth}px</Typography>
                        </Box>
                    </Paper>
                </Stack>
            }
            output={<Alert severity="info" variant="outlined">content-box adds padding and border outside width; border-box keeps the declared width fixed.</Alert>}
            note="For predictable layouts, most projects set `box-sizing: border-box` globally."
        />
    );
}
