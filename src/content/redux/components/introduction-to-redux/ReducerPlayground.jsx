import * as React from "react";
import { useReducer, useState } from "react";
import {
    Box,
    Paper,
    Stack,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    Typography,
    Divider
} from "@mui/material";

const initialState = [ "Print trail map", "Pack snacks", "Summit the mountain" ];

function todoReducer(state = initialState, action) {
    switch (action.type) {
        case "todos/addTodo": {
            const text = String(action.payload ?? "").trim();
            if (!text) return state;
            return [...state, text];
        }
        case "todos/removeAll": {
            return [];
        }
        default:
            return state;
    }
}

const reducerSource = `
function todoReducer(state = initialState, action) {
  switch (action.type) {
    case "todos/addTodo":
      return [...state, action.payload];
    case "todos/removeAll":
      return [];
    default:
      return state;
  }
}
`.trim();

export default function ReducerPlayground() {
    const [state, dispatch] = useReducer(todoReducer, initialState);
    const [input, setInput] = useState("");

    return (
        <Box component={Paper} sx={{ p: 2 }}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="flex-start">
                <TextField
                    label="New todo"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    size="small"
                />
                <Button
                    variant="contained"
                    onClick={() => {
                        dispatch({ type: "todos/addTodo", payload: input });
                        setInput("");
                    }}
                >
                    Dispatch addTodo
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                    onClick={() => dispatch({ type: "todos/removeAll" })}
                >
                    Dispatch removeAll
                </Button>
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
                Current state
            </Typography>
            <List dense>
                {state.map((t, i) => (
                    <ListItem key={i}>
                        <ListItemText primary={t} />
                    </ListItem>
                ))}
                {state.length === 0 && (
                    <ListItem>
                        <ListItemText primary="(empty)" />
                    </ListItem>
                )}
            </List>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
                Reducer source
            </Typography>
            <Box
                component="pre"
                sx={{
                    p: 2,
                    bgcolor: "#0b1021",
                    color: "#d1e7ff",
                    borderRadius: 2,
                    overflowX: "auto",
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                    fontSize: 12,
                    lineHeight: 1.5
                }}
            >
                {reducerSource}
            </Box>
        </Box>
    );
}