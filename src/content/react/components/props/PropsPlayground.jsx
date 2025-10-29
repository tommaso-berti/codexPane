import React, { useMemo, useState } from "react";
import {
    Card, CardContent, CardHeader, CardActions,
    Typography, TextField, Switch, FormControlLabel,
    Button, Select, MenuItem, Box, Divider
} from "@mui/material";

function FancyBox({ title = "Default title", color = "#1976d2", children, onPing }) {
    return (
        <Box sx={{ borderRadius: 2, p: 2, border: "1px solid #ddd", background: "#fafafa" }}>
            <Typography variant="h6" sx={{ mb: 1, color }}>{title}</Typography>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                {children || <Typography variant="body2">No children passed.</Typography>}
                <Button size="small" variant="contained" onClick={() => onPing?.("pong")} sx={{ ml: "auto" }}>
                    Ping
                </Button>
            </Box>
        </Box>
    );
}

export default function PropsPlayground() {
    const [name, setName] = useState("Jamel");
    const [title, setTitle] = useState("Greetings");
    const [color, setColor] = useState("#1976d2");
    const [excited, setExcited] = useState(true);

    const code = useMemo(() => {
        const child = excited ? `<strong>Hello, ${name}!</strong>` : `Hello, ${name}.`;
        return `function FancyBox({ title = "Default title", color = "#1976d2", children, onPing }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: 12 }}>
      <h3 style={{ color }}>{title}</h3>
      <div>{children}</div>
      <button onClick={() => onPing?.("pong")}>Ping</button>
    </div>
  );
}

<FancyBox title="${title}" color="${color}" onPing={(msg) => alert(msg)}>
  ${child}
</FancyBox>`;
    }, [title, color, name, excited]);

    return (
        <Card sx={{ borderRadius: 3, overflow: "hidden" }}>
            <CardHeader title="Props Playground" subheader="Pass values, children, and event handlers" />
            <CardContent>
                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                    <Box sx={{ display: "grid", gap: 2 }}>
                        <TextField
                            label="Name prop"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            size="small"
                        />
                        <TextField
                            label="title (default prop)"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            size="small"
                        />
                        <TextField
                            label="color prop"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            size="small"
                        />
                        <FormControlLabel
                            control={<Switch checked={excited} onChange={(e) => setExcited(e.target.checked)} />}
                            label="excited child"
                        />
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>Live preview</Typography>
                        <FancyBox title={title} color={color} onPing={(msg) => alert(`Received: ${msg}`)}>
                            {excited ? <strong>Hello, {name}!</strong> : <>Hello, {name}.</>}
                        </FancyBox>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>Rendered code</Typography>
                        <Box component="pre" sx={{ whiteSpace: "pre-wrap", p: 1.5, borderRadius: 1, bgcolor: "#0b1021", color: "#e6e6e6", fontSize: 12 }}>
                            {code}
                        </Box>
                    </Box>
                </Box>
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-end" }}>
                <Button variant="outlined" size="small" onClick={() => { setName("Jamel"); setTitle("Greetings"); setColor("#1976d2"); setExcited(true); }}>
                    Reset
                </Button>
            </CardActions>
        </Card>
    );
}