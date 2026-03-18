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
    { id: "1", text: "learn redux toolkit", completed: false },
    { id: "2", text: "build a slice", completed: true }
];

export default function TodosSlicePlayground() {
    const [todos, setTodos] = useState(INITIAL);
    const [filter, setFilter] = useState("ALL");
    const [text, setText] = useState("");
    const [summary, setSummary] = useState("No slice action executed yet.");

    const visible = useMemo(
        () => todos.filter((todo) =>
            filter === "ALL" ? true : filter === "DONE" ? todo.completed : !todo.completed
        ),
        [filter, todos]
    );

    const runAdd = () => {
        const payload = text.trim();
        if (!payload) return;
        const next = [...todos, { id: String(Date.now()), text: payload, completed: false }];
        setTodos(next);
        setText("");
        setSummary(`addTodo -> ${next.length} todos in slice state`);
    };

    const runToggle = () => {
        if (!visible.length) return;
        const target = visible[0].id;
        const next = todos.map((todo) =>
            todo.id === target ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(next);
        setSummary(`toggleTodo -> toggled id ${target}`);
    };

    const reset = () => {
        setTodos(INITIAL);
        setFilter("ALL");
        setText("");
        setSummary("Reset to initial RTK slice state.");
    };
    const firstVisibleId = visible[0]?.id || "(none)";

    return (
        <PlaygroundShell
            title="Slice Actions and Filtering Playground"
            goal="Understand how slice reducers update state and drive derived filtered views."
            status={{ color: "info", label: `${visible.length} visible` }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 640 }}>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                        <TextField
                            size="small"
                            label="New todo payload"
                            value={text}
                            onChange={(event) => setText(event.target.value)}
                            fullWidth
                        />
                        <Button variant="contained" onClick={runAdd}>Apply add</Button>
                    </Stack>

                    <FormControl size="small">
                        <InputLabel id="rtk-filter-label">Filter</InputLabel>
                        <Select
                            labelId="rtk-filter-label"
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
                        <Button variant="outlined" onClick={runToggle}>Run toggle first visible</Button>
                        <Button variant="text" onClick={reset}>Reset</Button>
                    </Stack>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.4, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Visible list</Typography>
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
                    <Alert severity="info" variant="outlined">{summary}</Alert>
                    <Alert severity="success" variant="outlined">Slice updates remain predictable with explicit action types.</Alert>
                    <Alert severity="info" variant="outlined">Slice state size: {todos.length}</Alert>
                </Stack>
            }
            code={
                <pre>{`const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.push({ id: Date.now().toString(), text: action.payload, completed: false });
    },
    toggleTodo: (state, action) => {
      const todo = state.find((item) => item.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    }
  }
});

dispatch(addTodo("${text.trim() || "new todo"}"));
dispatch(toggleTodo("${firstVisibleId}"));
// active filter: "${filter}"`}</pre>
            }
            note="RTK keeps reducer logic concise, but action semantics and state shape still drive correctness."
        />
    );
}
