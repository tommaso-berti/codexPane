import * as React from "react";
import {
    Box, Button, Popover, ClickAwayListener, Fade, Collapse, useMediaQuery, Typography, Paper
} from "@mui/material";

export default function UtilitiesPlayground() {
    const isMdUp = useMediaQuery((t) => t.breakpoints.up("md"));
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [fadeIn, setFadeIn] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [bubble, setBubble] = React.useState(false);

    const code = `// media query + popover + transitions + click away`;

    return (
        <Box sx={{ display: "grid", gap: 2 }}>
            <Typography variant="h6">Utilities</Typography>

            <Paper sx={{ p: 2 }}>
                <Typography variant="overline">useMediaQuery</Typography>
                <Box>{isMdUp ? "Desktop" : "Mobile"}</Box>
            </Paper>

            <Paper sx={{ p: 2, display: "grid", gap: 1 }}>
                <Typography variant="overline">Popover anchoring</Typography>
                <Button onClick={(e) => setAnchorEl(e.currentTarget)}>Open popover</Button>
                <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={() => setAnchorEl(null)}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    transformOrigin={{ vertical: "top", horizontal: "left" }}
                >
                    <Box sx={{ p: 2, maxWidth: 240 }}>Anchored content</Box>
                </Popover>
            </Paper>

            <Paper sx={{ p: 2, display: "grid", gap: 1 }}>
                <Typography variant="overline">ClickAwayListener</Typography>
                <Box sx={{ position: "relative", display: "inline-block" }}>
                    <Button onClick={() => setBubble((v) => !v)}>Toggle bubble</Button>
                    {bubble && (
                        <ClickAwayListener onClickAway={() => setBubble(false)}>
                            <Box sx={{
                                position: "absolute", top: "100%", mt: 1, p: 1.5,
                                bgcolor: "background.paper", borderRadius: 1, boxShadow: 3, minWidth: 180
                            }}>
                                Click outside to close
                            </Box>
                        </ClickAwayListener>
                    )}
                </Box>
            </Paper>

            <Paper sx={{ p: 2, display: "grid", gap: 1 }}>
                <Typography variant="overline">Transitions</Typography>
                <Button onClick={() => setFadeIn((v) => !v)}>Toggle fade</Button>
                <Fade in={fadeIn}>
                    <Box sx={{ p: 1, bgcolor: "success.main", color: "success.contrastText", borderRadius: 1 }}>
                        Fading box
                    </Box>
                </Fade>
                <Button onClick={() => setOpen((v) => !v)}>Toggle collapse</Button>
                <Collapse in={open}>
                    <Box sx={{ p: 1, bgcolor: "info.main", color: "info.contrastText", borderRadius: 1 }}>
                        Collapsing box
                    </Box>
                </Collapse>
            </Paper>

            <Paper sx={{ p: 2, bgcolor: "grey.50" }}>
                <Typography variant="overline">Code</Typography>
                <pre style={{ margin: 0, overflowX: "auto" }}>
          <code>{code}</code>
        </pre>
            </Paper>
        </Box>
    );
}