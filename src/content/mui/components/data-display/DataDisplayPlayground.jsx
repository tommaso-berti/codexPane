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
    Switch,
    FormControlLabel,
    Typography
} from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const SCENARIOS = {
    transactions: {
        label: "Transactions",
        primitive: "Table",
        rationale: "Users need to compare rows and scan numeric columns."
    },
    notifications: {
        label: "Notifications",
        primitive: "List",
        rationale: "Chronological scanning and quick row actions matter most."
    },
    userStatus: {
        label: "User status",
        primitive: "Chip set",
        rationale: "Short labels and category states are the primary signal."
    }
};

export default function DataDisplayPlayground() {
    const [scenario, setScenario] = useState("transactions");
    const [dense, setDense] = useState(false);
    const [highlightCritical, setHighlightCritical] = useState(true);

    const selected = SCENARIOS[scenario];

    const checks = useMemo(
        () => [
            { ok: true, text: `Use ${selected.primitive} for ${selected.label}.` },
            { ok: dense, text: "Dense mode is useful for data-heavy views." },
            { ok: highlightCritical, text: "Critical items are emphasized." }
        ],
        [dense, highlightCritical, selected.label, selected.primitive]
    );

    return (
        <PlaygroundShell
            title="Data Display Choice Playground"
            goal="Pick the right display primitive based on comparison and scanning needs."
            status={{ color: "info", label: selected.primitive }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 560 }}>
                    <FormControl size="small">
                        <InputLabel id="display-scenario-label">Scenario</InputLabel>
                        <Select
                            labelId="display-scenario-label"
                            label="Scenario"
                            value={scenario}
                            onChange={(event) => setScenario(event.target.value)}
                        >
                            {Object.entries(SCENARIOS).map(([value, item]) => (
                                <MenuItem key={value} value={value}>{item.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControlLabel
                        control={<Switch checked={dense} onChange={(event) => setDense(event.target.checked)} />}
                        label="Use dense spacing"
                    />

                    <FormControlLabel
                        control={<Switch checked={highlightCritical} onChange={(event) => setHighlightCritical(event.target.checked)} />}
                        label="Highlight critical values"
                    />
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.4, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Preview</Typography>
                    <Box
                        sx={(theme) => ({
                            mt: 1,
                            p: dense ? 1 : 1.6,
                            borderRadius: 1.5,
                            border: "1px solid",
                            borderColor: theme.palette.divider,
                            bgcolor: theme.palette.background.default
                        })}
                    >
                        <Typography variant="subtitle2">{selected.primitive} pattern</Typography>
                        <Typography variant="body2" color="text.secondary">{selected.rationale}</Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                mt: 0.8,
                                color: highlightCritical ? "error.main" : "text.secondary",
                                fontWeight: highlightCritical ? 700 : 400
                            }}
                        >
                            Critical signal {highlightCritical ? "highlighted" : "muted"}
                        </Typography>
                    </Box>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    <Alert severity="info" variant="outlined">Recommended primitive: {selected.primitive}</Alert>
                    {checks.map((item) => (
                        <Alert key={item.text} severity={item.ok ? "success" : "warning"} variant="outlined">
                            {item.text}
                        </Alert>
                    ))}
                </Stack>
            }
            note="Choose the primitive from the task first, then refine spacing and emphasis for readability."
        />
    );
}
