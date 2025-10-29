import React, { useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { configureStore, createSlice, nanoid } from "@reduxjs/toolkit";
import { Card, CardContent, Stack, TextField, Button, ToggleButton, ToggleButtonGroup, Chip, Typography } from "@mui/material";

// Slice using RTK with Immer-powered "mutating" reducers
const todosSlice = createSlice({
    name: "todos",
    initialState: [
        { id: "1", text: "learn redux toolkit", completed: false },
        { id: "2", text: "build a slice", completed: true }
    ],
    reducers: {
        addTodo: {
            prepare(text) {
                return { payload: { id: nanoid(), text } };
            },
            reducer(state, action) {
                state.push({ ...action.payload, completed: false });
            }
        },
        toggleTodo(state, action) {
            const todo = state.find(t => t.id === action.payload);
            if (todo) todo.completed = !todo.completed;
        },
        clear(state) {
            return [];
        }
    }
});

const filterSlice = createSlice({
    name: "filter",
    initialState: "ALL",
    reducers: {
        setFilter(_, action) {
            return action.payload; // "ALL" | "TODO" | "DONE"
        }
    }
});

const store = configureStore({
    reducer: {
        todos: todosSlice.reducer,
        filter: filterSlice.reducer
    }
});

function TodosUI() {
    const dispatch = useDispatch();
    const [text, setText] = useState("");
    const filter = useSelector(s => s.filter);
    const todos = useSelector(s => s.todos);
    const visible = todos.filter(t =>
        filter === "ALL" ? true : filter === "DONE" ? t.completed : !t.completed
    );

    const code = `const todosSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: {
      prepare(text) { return { payload: { id: nanoid(), text } } },
      reducer(state, action) { state.push({ ...action.payload, completed: false }) }
    },
    toggleTodo(state, action) {
      const todo = state.find(t => t.id === action.payload)
      if (todo) todo.completed = !todo.completed
    }
  }
})

const store = configureStore({
  reducer: { todos: todosSlice.reducer }
})`;

    return (
        <Card variant="outlined" sx={{ p: 2 }}>
            <CardContent>
                <Stack spacing={2}>
                    <Typography variant="h6">Todos slice playground</Typography>
                    <Stack direction="row" spacing={1}>
                        <TextField
                            size="small"
                            label="New todo"
                            value={text}
                            onChange={e => setText(e.target.value)}
                            onKeyDown={e => {
                                if (e.key === "Enter" && text.trim()) {
                                    dispatch(todosSlice.actions.addTodo(text.trim()));
                                    setText("");
                                }
                            }}
                        />
                        <Button
                            variant="contained"
                            onClick={() => {
                                if (!text.trim()) return;
                                dispatch(todosSlice.actions.addTodo(text.trim()));
                                setText("");
                            }}
                        >
                            Add
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => dispatch(todosSlice.actions.clear())}
                        >
                            Clear
                        </Button>
                    </Stack>

                    <ToggleButtonGroup
                        exclusive
                        value={filter}
                        onChange={(_, val) => val && dispatch(filterSlice.actions.setFilter(val))}
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
                                onClick={() => dispatch(todosSlice.actions.toggleTodo(t.id))}
                                sx={{ mb: 1 }}
                            />
                        ))}
                    </Stack>

                    <Typography variant="subtitle2">Code preview</Typography>
                    <pre style={{ margin: 0, padding: 12, borderRadius: 8, overflowX: "auto" }}>
{code}
          </pre>
                </Stack>
            </CardContent>
        </Card>
    );
}

export default function TodosSlicePlayground() {
    return (
        <Provider store={store}>
            <TodosUI />
        </Provider>
    );
}