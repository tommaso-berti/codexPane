import { useMemo, useState } from "react";
import {
    Alert,
    Box,
    Button,
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

const PROPERTIES = [
    { value: "transform", label: "transform" },
    { value: "background-color", label: "background-color" },
    { value: "border-radius", label: "border-radius" }
];

const EASINGS = ["ease", "linear", "ease-in", "ease-out", "ease-in-out"];

export default function TransitionPlayground() {
    const [property, setProperty] = useState("transform");
    const [duration, setDuration] = useState(500);
    const [easing, setEasing] = useState("ease");
    const [delay, setDelay] = useState(0);
    const [active, setActive] = useState(false);

    const transitionValue = `${property} ${duration}ms ${easing} ${delay}ms`;

    const targetStyle = useMemo(() => {
        const style = {
            transition: transitionValue,
            width: 180,
            height: 96,
            borderRadius: 12,
            display: "grid",
            placeItems: "center",
            fontWeight: 700,
            border: "1px solid",
            transform: "none",
            backgroundColor: "#2563eb",
            color: "#ffffff"
        };

        if (!active) return style;
        if (property === "transform") style.transform = "translateX(24px) scale(1.05)";
        if (property === "background-color") style.backgroundColor = "#16a34a";
        if (property === "border-radius") style.borderRadius = 30;
        return style;
    }, [active, property, transitionValue]);

    return (
        <PlaygroundShell
            title="Transition Timing Playground"
            goal="See how property, duration, easing, and delay combine in a single transition."
            status={{ color: "info", label: active ? "State: active" : "State: base" }}
            controls={
                <Stack spacing={1.4} sx={{ maxWidth: 560 }}>
                    <FormControl size="small">
                        <InputLabel id="transition-property-label">Property</InputLabel>
                        <Select
                            labelId="transition-property-label"
                            label="Property"
                            value={property}
                            onChange={(event) => setProperty(event.target.value)}
                        >
                            {PROPERTIES.map((item) => (
                                <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Typography variant="caption" color="text.secondary">Duration: {duration}ms</Typography>
                    <Slider
                        value={duration}
                        onChange={(_, value) => setDuration(Number(value))}
                        min={0}
                        max={2000}
                        step={50}
                        valueLabelDisplay="auto"
                    />

                    <FormControl size="small">
                        <InputLabel id="transition-easing-label">Timing function</InputLabel>
                        <Select
                            labelId="transition-easing-label"
                            label="Timing function"
                            value={easing}
                            onChange={(event) => setEasing(event.target.value)}
                        >
                            {EASINGS.map((value) => (
                                <MenuItem key={value} value={value}>{value}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Typography variant="caption" color="text.secondary">Delay: {delay}ms</Typography>
                    <Slider
                        value={delay}
                        onChange={(_, value) => setDelay(Number(value))}
                        min={0}
                        max={1200}
                        step={50}
                        valueLabelDisplay="auto"
                    />

                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" onClick={() => setActive((prev) => !prev)}>Apply</Button>
                        <Button variant="outlined" onClick={() => setActive(false)}>Reset</Button>
                    </Stack>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Hover is not required; use Apply/Reset</Typography>
                    <Box sx={{ mt: 1.2, minHeight: 130, display: "grid", placeItems: "center" }}>
                        <Box sx={targetStyle}>
                            Preview
                        </Box>
                    </Box>
                </Paper>
            }
            output={<Alert severity="info" variant="outlined">transition: {transitionValue};</Alert>}
            note="A transition is only visible when the selected property actually changes between states."
        />
    );
}
