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

const VARIANTS = ["contained", "outlined", "text"];
const STATES = ["default", "hover", "active", "focus-visible"];

export default function ButtonPlayground() {
    const [variant, setVariant] = useState("contained");
    const [state, setState] = useState("default");

    const styleState = useMemo(() => {
        if (state === "hover") {
            return { transform: "translateY(-1px)", filter: "brightness(1.04)" };
        }
        if (state === "active") {
            return { transform: "translateY(1px)", filter: "brightness(0.94)" };
        }
        if (state === "focus-visible") {
            return {
                outline: "3px solid",
                outlineColor: "#93c5fd",
                outlineOffset: "2px"
            };
        }
        return {};
    }, [state]);

    return (
        <PlaygroundShell
            title="Button State Playground"
            goal="Compare variant and interaction state to make clickability and focus clear."
            status={{ color: state === "focus-visible" ? "success" : "info", label: `State: ${state}` }}
            controls={
                <Stack spacing={1.4} sx={{ maxWidth: 520 }}>
                    <FormControl size="small">
                        <InputLabel id="button-variant-label">Variant</InputLabel>
                        <Select
                            labelId="button-variant-label"
                            label="Variant"
                            value={variant}
                            onChange={(event) => setVariant(event.target.value)}
                        >
                            {VARIANTS.map((value) => (
                                <MenuItem key={value} value={value}>{value}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl size="small">
                        <InputLabel id="button-state-label">State</InputLabel>
                        <Select
                            labelId="button-state-label"
                            label="State"
                            value={state}
                            onChange={(event) => setState(event.target.value)}
                        >
                            {STATES.map((value) => (
                                <MenuItem key={value} value={value}>{value}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Preview</Typography>
                    <Box sx={{ mt: 1.2, minHeight: 110, display: "grid", placeItems: "center" }}>
                        <Box
                            component="button"
                            type="button"
                            sx={(theme) => ({
                                px: 2,
                                py: 1,
                                borderRadius: 1.5,
                                border: variant === "outlined" ? "1px solid" : "none",
                                borderColor: theme.palette.primary.main,
                                bgcolor: variant === "contained" ? theme.palette.primary.main : "transparent",
                                color: variant === "contained" ? theme.palette.primary.contrastText : theme.palette.primary.main,
                                fontWeight: 700,
                                transition: "all 140ms ease",
                                ...styleState
                            })}
                        >
                            Submit form
                        </Box>
                    </Box>
                </Paper>
            }
            output={
                <Alert severity={state === "focus-visible" ? "success" : "info"} variant="outlined">
                    Keep `focus-visible` obvious and preserve clear contrast for every variant.
                </Alert>
            }
            note="Buttons should communicate affordance at rest and provide clear hover/active/focus feedback."
        />
    );
}
