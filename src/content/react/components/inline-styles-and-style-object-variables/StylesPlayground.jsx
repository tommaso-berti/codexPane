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

const SOURCES = {
    inline: "Inline style",
    object: "Style object variable",
    classBased: "Class/module intent"
};

export default function StylesPlayground() {
    const [source, setSource] = useState("inline");
    const [font, setFont] = useState(18);
    const [radius, setRadius] = useState(8);

    const stylePreview = useMemo(
        () => ({
            fontSize: font,
            borderRadius: radius,
            padding: 12,
            border: "1px solid",
            borderColor: "divider"
        }),
        [font, radius]
    );

    return (
        <PlaygroundShell
            title="Style Source Playground"
            goal="Compare when to use inline styles, style objects, or class-based styling."
            status={{ color: "info", label: SOURCES[source] }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 560 }}>
                    <FormControl size="small">
                        <InputLabel id="style-source-label">Style source</InputLabel>
                        <Select
                            labelId="style-source-label"
                            label="Style source"
                            value={source}
                            onChange={(event) => setSource(event.target.value)}
                        >
                            <MenuItem value="inline">Inline style</MenuItem>
                            <MenuItem value="object">Style object variable</MenuItem>
                            <MenuItem value="classBased">Class/module intent</MenuItem>
                        </Select>
                    </FormControl>

                    <Typography variant="body2">Font size: {font}px</Typography>
                    <Slider min={12} max={32} value={font} onChange={(_, value) => setFont(value)} />
                    <Typography variant="body2">Border radius: {radius}px</Typography>
                    <Slider min={0} max={20} value={radius} onChange={(_, value) => setRadius(value)} />
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.4, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Computed preview</Typography>
                    <Typography sx={{ mt: 1, ...stylePreview }}>
                        Visual result using {SOURCES[source].toLowerCase()}.
                    </Typography>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    <Alert severity="info" variant="outlined">Source selected: {SOURCES[source]}</Alert>
                    <Alert severity="success" variant="outlined">Computed size: {font}px, radius: {radius}px.</Alert>
                    <Alert severity="info" variant="outlined">Use class/module patterns for reusable styles across components.</Alert>
                </Stack>
            }
            note="Choose style source by reuse needs: quick local tweaks vs reusable styling strategy."
        />
    );
}
