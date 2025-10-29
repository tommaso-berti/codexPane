import React, { useMemo, useState } from "react";
import { Box, Paper, Typography, TextField, Slider, Switch, FormControlLabel, Select, MenuItem, Button, Divider } from "@mui/material";

export default function JsxPlayground() {
    const [name, setName] = useState("Gerdo");
    const [age, setAge] = useState(21);
    const [baby, setBaby] = useState(false);
    const [side, setSide] = useState(120);
    const [items, setItems] = useState(["Home", "Shop", "About Me"]);
    const [img, setImg] = useState("panda");

    const pics = {
        panda: "http://bit.ly/1Tqltv5",
        owl: "http://bit.ly/1XGtkM3",
        owlCat: "http://bit.ly/1Upbczi"
    };

    function clickAlert() {
        alert("You clicked this image!");
    }

    const code = useMemo(() => {
        return `import { createRoot } from "react-dom/client";

const name = "${name}";
const age = ${age};
const baby = ${baby};
const sideLength = "${side}px";
const pics = ${JSON.stringify(pics, null, 2)};

function clickAlert() {
  alert("You clicked this image!");
}

const strings = ${JSON.stringify(items)};
const listItems = strings.map((s) => <li key={s}>{s}</li>);

const headline = (
  <h1>{age >= 18 ? "Buy Drink" : "Do Teen Stuff"}</h1>
);

const tasty = (
  <ul>
    <li>Applesauce</li>
    {!baby && <li>Pizza</li>}
    {age > 15 && <li>Brussels Sprouts</li>}
    {age > 20 && <li>Oysters</li>}
    {age > 25 && <li>Grappa</li>}
  </ul>
);

const preview = (
  <div className="preview">
    <p>Hello, {name}!</p>
    {headline}
    {tasty}
    <img
      onClick={clickAlert}
      src={pics["${img}"]}
      alt="${img}"
      width={sideLength}
      height={sideLength}
    />
    <ul>{listItems}</ul>
  </div>
);

// root.render(preview)`;
    }, [name, age, baby, side, items, img]);

    return (
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <Paper elevation={1} sx={{ p: 2, borderRadius: 3 }}>
                <Typography variant="h6" gutterBottom>Controls</Typography>
                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                    <TextField
                        label="Name (curly braces)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        size="small"
                    />
                    <TextField
                        label="Age (ternary)"
                        type="number"
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                        size="small"
                    />
                    <FormControlLabel
                        control={<Switch checked={baby} onChange={(e) => setBaby(e.target.checked)} />}
                        label="baby (&& conditional)"
                    />
                    <Box>
                        <Typography variant="body2" gutterBottom>Image side (variable attributes): {side}px</Typography>
                        <Slider min={60} max={260} value={side} onChange={(_, v) => setSide(v)} />
                    </Box>
                    <Select size="small" value={img} onChange={(e) => setImg(e.target.value)}>
                        <MenuItem value="panda">panda</MenuItem>
                        <MenuItem value="owl">owl</MenuItem>
                        <MenuItem value="owlCat">owlCat</MenuItem>
                    </Select>
                    <TextField
                        label='List items (comma separated, uses map + keys)'
                        value={items.join(", ")}
                        onChange={(e) => setItems(e.target.value.split(",").map(s => s.trim()).filter(Boolean))}
                        size="small"
                    />
                </Box>
                <Divider sx={{ my: 2 }} />
                <Button variant="contained" onClick={() => alert("This is an onClick event!")}>
                    Test onClick
                </Button>
            </Paper>

            <Paper elevation={1} sx={{ p: 2, borderRadius: 3 }}>
                <Typography variant="h6" gutterBottom>Live preview</Typography>
                <Box className="preview" sx={{ display: "grid", gap: 1, placeItems: "start" }}>
                    <p>Hello, {name}!</p>
                    <h1>{age >= 18 ? "Buy Drink" : "Do Teen Stuff"}</h1>
                    <ul>
                        <li>Applesauce</li>
                        {!baby && <li>Pizza</li>}
                        {age > 15 && <li>Brussels Sprouts</li>}
                        {age > 20 && <li>Oysters</li>}
                        {age > 25 && <li>Grappa</li>}
                    </ul>
                    <img
                        onClick={clickAlert}
                        src={pics[img]}
                        alt={img}
                        width={side}
                        height={side}
                        style={{ borderRadius: 12, cursor: "pointer" }}
                    />
                    <ul>
                        {items.map(s => <li key={s}>{s}</li>)}
                    </ul>
                </Box>
            </Paper>

            <Paper elevation={1} sx={{ p: 2, borderRadius: 3, gridColumn: "1 / -1" }}>
                <Typography variant="h6" gutterBottom>Code preview</Typography>
                <Box component="pre" sx={{ p: 2, bgcolor: "#0b1021", color: "#e6e6e6", borderRadius: 2, overflowX: "auto" }}>
                    <code>{code}</code>
                </Box>
            </Paper>
        </Box>
    );
}