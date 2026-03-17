import { useMemo, useState } from "react";
import {
    Alert,
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    Typography
} from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const TEMPLATE_OPTIONS = [
    { value: "1fr 1fr", label: "2 equal columns" },
    { value: "2fr 1fr", label: "main + sidebar" },
    { value: "120px 1fr 1fr", label: "fixed + fluid" }
];

const GAP_OPTIONS = [0, 8, 16, 24];
const AUTO_FLOW_OPTIONS = ["row", "column", "row dense"];

const CARDS = ["Card A", "Card B", "Card C", "Card D", "Card E"];

export default function GridPlayground() {
    const [templateColumns, setTemplateColumns] = useState(TEMPLATE_OPTIONS[0].value);
    const [gap, setGap] = useState(16);
    const [autoFlow, setAutoFlow] = useState("row");

    const anatomy = useMemo(() => {
        const tracks = templateColumns.split(" ").length;
        return [
            `Columns: ${tracks} tracks (${templateColumns})`,
            `Gap: ${gap}px between rows and columns`,
            `Auto-placement: ${autoFlow}`
        ];
    }, [autoFlow, gap, templateColumns]);

    return (
        <PlaygroundShell
            title="Grid Template Playground"
            goal="Understand how template columns, gap, and auto-flow shape grid placement."
            status={{ color: "info", label: `${templateColumns.split(" ").length} columns` }}
            controls={
                <Stack spacing={1.4} sx={{ maxWidth: 520 }}>
                    <FormControl size="small">
                        <InputLabel id="grid-template-label">grid-template-columns</InputLabel>
                        <Select
                            labelId="grid-template-label"
                            label="grid-template-columns"
                            value={templateColumns}
                            onChange={(event) => setTemplateColumns(event.target.value)}
                        >
                            {TEMPLATE_OPTIONS.map((option) => (
                                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl size="small">
                        <InputLabel id="grid-gap-label">gap</InputLabel>
                        <Select
                            labelId="grid-gap-label"
                            label="gap"
                            value={gap}
                            onChange={(event) => setGap(Number(event.target.value))}
                        >
                            {GAP_OPTIONS.map((value) => (
                                <MenuItem key={value} value={value}>{value}px</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl size="small">
                        <InputLabel id="grid-flow-label">grid-auto-flow</InputLabel>
                        <Select
                            labelId="grid-flow-label"
                            label="grid-auto-flow"
                            value={autoFlow}
                            onChange={(event) => setAutoFlow(event.target.value)}
                        >
                            {AUTO_FLOW_OPTIONS.map((value) => (
                                <MenuItem key={value} value={value}>{value}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Grid preview</Typography>
                    <Box
                        sx={(theme) => ({
                            mt: 1,
                            display: "grid",
                            gridTemplateColumns: templateColumns,
                            gridAutoFlow: autoFlow,
                            gap: `${gap}px`,
                            p: 1,
                            borderRadius: 1.5,
                            border: "1px dashed",
                            borderColor: theme.palette.divider,
                            bgcolor: theme.palette.background.default
                        })}
                    >
                        {CARDS.map((card) => (
                            <Box
                                key={card}
                                sx={(theme) => ({
                                    minHeight: 56,
                                    borderRadius: 1,
                                    px: 1,
                                    display: "grid",
                                    placeItems: "center",
                                    bgcolor: theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[100],
                                    border: "1px solid",
                                    borderColor: theme.palette.divider,
                                    color: theme.palette.text.primary,
                                    fontWeight: 600
                                })}
                            >
                                {card}
                            </Box>
                        ))}
                    </Box>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    {anatomy.map((item) => (
                        <Alert key={item} severity="info" variant="outlined">{item}</Alert>
                    ))}
                </Stack>
            }
            note="Use this core model for layout decisions; move advanced spanning (`grid-row`/`grid-column`) to dedicated examples."
        />
    );
}
