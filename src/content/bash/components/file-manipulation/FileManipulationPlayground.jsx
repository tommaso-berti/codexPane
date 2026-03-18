import { useMemo, useState } from "react";
import {
    Alert,
    Button,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    Switch,
    TextField,
    Typography
} from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const INITIAL_FS = {
    dirs: new Set(["/", "docs", "backup"]),
    files: new Set(["notes.txt", "docs/readme.txt", "docs/todo.txt"])
};

function clean(path) {
    return path.replace(/^\/+/, "").replace(/\/+$/, "").trim();
}

function parentDir(path) {
    const value = clean(path);
    if (!value.includes("/")) return "/";
    return value.split("/").slice(0, -1).join("/") || "/";
}

function basename(path) {
    const value = clean(path);
    if (!value) return "";
    return value.split("/").pop();
}

function hasDir(fs, dirPath) {
    return dirPath === "/" || fs.dirs.has(clean(dirPath));
}

function cloneFs(fs) {
    return { dirs: new Set(fs.dirs), files: new Set(fs.files) };
}

function renderTree(fs) {
    const dirs = Array.from(fs.dirs)
        .filter((d) => d !== "/")
        .sort((a, b) => a.localeCompare(b))
        .map((dir) => `${dir}/`);
    const files = Array.from(fs.files).sort((a, b) => a.localeCompare(b));
    return ["./", ...dirs, ...files].join("\n");
}

function applyOperation(fs, operation, sourceInput, targetInput, safeRm) {
    const source = clean(sourceInput);
    const target = clean(targetInput);
    const next = cloneFs(fs);

    if (operation === "cp") {
        if (!next.files.has(source)) {
            return { fs, severity: "error", message: `Source file not found: ${source || "(empty)"}` };
        }
        const destination = hasDir(next, target) ? `${target === "/" ? "" : target}/${basename(source)}` : target;
        if (!destination) return { fs, severity: "error", message: "Set a valid target path." };
        if (!hasDir(next, parentDir(destination))) {
            return { fs, severity: "error", message: `Target directory does not exist: ${parentDir(destination)}` };
        }
        next.files.add(clean(destination));
        return { fs: next, severity: "success", message: `Copied ${source} -> ${clean(destination)}` };
    }

    if (operation === "mv") {
        if (!next.files.has(source)) {
            return { fs, severity: "error", message: `Source file not found: ${source || "(empty)"}` };
        }
        const destination = hasDir(next, target) ? `${target === "/" ? "" : target}/${basename(source)}` : target;
        if (!destination) return { fs, severity: "error", message: "Set a valid target path." };
        if (!hasDir(next, parentDir(destination))) {
            return { fs, severity: "error", message: `Target directory does not exist: ${parentDir(destination)}` };
        }
        next.files.delete(source);
        next.files.add(clean(destination));
        return { fs: next, severity: "success", message: `Moved ${source} -> ${clean(destination)}` };
    }

    if (operation === "rm") {
        if (!next.files.has(source)) {
            return { fs, severity: "error", message: `File not found: ${source || "(empty)"}` };
        }
        next.files.delete(source);
        return {
            fs: next,
            severity: safeRm ? "warning" : "success",
            message: safeRm
                ? `Interactive remove simulated: confirm deletion of ${source} (accepted).`
                : `Deleted ${source}`
        };
    }

    if (operation === "mkdir") {
        if (!target) return { fs, severity: "error", message: "Set a directory path to create." };
        if (next.dirs.has(target)) {
            return { fs, severity: "warning", message: `Directory already exists: ${target}` };
        }
        const parent = parentDir(target);
        if (!hasDir(next, parent)) {
            return { fs, severity: "error", message: `Parent directory does not exist: ${parent}` };
        }
        next.dirs.add(target);
        return { fs: next, severity: "success", message: `Created directory: ${target}/` };
    }

    return { fs, severity: "info", message: "No operation selected." };
}

const ACTIONS = [
    { value: "cp", label: "cp (copy file)" },
    { value: "mv", label: "mv (move/rename file)" },
    { value: "rm", label: "rm (remove file)" },
    { value: "mkdir", label: "mkdir (create directory)" }
];

