import React, { useMemo, useState } from "react";
import {
    Card, CardHeader, CardContent, CardActions,
    Button, Chip, Stack, Typography, Box, Divider, Switch, FormControlLabel
} from "@mui/material";

function StatusPanel({ active }) {
    return (
        <Box sx={{ p: 2, border: "1px solid #e0e0e0", borderRadius: 2, bgcolor: "#fafafa" }}>
            <Typography variant="h6" sx={{ mb: 0.5 }}>Engine status</Typography>
            <Chip
                label={active ? "on" : "off"}
                color={active ? "success" : "default"}
                variant={active ? "filled" : "outlined"}
            />
        </Box>
    );
}

function ToggleControls({ active, onToggle }) {
    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Button variant="contained" color="primary" onClick={() => onToggle(true)}>Turn on</Button>
            <Button variant="outlined" color="inherit" onClick={() => onToggle(false)}>Turn off</Button>
            <FormControlLabel
                control={<Switch checked={active} onChange={(e) => onToggle(e.target.checked)} />}
                label={active ? "on" : "off"}
            />
        </Stack>
    );
}

// Container: holds state and passes it to presentational children
export default function ContainerPresentationalDemo() {
    const [isActive, setIsActive] = useState(false);

    const snippet = useMemo(() => {
        return `function Container() {
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <Presentational active={isActive} toggle={setIsActive} />
      <OtherPresentational active={isActive} />
    </>
  );
}

function Presentational({ active, toggle }) {
  return (
    <>
      <h1>Engines are {active ? "on" : "off"}</h1>
      <button onClick={() => toggle(!active)}>Engine Toggle</button>
    </>
  );
}`;
    }, []);

    return (
        <Card sx={{ borderRadius: 3, overflow: "hidden" }}>
            <CardHeader
                title="Container ↔ Presentational Pattern"
                subheader="Container manages state; children render UI and receive props"
            />
            <CardContent sx={{ display: "grid", gap: 2 }}>
                <ToggleControls active={isActive} onToggle={setIsActive} />
                <Divider />
                <Typography variant="subtitle2">Siblings reflecting shared state</Typography>
                <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }}>
                    <StatusPanel active={isActive} />
                    <StatusPanel active={isActive} />
                </Stack>
                <Divider />
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Pattern snippet</Typography>
                <Box component="pre" sx={{ p: 1.5, borderRadius: 1, bgcolor: "#0b1021", color: "#e6e6e6", fontSize: 12, whiteSpace: "pre-wrap", m: 0 }}>
                    {snippet}
                </Box>
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-end" }}>
                <Button variant="outlined" size="small" onClick={() => setIsActive(false)}>Reset</Button>
            </CardActions>
        </Card>
    );
}