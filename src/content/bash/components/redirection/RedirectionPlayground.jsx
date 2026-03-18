import { useMemo, useState } from "react";
import {
    Alert,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    Switch,
    Typography
} from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const FILES = {
    "hello.txt": "Start\n",
    "forests.txt": "Taiga\nTropical\nBoreal\n",
    "volcanoes.txt": "Etna\nVesuvius\nKilauea\n",
    "glaciers.txt": "Zeta\nAlpha\nDelta\n"
};

const PRESETS = [
    { key: "echo", label: "echo to file", action: "write" },
    { key: "cat_append", label: "cat file to file", action: "write" },
    { key: "pipe_wc", label: "pipe into wc", action: "stdout" },
    { key: "sort_redirect", label: "sort and redirect", action: "write" }
];

function wc(text) {
    const lines = text.trimEnd() ? text.trimEnd().split("\n").length : 0;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const bytes = new TextEncoder().encode(text).length;
    return `${lines} ${words} ${bytes}`;
}

function simulate(presetKey, appendMode) {
    const op = appendMode ? ">>" : ">";
    const stderr = "";

    if (presetKey === "echo") {
        const incoming = "Hello\n";
        const nextFile = appendMode ? FILES["hello.txt"] + incoming : incoming;
        return {
            command: `echo "Hello" ${op} hello.txt`,
            stdout: "",
            stderr,
            fileName: "hello.txt",
            fileContent: nextFile,
            explanation: appendMode ? "Appended stdout to hello.txt" : "Overwrote hello.txt with stdout"
        };
    }

    if (presetKey === "cat_append") {
        const incoming = FILES["forests.txt"];
        const nextFile = appendMode ? FILES["hello.txt"] + incoming : incoming;
        return {
            command: `cat forests.txt ${op} hello.txt`,
            stdout: "",
            stderr,
            fileName: "hello.txt",
            fileContent: nextFile,
            explanation: appendMode ? "Appended forests.txt content into hello.txt" : "Overwrote hello.txt with forests.txt"
        };
    }

    if (presetKey === "pipe_wc") {
        const out = wc(FILES["volcanoes.txt"]);
        return {
            command: "cat volcanoes.txt | wc",
            stdout: `${out}\n`,
            stderr,
            fileName: null,
            fileContent: null,
            explanation: "stdout from cat became stdin for wc"
        };
    }

    const sorted = FILES["glaciers.txt"].trimEnd().split("\n").sort((a, b) => a.localeCompare(b)).join("\n") + "\n";
    const current = "(empty)\n";
    return {
        command: `cat glaciers.txt | sort ${op} sorted-glaciers.txt`,
        stdout: "",
        stderr,
        fileName: "sorted-glaciers.txt",
        fileContent: appendMode ? current + sorted : sorted,
        explanation: appendMode ? "Sorted output appended to target file" : "Sorted output replaced target file"
    };
}

export default function RedirectionPlayground() {
    const [preset, setPreset] = useState(PRESETS[0].key);
    const [appendMode, setAppendMode] = useState(false);

    const simulation = useMemo(() => simulate(preset, appendMode), [preset, appendMode]);

    return (
        <PlaygroundShell
            title="Redirection Playground"
            goal="Observe how pipes and redirects move data between stdout, stdin, and files."
            controls={
                <Stack spacing={1.4} sx={{ maxWidth: 500 }}>
                    <FormControl size="small">
                        <InputLabel id="pipeline-label">Pipeline preset</InputLabel>
                        <Select
                            labelId="pipeline-label"
                            label="Pipeline preset"
                            value={preset}
                            onChange={(event) => setPreset(event.target.value)}
                        >
                            {PRESETS.map((item) => (
                                <MenuItem key={item.key} value={item.key}>{item.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControlLabel
                        control={<Switch checked={appendMode} onChange={(event) => setAppendMode(event.target.checked)} />}
                        label="Use append mode (>> instead of > when writing files)"
                        disabled={PRESETS.find((item) => item.key === preset)?.action !== "write"}
                    />
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                    <Typography variant="body2" sx={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", mb: 0.8 }}>
                        $ {simulation.command}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">Data flow</Typography>
                    <Typography variant="body2" sx={{ mt: 0.4 }}>
                        {simulation.explanation}
                    </Typography>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    <Alert severity="info" variant="outlined">
                        stdout: {simulation.stdout ? "produced" : "(empty)"} | stderr: {simulation.stderr || "(empty)"}
                    </Alert>
                    {simulation.stdout ? (
                        <Paper variant="outlined" sx={{ p: 1.25, borderRadius: 1.6 }}>
                            <Typography variant="caption" color="text.secondary">stdout</Typography>
                            <pre style={{ margin: "6px 0 0", fontSize: 12, lineHeight: 1.4 }}>{simulation.stdout}</pre>
                        </Paper>
                    ) : null}
                    {simulation.fileName ? (
                        <Paper variant="outlined" sx={{ p: 1.25, borderRadius: 1.6 }}>
                            <Typography variant="caption" color="text.secondary">{simulation.fileName}</Typography>
                            <pre style={{ margin: "6px 0 0", fontSize: 12, lineHeight: 1.4 }}>{simulation.fileContent}</pre>
                        </Paper>
                    ) : null}
                </Stack>
            }
            code={
                <pre>{`$ ${simulation.command}

stdout:
${simulation.stdout || "(empty)"}

${simulation.fileName ? `${simulation.fileName}:\n${simulation.fileContent}` : "no file write"}`}</pre>
            }
            note="Use `>` to overwrite and `>>` to append. Pipes (`|`) connect stdout from one command to stdin of the next."
        />
    );
}
