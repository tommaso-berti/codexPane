import React, { useMemo, useState } from "react";
import {
    Card, CardHeader, CardContent, CardActions,
    TextField, Button, Switch, FormControlLabel,
    Chip, Stack, Divider, Typography, Box
} from "@mui/material";

const TOPPINGS = ["Bell Pepper", "Sausage", "Pepperoni", "Pineapple"];

function CodeBlock({ code }) {
    return (
        <Box component="pre" sx={{
            p: 1.5, borderRadius: 1, bgcolor: "#0b1021", color: "#e6e6e6",
            fontSize: 12, whiteSpace: "pre-wrap", overflowX: "auto", m: 0
        }}>
            {code}
        </Box>
    );
}

export default function UseStatePlayground() {
    // primitives
    const [email, setEmail] = useState("");
    const [toggle, setToggle] = useState("Off");

    // previous state update
    const [count, setCount] = useState(0);

    // array state
    const [selected, setSelected] = useState([]);

    // object state
    const [form, setForm] = useState({ firstName: "", password: "" });

    const toggleTopping = (value) => {
        setSelected(prev =>
            prev.includes(value) ? prev.filter(t => t !== value) : [value, ...prev]
        );
    };

    const code = useMemo(() => {
        return `// primitives
const [email, setEmail] = useState("");
const [toggle, setToggle] = useState("Off");

// previous state
const [count, setCount] = useState(0);
const increment = () => setCount(prev => prev + 1);

// array state
const [selected, setSelected] = useState([]);
const toggleTopping = (value) => {
  setSelected(prev =>
    prev.includes(value) ? prev.filter(t => t !== value) : [value, ...prev]
  );
};

// object state
const [form, setForm] = useState({ firstName: "", password: "" });
const handleChange = ({ target: { name, value } }) =>
  setForm(prev => ({ ...prev, [name]: value }));`;
    }, []);

    return (
        <Card sx={{ borderRadius: 3, overflow: "hidden" }}>
            <CardHeader
                title="useState Playground"
                subheader="Try primitives, functional updates, arrays and objects"
            />
            <CardContent sx={{ display: "grid", gap: 2 }}>
                {/* Primitives */}
                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                    <Box sx={{ display: "grid", gap: 1 }}>
                        <Typography variant="subtitle2">Controlled input</Typography>
                        <TextField
                            label="Email"
                            size="small"
                            value={email}
                            onChange={({ target }) => setEmail(target.value)}
                        />
                        <Typography variant="body2">Value: {email || <em>(empty)</em>}</Typography>
                    </Box>
                    <Box sx={{ display: "grid", gap: 1 }}>
                        <Typography variant="subtitle2">Toggle</Typography>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={toggle === "On"}
                                    onChange={(e) => setToggle(e.target.checked ? "On" : "Off")}
                                />
                            }
                            label={`The toggle is ${toggle}`}
                        />
                    </Box>
                </Box>

                <Divider />

                {/* Previous state */}
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <Typography variant="subtitle2">Counter (functional update)</Typography>
                    <Button variant="contained" size="small" onClick={() => setCount(p => p + 1)}>
                        Increment
                    </Button>
                    <Chip label={`Count: ${count}`} color="primary" variant="outlined" />
                </Box>

                <Divider />

                {/* Array state */}
                <Box sx={{ display: "grid", gap: 1 }}>
                    <Typography variant="subtitle2">Select toppings (array state)</Typography>
                    <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                        {TOPPINGS.map(t => (
                            <Chip
                                key={t}
                                label={t}
                                color={selected.includes(t) ? "success" : "default"}
                                variant={selected.includes(t) ? "filled" : "outlined"}
                                onClick={() => toggleTopping(t)}
                                sx={{ mb: 1 }}
                            />
                        ))}
                    </Stack>
                    <Typography variant="body2">
                        Selected: {selected.length ? selected.join(", ") : "(none)"}
                    </Typography>
                </Box>

                <Divider />

                {/* Object state */}
                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                    <Box sx={{ display: "grid", gap: 1 }}>
                        <Typography variant="subtitle2">Login form (object state)</Typography>
                        <TextField
                            label="First name"
                            name="firstName"
                            size="small"
                            value={form.firstName}
                            onChange={({ target: { name, value } }) =>
                                setForm(prev => ({ ...prev, [name]: value }))
                            }
                        />
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            size="small"
                            value={form.password}
                            onChange={({ target: { name, value } }) =>
                                setForm(prev => ({ ...prev, [name]: value }))
                            }
                        />
                        <Typography variant="body2">
                            Preview: {JSON.stringify(form)}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                            Code snippet
                        </Typography>
                        <CodeBlock code={code} />
                    </Box>
                </Box>
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-end" }}>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                        setEmail("");
                        setToggle("Off");
                        setCount(0);
                        setSelected([]);
                        setForm({ firstName: "", password: "" });
                    }}
                >
                    Reset
                </Button>
            </CardActions>
        </Card>
    );
}