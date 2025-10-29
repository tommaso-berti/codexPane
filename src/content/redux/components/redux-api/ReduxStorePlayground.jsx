import React, { useEffect, useMemo, useState } from "react";
import { createStore } from "@reduxjs/toolkit";
import { Box, Button, Chip, Divider, Paper, Stack, Typography } from "@mui/material";

function makeStore() {
    const initialState = "on";
    function lightSwitchReducer(state = initialState, action) {
        switch (action.type) {
            case "toggle":
                return state === "on" ? "off" : "on";
            default:
                return state;
        }
    }
    return createStore(lightSwitchReducer);
}

export default function ReduxApiPlayground() {
    const store = useMemo(() => makeStore(), []);
    const [value, setValue] = useState(store.getState());
    const [log, setLog] = useState([]);

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            const next = store.getState();
            setValue(next);
            setLog((l) => [...l, `state -> ${next}`]);
        });
        return unsubscribe;
    }, [store]);

    const toggle = () => ({ type: "toggle" });

    const runToggle = () => {
        setLog((l) => [...l, "dispatch(toggle())"]);
        store.dispatch(toggle());
    };

    const code = `import { createStore } from "redux";

const initialState = "on";
function lightSwitchReducer(state = initialState, action) {
  switch (action.type) {
    case "toggle":
      return state === "on" ? "off" : "on";
    default:
      return state;
  }
}
const store = createStore(lightSwitchReducer);

// subscribe
const unsubscribe = store.subscribe(() => {
  console.log("state ->", store.getState());
});

// dispatch
store.dispatch({ type: "toggle" });`;

    return (
        <Stack spacing={2}>
            <Typography variant="h6">Light switch</Typography>
            <Stack direction="row" spacing={1} alignItems="center">
                <Chip label={`state: ${value}`} color={value === "on" ? "success" : "default"} />
                <Button variant="contained" onClick={runToggle}>dispatch toggle</Button>
            </Stack>

            <Divider />

            <Typography variant="subtitle1">Console</Typography>
            <Paper variant="outlined">
                <Box component="pre" sx={{ m: 0, p: 1.5, fontFamily: "monospace", fontSize: 13, maxHeight: 160, overflow: "auto" }}>
                    {log.length ? log.map((line, i) => <div key={i}>{line}</div>) : <em>No logs yet. Click “dispatch toggle”.</em>}
                </Box>
            </Paper>

            <Typography variant="subtitle1">Code running in this demo</Typography>
            <Paper variant="outlined">
                <Box component="pre" sx={{ m: 0, p: 1.5, fontFamily: "monospace", fontSize: 12, whiteSpace: "pre-wrap" }}>
                    {code}
                </Box>
            </Paper>
        </Stack>
    );
}