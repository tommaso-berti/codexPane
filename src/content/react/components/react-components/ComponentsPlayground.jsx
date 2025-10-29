import React, { useMemo, useState } from "react";
import { Card, CardContent, Divider, Stack, TextField, Typography, Button, FormControl, InputLabel, Select, MenuItem, Switch, FormControlLabel } from "@mui/material";

export default function ComponentsPlayground() {
    const [message, setMessage] = useState("Hello, I'm a functional React Component!");
    const [showSale, setShowSale] = useState(true);
    const [itemsCSV, setItemsCSV] = useState("Home,Shop,About Me");
    const [eventName, setEventName] = useState("onClick");

    const items = useMemo(
        () => itemsCSV.split(",").map(s => s.trim()).filter(Boolean),
        [itemsCSV]
    );

    return (
        <Card sx={{ p: 2, borderRadius: 4, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>Components Playground</Typography>

                <Stack spacing={2} direction={{ xs: "column", sm: "row" }} alignItems="center">
                    <TextField
                        size="small"
                        label="Message"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                    />
                    <TextField
                        size="small"
                        label="Items (csv)"
                        value={itemsCSV}
                        onChange={e => setItemsCSV(e.target.value)}
                        helperText="For list rendering"
                    />
                    <FormControl size="small" sx={{ minWidth: 160 }}>
                        <InputLabel id="event-label">Event</InputLabel>
                        <Select
                            labelId="event-label"
                            value={eventName}
                            label="Event"
                            onChange={(e) => setEventName(e.target.value)}
                        >
                            <MenuItem value="onClick">onClick</MenuItem>
                            <MenuItem value="onMouseOver">onMouseOver</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControlLabel
                        control={<Switch checked={showSale} onChange={e => setShowSale(e.target.checked)} />}
                        label="Show sale"
                    />
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>Output</Typography>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    <Greeting message={message} />
                    {showSale && <ItemBox />}
                    <NavList items={items} />
                    <EventDemo eventName={eventName} />
                </Stack>

                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    Change inputs to see how components, props, conditionals, lists, and events work together.
                </Typography>
            </CardContent>
        </Card>
    );
}

function Greeting({ message }) {
    return <Typography variant="h5">{message}</Typography>;
}

function PurchaseButton() {
    return <Button variant="contained" size="small" onClick={() => alert("Purchase Complete")}>Purchase</Button>;
}

function ItemBox() {
    return (
        <Card variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
            <Typography variant="h6">50% Sale</Typography>
            <Typography variant="subtitle1">Item: Small Shirt</Typography>
            <PurchaseButton />
        </Card>
    );
}

function NavList({ items }) {
    return (
        <ul style={{ margin: 0 }}>
            {items.map(item => <li key={item}>{item}</li>)}
        </ul>
    );
}

function EventDemo({ eventName }) {
    const [count, setCount] = useState(0);
    const handlers = {
        onClick: () => setCount(c => c + 1),
        onMouseOver: () => setCount(c => c + 1),
    };
    const props = { [eventName]: handlers[eventName] };
    return (
        <Button {...props} variant="outlined" size="small">
            {eventName} count: {count}
        </Button>
    );
}