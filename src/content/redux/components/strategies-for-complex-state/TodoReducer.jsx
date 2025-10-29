import React, { useReducer, useState } from "react";
import { Card, CardContent, TextField, Button, Stack, Chip, ToggleButton, ToggleButtonGroup } from "@mui/material";

const initialTodos = [
    { id: 0, text: "learn redux", completed: false },
    { id: 1, text: "build a redux app", completed: true }
];

function todosReducer(todos, action) {
    switch (action.type) {
        case "todos/addTodo":
            return [...todos, { id: Date.now(), text: action.payload, completed: false }];
        case "todos/toggleTodo":
            return todos.map(t =>
                t.id === action.payload ? { ...t, completed: !t.completed } : t
            );
        case "todos/clear":
            return [];
        default:
            return todos;
    }
}

export default function TodoReducer() {
    const [todos, dispatch] = useReducer(todosReducer, initialTodos);
    const [text, setText] = useState("");
    const [filter, setFilter] = useState("ALL");

    const visible = todos.filter(t =>
        filter === "ALL" ? true : filter === "DONE" ? t.completed : !t.completed
    );

    const code = `function todosReducer(todos, action) {
  switch (action.type) {
    case "todos/addTodo":
      return [...todos, { id: Date.now(), text: action.payload, completed: false }];
    case "todos/toggleTodo":
      return todos.map(t =>
        t.id === action.payload ? { ...t, completed: !t.completed } : t
      );
    case "todos/clear":
      return [];
    default:
      return todos;
  }
}`;

    return (
        <Card variant="outlined" sx={{ p: 2 }}>
            <CardContent>
                <Stack spacing={2}>
                    <Stack direction="row" spacing={1}>
                        <TextField
                            size="small"
                            label="New todo"
                            value={text}
                            onChange={e => setText(e.target.value)}
                            onKeyDown={e => {
                                if (e.key === "Enter" && text.trim()) {
                                    dispatch({ type: "todos/addTodo", payload: text.trim() });
                                    setText("");
                                }
                            }}
                        />
                        <Button
                            variant="contained"
                            onClick={() => {
                                if (!text.trim()) return;
                                dispatch({ type: "todos/addTodo", payload: text.trim() });
                                setText("");
                            }}
                        >
                            Add
                        </Button>
                        <Button variant="outlined" color="error" onClick={() => dispatch({ type: "todos/clear" })}>
                            Clear
                        </Button>
                    </Stack>

                    <ToggleButtonGroup
                        exclusive
                        value={filter}
                        onChange={(_, val) => val && setFilter(val)}
                        size="small"
                    >
                        <ToggleButton value="ALL">All</ToggleButton>
                        <ToggleButton value="TODO">Todo</ToggleButton>
                        <ToggleButton value="DONE">Done</ToggleButton>
                    </ToggleButtonGroup>

                    <Stack direction="row" spacing={1} flexWrap="wrap">
                        {visible.map(t => (
                            <Chip
                                key={t.id}
                                label={t.text + (t.completed ? " ✓" : "")}
                                color={t.completed ? "success" : "default"}
                                onClick={() => dispatch({ type: "todos/toggleTodo", payload: t.id })}
                                sx={{ mb: 1 }}
                            />
                        ))}
                    </Stack>

                    <pre style={{ margin: 0, padding: "12px", borderRadius: 8, overflowX: "auto" }}>
{code}
          </pre>
                </Stack>
            </CardContent>
        </Card>
    );
}