export default function FileManipulationPlayground() {
    const [fs, setFs] = useState(cloneFs(INITIAL_FS));
    const [action, setAction] = useState("cp");
    const [source, setSource] = useState("notes.txt");
    const [target, setTarget] = useState("backup");
    const [safeRm, setSafeRm] = useState(true);
    const [lastResult, setLastResult] = useState({ severity: "info", message: "Choose an operation and click Apply." });
    const [beforeTree, setBeforeTree] = useState(renderTree(INITIAL_FS));

    const commandPreview = useMemo(() => {
        if (action === "mkdir") return `mkdir ${target || "<dir>"}`;
        if (action === "rm") return `rm ${safeRm ? "-i " : ""}${source || "<file>"}`;
        return `${action} ${source || "<source>"} ${target || "<target>"}`;
    }, [action, source, target, safeRm]);

    const onApply = () => {
        setBeforeTree(renderTree(fs));
        const result = applyOperation(fs, action, source, target, safeRm);
        setFs(result.fs);
        setLastResult({ severity: result.severity, message: result.message });
    };

    const onReset = () => {
        setFs(cloneFs(INITIAL_FS));
        setSource("notes.txt");
        setTarget("backup");
        setAction("cp");
        setSafeRm(true);
        setBeforeTree(renderTree(INITIAL_FS));
        setLastResult({ severity: "info", message: "State reset to initial virtual filesystem." });
    };

    return (
        <PlaygroundShell
            title="File Manipulation Playground"
            goal="Compare how cp, mv, rm, and mkdir change a filesystem tree."
            controls={
                <Stack spacing={1.4} sx={{ maxWidth: 520 }}>
                    <FormControl size="small">
                        <InputLabel id="action-label">Operation</InputLabel>
                        <Select
                            labelId="action-label"
                            label="Operation"
                            value={action}
                            onChange={(event) => setAction(event.target.value)}
                        >
                            {ACTIONS.map((item) => (
                                <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {action !== "mkdir" ? (
                        <TextField
                            size="small"
                            label="Source path"
                            value={source}
                            onChange={(event) => setSource(event.target.value)}
                        />
                    ) : null}

                    <TextField
                        size="small"
                        label={action === "rm" ? "Target (optional)" : action === "mkdir" ? "Directory path" : "Target path"}
                        value={target}
                        onChange={(event) => setTarget(event.target.value)}
                        disabled={action === "rm"}
                    />

                    <FormControlLabel
                        control={<Switch checked={safeRm} onChange={(event) => setSafeRm(event.target.checked)} />}
                        label="Use -i safety mode for rm"
                        disabled={action !== "rm"}
                    />

                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" onClick={onApply}>Apply</Button>
                        <Button variant="outlined" onClick={onReset}>Reset</Button>
                    </Stack>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                    <Typography variant="body2" sx={{ mb: 0.7, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                        $ {commandPreview}
                    </Typography>
                    <Stack direction={{ xs: "column", md: "row" }} spacing={1.4}>
                        <Paper variant="outlined" sx={{ p: 1, borderRadius: 1.5, flex: 1 }}>
                            <Typography variant="caption" color="text.secondary">Before</Typography>
                            <pre style={{ margin: "6px 0 0", fontSize: 12, lineHeight: 1.4 }}>{beforeTree}</pre>
                        </Paper>
                        <Paper variant="outlined" sx={{ p: 1, borderRadius: 1.5, flex: 1 }}>
                            <Typography variant="caption" color="text.secondary">After</Typography>
                            <pre style={{ margin: "6px 0 0", fontSize: 12, lineHeight: 1.4 }}>{renderTree(fs)}</pre>
                        </Paper>
                    </Stack>
                </Paper>
            }
            output={<Alert severity={lastResult.severity} variant="outlined">{lastResult.message}</Alert>}
            code={
                <pre>{`# simulated command
${commandPreview}

# before tree
${beforeTree}

# after tree
${renderTree(fs)}`}</pre>
            }
            note="`rm` is destructive. Prefer `rm -i` when learning or when deleting uncertain paths."
        />
    );
}
