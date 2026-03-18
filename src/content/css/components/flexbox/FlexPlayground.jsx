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
    Stack,
    Switch,
    Typography
} from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const DIRECTION_OPTIONS = ["row", "column"];
const JUSTIFY_OPTIONS = ["flex-start", "center", "space-between", "space-evenly"];
const ALIGN_OPTIONS = ["stretch", "flex-start", "center", "flex-end"];

const ITEMS = ["A", "B", "C", "D", "E", "F"];

export default function FlexPlayground() {
    const [direction, setDirection] = useState("row");
    const [justifyContent, setJustifyContent] = useState("flex-start");
    const [alignItems, setAlignItems] = useState("stretch");
    const [wrap, setWrap] = useState(false);

    const mainAxisLabel = direction === "row" ? "horizontal" : "vertical";
    const crossAxisLabel = direction === "row" ? "vertical" : "horizontal";

    const summary = useMemo(() => {
        const lines = [
            `Main axis: ${mainAxisLabel} (controlled by justify-content = ${justifyContent})`,
            `Cross axis: ${crossAxisLabel} (controlled by align-items = ${alignItems})`,
            `Wrapping: ${wrap ? "enabled (wrap)" : "disabled (nowrap)"}`
        ];
        return lines;
    }, [alignItems, crossAxisLabel, justifyContent, mainAxisLabel, wrap]);

    return (
        <PlaygroundShell
            title="Flex Axis Playground"
            goal="See how flex-direction changes the axis and how justify-content/align-items respond."
            status={{ color: "info", label: `Main axis: ${mainAxisLabel}` }}
            controls={
                <Stack spacing={1.4} sx={{ maxWidth: 520 }}>
                    <FormControl size="small">
                        <InputLabel id="flex-direction-label">flex-direction</InputLabel>
                        <Select
                            labelId="flex-direction-label"
                            label="flex-direction"
                            value={direction}
                            onChange={(event) => setDirection(event.target.value)}
                        >
                            {DIRECTION_OPTIONS.map((option) => (
                                <MenuItem key={option} value={option}>{option}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl size="small">
                        <InputLabel id="flex-justify-label">justify-content</InputLabel>
                        <Select
                            labelId="flex-justify-label"
                            label="justify-content"
                            value={justifyContent}
                            onChange={(event) => setJustifyContent(event.target.value)}
                        >
                            {JUSTIFY_OPTIONS.map((option) => (
                                <MenuItem key={option} value={option}>{option}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl size="small">
                        <InputLabel id="flex-align-label">align-items</InputLabel>
                        <Select
                            labelId="flex-align-label"
                            label="align-items"
                            value={alignItems}
                            onChange={(event) => setAlignItems(event.target.value)}
                        >
                            {ALIGN_OPTIONS.map((option) => (
                                <MenuItem key={option} value={option}>{option}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControlLabel
                        control={<Switch checked={wrap} onChange={(event) => setWrap(event.target.checked)} />}
                        label="Enable wrap (flex-wrap: wrap)"
                    />
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                        Container preview
                    </Typography>
                    <Box
                        sx={(theme) => ({
                            mt: 1,
                            display: "flex",
                            flexDirection: direction,
                            justifyContent,
                            alignItems,
                            flexWrap: wrap ? "wrap" : "nowrap",
                            minHeight: 170,
                            gap: 1,
                            p: 1,
                            border: "1px dashed",
                            borderColor: theme.palette.divider,
                            borderRadius: 1.5,
                            bgcolor: theme.palette.background.default
                        })}
                    >
                        {ITEMS.map((item) => (
                            <Box
                                key={item}
                                sx={(theme) => ({
                                    minWidth: 52,
                                    minHeight: 40,
                                    px: 1.2,
                                    py: 0.8,
                                    borderRadius: 1,
                                    display: "grid",
                                    placeItems: "center",
                                    fontWeight: 700,
                                    color: theme.palette.primary.contrastText,
                                    bgcolor: theme.palette.primary.main
                                })}
                            >
                                {item}
                            </Box>
                        ))}
                    </Box>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    {summary.map((line) => (
                        <Alert key={line} severity="info" variant="outlined">{line}</Alert>
                    ))}
                </Stack>
            }
            code={
                <pre>{`.container {
  display: flex;
  flex-direction: ${direction};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  flex-wrap: ${wrap ? "wrap" : "nowrap"};
}`}</pre>
            }
            note="Change flex-direction first, then compare how justify-content and align-items switch roles across axes."
        />
    );
}
