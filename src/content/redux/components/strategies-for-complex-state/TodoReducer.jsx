import { useMemo, useState } from "react";
import {
    Alert,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const INITIAL = [
    { id: 1, text: "learn redux", completed: false },
    { id: 2, text: "build a redux app", completed: true }
];

export default function TodoReducer() {
    const [todos, setTodos] = useState(INITIAL);
    const [text, setText] = useState("");
    const [filter, setFilter] = useState("ALL");
    const [beforeAfter, setBeforeAfter] = useState("No reducer action applied yet.");

    const visible = useMemo(
        () => todos.filter((todo) =>
            filter === "ALL" ? true : filter === "DONE" ? todo.completed : !todo.completed
        ),
        [filter, todos]
    );

    const runAdd = () => {
        const payload = text.trim();
        if (!payload) return;
        const before = todos.length;
        const next = [...todos, { id: Date.now(), text: payload, completed: false }];
        setTodos(next);
        setText("");
        setBeforeAfter(`addTodo -> before length ${before}, after length ${next.length}`);
    };

    const toggleFirstVisible = () => {
        if (!visible.length) return;
        const target = visible[0].id;
        const next = todos.map((todo) =>
            todo.id === target ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(next);
        setBeforeAfter(`toggleTodo -> toggled id ${target}`);
    };

    const reset = () => {
        setTodos(INITIAL);
        setText("");
        setFilter("ALL");
        setBeforeAfter("Reset to initial todo reducer state.");
    };

    return (
        <PlaygroundShell
            title="Todo Reducer Updates Playground"
            goal="Practice immutable list/object updates in a reducer-style workflow."
            status={{ color: "info", label: `${visible.length} visible` }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 640 }}>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                        <TextField
                            size="small"
                            label="New todo"
                            value={text}
                            onChange={(event) => setText(event.target.value)}
                            fullWidth
                        />
                        <Button variant="contained" onClick={runAdd}>Apply add</Button>
                    </Stack>

                    <FormControl size="small">
                        <InputLabel id="todo-filter-label">Filter</InputLabel>
                        <Select
                            labelId="todo-filter-label"
                            label="Filter"
                            value={filter}
                            onChange={(event) => setFilter(event.target.value)}
                        >
                            <MenuItem value="ALL">All</MenuItem>
                            <MenuItem value="TODO">Todo</MenuItem>
                            <MenuItem value="DONE">Done</MenuItem>
                        </Select>
                    </FormControl>

                    <Stack direction="row" spacing={1}>
                        <Button variant="outlined" onClick={toggleFirstVisible}>Run toggle first visible</Button>
                        <Button variant="text" onClick={reset}>Reset</Button>
                    </Stack>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.4, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Visible todos</Typography>
                    <Stack component="ul" sx={{ mt: 1, pl: 2.5, mb: 0 }} spacing={0.4}>
                        {visible.length ? visible.map((todo) => (
                            <Typography component="li" variant="body2" key={todo.id}>
                                {todo.text} {todo.completed ? "(done)" : "(todo)"}
                            </Typography>
                        )) : <Typography component="li" variant="body2">(empty)</Typography>}
                    </Stack>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    <Alert severity="info" variant="outlined">{beforeAfter}</Alert>
                    <Alert severity="success" variant="outlined">Reducer updates create new array/object references.</Alert>
                    <Alert severity="info" variant="outlined">Total todos in state: {todos.length}</Alert>
                </Stack>
            }
            note="For complex state, keep updates explicit and immutable so each reducer step stays predictable."
        />
    );
}
