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
    Typography
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const COMMANDS = [
    { value: "show dbs", label: "show dbs" },
    { value: "use online_plant_shop", label: "use online_plant_shop" },
    { value: "use analytics_lab", label: "use analytics_lab (missing DB)" },
    { value: "db", label: "db" },
    { value: "show collections", label: "show collections" },
    { value: "insert", label: "insert one document" }
];

const INITIAL_STATE = {
    currentDb: "test",
    knownDbs: ["admin", "config", "local", "online_plant_shop"],
    collectionsByDb: {
        test: [],
        online_plant_shop: ["products", "orders", "customers"]
    },
    pendingCreationDb: null,
    log: ["Connected to mongosh. Current DB: test"]
};

function applyCommand(prevState, command) {
    const next = {
        currentDb: prevState.currentDb,
        knownDbs: [...prevState.knownDbs],
        collectionsByDb: { ...prevState.collectionsByDb },
        pendingCreationDb: prevState.pendingCreationDb,
        log: [...prevState.log]
    };

    if (command === "show dbs") {
        next.log.push(`show dbs -> ${next.knownDbs.join(", ")}`);
        return next;
    }

    if (command.startsWith("use ")) {
        const dbName = command.replace("use ", "").trim();
        next.currentDb = dbName;
        const exists = next.knownDbs.includes(dbName);
        next.pendingCreationDb = exists ? null : dbName;
        next.log.push(exists
            ? `Switched to existing DB: ${dbName}`
            : `Switched to ${dbName}. It will be created on first write.`);
        return next;
    }

    if (command === "db") {
        next.log.push(`db -> ${next.currentDb}`);
        return next;
    }

    if (command === "show collections") {
        const collections = next.collectionsByDb[next.currentDb] || [];
        next.log.push(`show collections -> ${collections.length ? collections.join(", ") : "(none)"}`);
        return next;
    }

    if (command === "insert") {
        if (next.pendingCreationDb && !next.knownDbs.includes(next.pendingCreationDb)) {
            next.knownDbs.push(next.pendingCreationDb);
            next.collectionsByDb[next.pendingCreationDb] = ["events"];
            next.log.push(`First write detected. Created DB: ${next.pendingCreationDb}`);
            next.pendingCreationDb = null;
        } else if (!next.collectionsByDb[next.currentDb] || next.collectionsByDb[next.currentDb].length === 0) {
            next.collectionsByDb[next.currentDb] = ["events"];
            next.log.push(`Inserted into ${next.currentDb}. Created first collection: events`);
        } else {
            next.log.push(`Inserted one document into ${next.currentDb}.${next.collectionsByDb[next.currentDb][0]}`);
        }
        return next;
    }

    next.log.push(`Unknown command: ${command}`);
    return next;
}

export default function MongoShellContextPlayground() {
    const [selectedCommand, setSelectedCommand] = useState(COMMANDS[0].value);
    const [state, setState] = useState(INITIAL_STATE);

    const summary = useMemo(() => {
        const collections = state.collectionsByDb[state.currentDb] || [];
        return {
            currentDb: state.currentDb,
            collections,
            lazyCreation: state.pendingCreationDb
                ? `Pending creation for ${state.pendingCreationDb} (needs first write).`
                : "No pending lazy-creation database."
        };
    }, [state]);

    return (
        <PlaygroundShell
            title="Mongo Shell Context Playground"
            goal="Practice shell context commands and observe lazy database creation on first write."
            status={{ color: state.pendingCreationDb ? "warning" : "success", label: `db: ${state.currentDb}` }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 680 }}>
                    <FormControl size="small" sx={{ minWidth: 300 }}>
                        <InputLabel id="command-label">Command</InputLabel>
                        <Select
                            labelId="command-label"
                            label="Command"
                            value={selectedCommand}
                            onChange={(event) => setSelectedCommand(event.target.value)}
                        >
                            {COMMANDS.map((command) => (
                                <MenuItem key={command.value} value={command.value}>{command.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Stack direction="row" spacing={1}>
                        <Button
                            variant="contained"
                            onClick={() => setState((prev) => applyCommand(prev, selectedCommand))}
                        >
                            Apply
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                setSelectedCommand(COMMANDS[0].value);
                                setState(INITIAL_STATE);
                            }}
                        >
                            Reset
                        </Button>
                    </Stack>
                </Stack>
            }
            preview={
                <Paper
                    variant="outlined"
                    sx={(theme) => ({
                        p: 1.3,
                        borderRadius: 2,
                        bgcolor: theme.palette.mode === "dark"
                            ? alpha(theme.palette.common.white, 0.04)
                            : alpha(theme.palette.common.black, 0.02)
                    })}
                >
                    <Typography variant="caption" color="text.secondary">Current shell context</Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        Current DB: <strong>{summary.currentDb}</strong>
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                        Collections: {summary.collections.length ? summary.collections.join(", ") : "(none)"}
                    </Typography>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    <Alert severity={state.pendingCreationDb ? "warning" : "success"} variant="outlined">
                        {summary.lazyCreation}
                    </Alert>
                    <Paper variant="outlined" sx={{ p: 1.2, borderRadius: 2 }}>
                        <Typography variant="caption" color="text.secondary">Shell log (latest first)</Typography>
                        <Stack spacing={0.4} sx={{ mt: 1 }}>
                            {[...state.log].slice(-5).reverse().map((line, index) => (
                                <Typography key={line + index} variant="body2" sx={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                                    {line}
                                </Typography>
                            ))}
                        </Stack>
                    </Paper>
                </Stack>
            }
            note="`use <db>` changes context immediately, but MongoDB creates the database only when you perform the first write."
        />
    );
}
