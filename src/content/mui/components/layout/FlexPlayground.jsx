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

    const mainAxis = direction === "row" ? "horizontal" : "vertical";
    const crossAxis = direction === "row" ? "vertical" : "horizontal";

    const checks = useMemo(
        () => [
            `Main axis (${mainAxis}) is controlled by justify-content: ${justifyContent}`,
            `Cross axis (${crossAxis}) is controlled by align-items: ${alignItems}`,
            `Wrapping is ${wrap ? "enabled" : "disabled"}`
        ],
        [alignItems, crossAxis, justifyContent, mainAxis, wrap]
    );

    return (
        <PlaygroundShell
            title="Flex Axis Playground"
            goal="See how flex-direction changes the axis and how justify-content and align-items respond."
            status={{ color: "info", label: `Main axis: ${mainAxis}` }}
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
                        label="Enable wrap"
                    />
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.4, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Container preview</Typography>
                    <Box
                        sx={(theme) => ({
                            mt: 1,
                            display: "flex",
                            flexDirection: direction,
                            justifyContent,
                            alignItems,
                            flexWrap: wrap ? "wrap" : "nowrap",
                            gap: 1,
                            minHeight: 170,
                            p: 1,
                            borderRadius: 1.5,
                            border: "1px dashed",
                            borderColor: theme.palette.divider,
                            bgcolor: theme.palette.background.default
                        })}
                    >
                        {ITEMS.map((item) => (
                            <Box
                                key={item}
                                sx={(theme) => ({
                                    minWidth: 52,
                                    px: 1.1,
                                    py: 0.75,
                                    borderRadius: 1,
                                    textAlign: "center",
                                    fontWeight: 700,
                                    bgcolor: theme.palette.primary.main,
                                    color: theme.palette.primary.contrastText
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
                    {checks.map((line) => (
                        <Alert key={line} severity="info" variant="outlined">{line}</Alert>
                    ))}
                </Stack>
            }
            note="Change flex-direction first: it defines which axis justify-content and align-items will control."
        />
    );
}
