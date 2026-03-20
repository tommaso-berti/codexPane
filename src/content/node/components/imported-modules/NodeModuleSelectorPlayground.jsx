import { useMemo, useState } from "react";
import { Alert, Button, FormControl, InputLabel, MenuItem, Paper, Select, Stack, Typography } from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const MODULES = {
    fs: {
        useCase: "Read/write files asynchronously",
        snippet: "const { readFile } = require('fs');",
        outcome: "Use callback/promises API for file I/O."
    },
    path: {
        useCase: "Build OS-safe file paths",
        snippet: "const path = require('path');",
        outcome: "Use path.join/resolve to avoid separator issues."
    },
    events: {
        useCase: "Emit and listen for custom events",
        snippet: "const EventEmitter = require('events');",
        outcome: "Useful for decoupled pub-sub in Node services."
    },
    util: {
        useCase: "Promisify legacy callback APIs",
        snippet: "const util = require('util');",
        outcome: "Bridge callback-based code to async/await."
    }
};

export default function NodeModuleSelectorPlayground() {
    const [draft, setDraft] = useState("fs");
    const [selected, setSelected] = useState("fs");
    const info = useMemo(() => MODULES[selected], [selected]);

    return (
        <PlaygroundShell
            title="Node Core Module Selector"
            goal="Pick a backend task and map it to the right built-in Node module."
            status={{ color: "info", label: selected }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 520 }}>
                    <FormControl size="small" fullWidth>
                        <InputLabel id="node-module">Module</InputLabel>
                        <Select
                            labelId="node-module"
                            label="Module"
                            value={draft}
                            onChange={(event) => setDraft(event.target.value)}
                        >
                            {Object.keys(MODULES).map((name) => <MenuItem key={name} value={name}>{name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" onClick={() => setSelected(draft)}>Apply</Button>
                        <Button variant="outlined" onClick={() => { setDraft("fs"); setSelected("fs"); }}>Reset</Button>
                    </Stack>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.2, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Typical use case</Typography>
                    <Typography sx={{ mt: 0.8 }}>{info.useCase}</Typography>
                </Paper>
            }
            output={<Alert severity="info" variant="outlined">{info.outcome}</Alert>}
            code={
                <pre>
{`${info.snippet}
// ...module-specific methods here`}
                </pre>
            }
        />
    );
}
