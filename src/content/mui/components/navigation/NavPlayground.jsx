import { useMemo, useState } from "react";
import {
    Alert,
    Box,
    Button,
    Paper,
    Stack,
    ToggleButton,
    ToggleButtonGroup,
    Typography
} from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const SCENARIOS = {
    mobile: {
        label: "Mobile app",
        pattern: "Drawer + Bottom navigation",
        hint: "Prioritize compact controls and thumb reach."
    },
    dashboard: {
        label: "Desktop dashboard",
        pattern: "Sidebar + Tabs",
        hint: "Persistent navigation improves multi-section workflows."
    },
    docs: {
        label: "Documentation page",
        pattern: "App bar + Section anchors",
        hint: "Fast scanning needs visible context and in-page jumps."
    }
};

export default function NavPlayground() {
    const [scenario, setScenario] = useState("mobile");
    const [isOpen, setIsOpen] = useState(false);
    const [stepLog, setStepLog] = useState(["Choose a context, then open and navigate."]);

    const selected = SCENARIOS[scenario];

    const checks = useMemo(
        () => [
            { ok: true, text: `Selected context: ${selected.label}` },
            { ok: true, text: `Recommended pattern: ${selected.pattern}` },
            { ok: isOpen, text: "Navigation is currently open" }
        ],
        [isOpen, selected.label, selected.pattern]
    );

    const pushLog = (entry) => setStepLog((prev) => [entry, ...prev].slice(0, 4));

    const openNav = () => {
        setIsOpen(true);
        pushLog(`Opened ${selected.pattern}.`);
    };

    const navigate = () => {
        pushLog(`Navigated using ${selected.pattern}.`);
    };

    const reset = () => {
        setIsOpen(false);
        setStepLog(["Reset complete."]);
    };

    return (
        <PlaygroundShell
            title="Navigation Pattern Playground"
            goal="Choose the navigation pattern that best fits the user context."
            status={{ color: "info", label: selected.label }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 620 }}>
                    <ToggleButtonGroup
                        exclusive
                        size="small"
                        value={scenario}
                        onChange={(_, value) => value && setScenario(value)}
                        aria-label="Navigation scenario"
                    >
                        <ToggleButton value="mobile">Mobile</ToggleButton>
                        <ToggleButton value="dashboard">Dashboard</ToggleButton>
                        <ToggleButton value="docs">Docs</ToggleButton>
                    </ToggleButtonGroup>

                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" onClick={openNav}>Apply</Button>
                        <Button variant="outlined" onClick={navigate}>Run</Button>
                        <Button variant="text" onClick={reset}>Reset</Button>
                    </Stack>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.4, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Pattern preview</Typography>
                    <Box sx={{ mt: 1 }}>
                        <Typography variant="subtitle2">{selected.pattern}</Typography>
                        <Typography variant="body2" color="text.secondary">{selected.hint}</Typography>
                        <Box
                            sx={(theme) => ({
                                mt: 1.2,
                                p: 1,
                                borderRadius: 1.5,
                                border: "1px dashed",
                                borderColor: theme.palette.divider,
                                bgcolor: theme.palette.background.default
                            })}
                        >
                            {isOpen ? "Navigation container open" : "Navigation container closed"}
                        </Box>
                    </Box>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    {checks.map((item) => (
                        <Alert key={item.text} severity={item.ok ? "success" : "warning"} variant="outlined">
                            {item.text}
                        </Alert>
                    ))}
                    <Alert severity="info" variant="outlined">
                        Latest action: {stepLog[0]}
                    </Alert>
                </Stack>
            }
            note="Start from device and task context: navigation quality depends on where and how users move."
        />
    );
}
