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

const ACTIONS = {
    toggle: "toggle",
    set: "set"
};

export default function ReduxStorePlayground() {
    const [state, setState] = useState("on");
    const [action, setAction] = useState(ACTIONS.toggle);
    const [payload, setPayload] = useState("off");
    const [log, setLog] = useState(["store initialized -> on"]);

    const run = () => {
        const prev = state;
        let next = prev;
        if (action === ACTIONS.toggle) {
            next = prev === "on" ? "off" : "on";
        }
        if (action === ACTIONS.set) {
            next = payload === "on" ? "on" : "off";
        }
        setState(next);
        setLog((entries) => [...entries, `dispatch(${action}) -> ${prev} -> ${next}`]);
    };

    const reset = () => {
        setState("on");
        setAction(ACTIONS.toggle);
        setPayload("off");
        setLog(["store reset -> on"]);
    };

    const checks = useMemo(
        () => [
            { ok: true, text: "dispatch() invoked through simulation." },
            { ok: log.length > 1, text: "subscribe() equivalent received state updates." },
            { ok: ["on", "off"].includes(state), text: `getState() returns '${state}'.` }
        ],
        [log.length, state]
    );
    const reducerExpression = action === ACTIONS.toggle
        ? "state === \"on\" ? \"off\" : \"on\""
        : `payload === "on" ? "on" : "off" // payload: "${payload}"`;

    return (
        <PlaygroundShell
            title="Store Dispatch Cycle Playground"
            goal="Practice the dispatch -> reducer -> subscribe -> getState loop." 
            status={{ color: state === "on" ? "success" : "info", label: `state: ${state}` }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 620 }}>
                    <FormControl size="small">
                        <InputLabel id="redux-api-action-label">Action</InputLabel>
                        <Select
                            labelId="redux-api-action-label"
                            label="Action"
                            value={action}
                            onChange={(event) => setAction(event.target.value)}
                        >
                            <MenuItem value={ACTIONS.toggle}>toggle</MenuItem>
                            <MenuItem value={ACTIONS.set}>set (uses payload)</MenuItem>
                        </Select>
                    </FormControl>

                    {action === ACTIONS.set ? (
                        <TextField
                            size="small"
                            label="Payload (on/off)"
                            value={payload}
                            onChange={(event) => setPayload(event.target.value.toLowerCase())}
                        />
                    ) : null}

                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" onClick={run}>Run</Button>
                        <Button variant="outlined" onClick={reset}>Reset</Button>
                    </Stack>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.4, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Store snapshot</Typography>
                    <Typography sx={{ mt: 1 }}>Current state: {state}</Typography>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    {checks.map((item) => (
                        <Alert key={item.text} severity={item.ok ? "success" : "warning"} variant="outlined">
                            {item.text}
                        </Alert>
                    ))}
                    <Paper variant="outlined" sx={{ p: 1.2, borderRadius: 2 }}>
                        <Typography variant="caption" color="text.secondary">Event log</Typography>
                        <Typography component="pre" sx={{ m: "8px 0 0", fontSize: 12, whiteSpace: "pre-wrap" }}>
                            {log.join("\n")}
                        </Typography>
                    </Paper>
                </Stack>
            }
            code={
                <pre>{`const store = createStore(lightSwitchReducer);
store.subscribe(() => console.log(store.getState()));

store.dispatch({ type: "${action}", payload: "${payload}" });

function lightSwitchReducer(state = "on", action) {
  if (action.type === "toggle" || action.type === "set") {
    return ${reducerExpression};
  }
  return state;
}

// current state: "${state}"`}</pre>
            }
            note="Redux store APIs are simple: state changes are observable when actions are explicit and traceable."
        />
    );
}
