import { useRef, useState } from "react";
import {
    Alert,
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Popover,
    Select,
    Stack,
    Typography
} from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

export default function UtilitiesPlayground() {
    const anchorRef = useRef(null);
    const [placement, setPlacement] = useState("bottom");
    const [dismissMode, setDismissMode] = useState("click-away");
    const [open, setOpen] = useState(false);
    const [trace, setTrace] = useState(["Pick options and open the overlay."]);

    const pushTrace = (event) => setTrace((prev) => [event, ...prev].slice(0, 5));

    const openOverlay = () => {
        setOpen(true);
        pushTrace(`opened (${placement})`);
    };

    const dismissOverlay = () => {
        setOpen(false);
        pushTrace(`dismissed via ${dismissMode}`);
    };

    const reset = () => {
        setOpen(false);
        setPlacement("bottom");
        setDismissMode("click-away");
        setTrace(["Reset complete."]);
    };

    const anchorOrigin = {
        vertical: placement === "top" ? "top" : "bottom",
        horizontal: "left"
    };

    const transformOrigin = {
        vertical: placement === "top" ? "bottom" : "top",
        horizontal: "left"
    };

    return (
        <PlaygroundShell
            title="Overlay Behavior Playground"
            goal="Understand how anchor placement and dismiss strategy shape overlay UX."
            status={{ color: open ? "success" : "info", label: open ? "Open" : "Closed" }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 560 }}>
                    <FormControl size="small">
                        <InputLabel id="overlay-placement-label">Placement</InputLabel>
                        <Select
                            labelId="overlay-placement-label"
                            label="Placement"
                            value={placement}
                            onChange={(event) => setPlacement(event.target.value)}
                        >
                            <MenuItem value="bottom">Bottom</MenuItem>
                            <MenuItem value="top">Top</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl size="small">
                        <InputLabel id="overlay-dismiss-label">Dismiss mode</InputLabel>
                        <Select
                            labelId="overlay-dismiss-label"
                            label="Dismiss mode"
                            value={dismissMode}
                            onChange={(event) => setDismissMode(event.target.value)}
                        >
                            <MenuItem value="click-away">Click away</MenuItem>
                            <MenuItem value="escape">Escape key</MenuItem>
                            <MenuItem value="action">Close action button</MenuItem>
                        </Select>
                    </FormControl>

                    <Stack direction="row" spacing={1}>
                        <Button ref={anchorRef} variant="contained" onClick={openOverlay}>Apply</Button>
                        <Button variant="outlined" onClick={dismissOverlay}>Run</Button>
                        <Button variant="text" onClick={reset}>Reset</Button>
                    </Stack>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.4, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Overlay preview</Typography>
                    <Box sx={{ mt: 1, minHeight: 86 }}>
                        <Typography variant="body2" color="text.secondary">Anchor placement: {placement}</Typography>
                        <Typography variant="body2" color="text.secondary">Dismiss strategy: {dismissMode}</Typography>
                    </Box>
                    <Popover
                        open={open}
                        anchorEl={anchorRef.current}
                        onClose={dismissOverlay}
                        anchorOrigin={anchorOrigin}
                        transformOrigin={transformOrigin}
                    >
                        <Box sx={{ p: 1.5, maxWidth: 240 }}>
                            <Typography variant="subtitle2">Overlay content</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Try dismissing with the selected mode.
                            </Typography>
                        </Box>
                    </Popover>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    <Alert severity="info" variant="outlined">Recent events: {trace[0]}</Alert>
                    {trace.slice(1).map((line) => (
                        <Alert key={line} severity="success" variant="outlined">{line}</Alert>
                    ))}
                </Stack>
            }
            note="Overlays should open near the trigger and close predictably; users should never guess how to dismiss them."
        />
    );
}
