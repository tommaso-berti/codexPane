import { useMemo, useState } from "react";
import {
    Alert,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    Typography
} from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const DIRECTORIES = new Set([
    "/",
    "/workspace",
    "/workspace/projects",
    "/workspace/projects/docs",
    "/workspace/projects/docs/guides",
    "/workspace/projects/archive",
    "/home",
    "/home/student"
]);

const START_PATHS = [
    "/workspace/projects/docs",
    "/workspace/projects",
    "/home/student"
];

const COMMANDS = [
    { label: "cd ..", value: ".." },
    { label: "cd ../..", value: "../.." },
    { label: "cd projects/docs", value: "projects/docs" },
    { label: "cd guides", value: "guides" },
    { label: "cd .", value: "." }
];

function normalize(path) {
    const parts = path.split("/").filter(Boolean);
    const out = [];
    for (const part of parts) {
        if (part === ".") continue;
        if (part === "..") {
            out.pop();
            continue;
        }
        out.push(part);
    }
    return `/${out.join("/")}`.replace(/\/+/g, "/") || "/";
}

function resolveCd(base, input) {
    if (input.startsWith("/")) return normalize(input);
    return normalize(`${base}/${input}`);
}

export default function NavigationPlayground() {
    const [startPath, setStartPath] = useState(START_PATHS[0]);
    const [command, setCommand] = useState(COMMANDS[0].value);

    const result = useMemo(() => {
        const target = resolveCd(startPath, command);
        const exists = DIRECTORIES.has(target);
        return {
            target,
            exists,
            message: exists
                ? `Directory exists. You moved to ${target}`
                : `Directory not found: ${target}`
        };
    }, [startPath, command]);

    return (
        <PlaygroundShell
            title="Navigation Playground"
            goal="Understand how relative cd paths change the current working directory."
            status={result.exists ? { color: "success", label: "Valid path" } : { color: "warning", label: "Path not found" }}
            controls={
                <Stack spacing={1.4} sx={{ maxWidth: 460 }}>
                    <FormControl size="small">
                        <InputLabel id="start-path-label">Start directory</InputLabel>
                        <Select
                            labelId="start-path-label"
                            label="Start directory"
                            value={startPath}
                            onChange={(event) => setStartPath(event.target.value)}
                        >
                            {START_PATHS.map((path) => (
                                <MenuItem key={path} value={path}>{path}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl size="small">
                        <InputLabel id="command-label">Command</InputLabel>
                        <Select
                            labelId="command-label"
                            label="Command"
                            value={command}
                            onChange={(event) => setCommand(event.target.value)}
                        >
                            {COMMANDS.map((item) => (
                                <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                    <Typography variant="body2" sx={{ mb: 0.9, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                        $ pwd
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1.1, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                        {startPath}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 0.9, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                        $ cd {command}
                    </Typography>
                    <Typography variant="body2" sx={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                        $ pwd
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.4, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                        {result.target}
                    </Typography>
                </Paper>
            }
            output={<Alert severity={result.exists ? "success" : "warning"} variant="outlined">{result.message}</Alert>}
            note="Relative paths are resolved from the current directory. `cd .` keeps you in place, while `..` moves upward."
        />
    );
}
