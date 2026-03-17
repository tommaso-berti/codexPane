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

const FAMILIES = {
    repo: {
        label: "Repository",
        template: "gh repo view {repo} {flags}",
        response: "Opens or prints repository details."
    },
    issue: {
        label: "Issue",
        template: "gh issue view {id} --repo {repo} {flags}",
        response: "Shows issue metadata and thread."
    },
    pr: {
        label: "Pull request",
        template: "gh pr view {id} --repo {repo} {flags}",
        response: "Shows PR checks, reviews, and merge status."
    }
};

function renderCommand(template, values) {
    return template
        .replace("{repo}", values.repo || "owner/name")
        .replace("{id}", values.id || "123")
        .replace("{flags}", values.flags || "")
        .replace(/\s+/g, " ")
        .trim();
}

export default function GhCommandBuilderPlayground() {
    const [family, setFamily] = useState("pr");
    const [repo, setRepo] = useState("owner/sample-repo");
    const [id, setId] = useState("456");
    const [flags, setFlags] = useState("--web");
    const [applied, setApplied] = useState("");

    const previewCommand = useMemo(() => {
        return renderCommand(FAMILIES[family].template, { repo, id, flags });
    }, [family, flags, id, repo]);

    const output = applied || "Run to generate command output.";

    return (
        <PlaygroundShell
            title="GH Command Builder Playground"
            goal="Build the right gh command for repos, issues, and pull requests from a few inputs."
            status={{ color: applied ? "success" : "info", label: applied ? "Command generated" : "Draft mode" }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 640 }}>
                    <FormControl size="small">
                        <InputLabel id="gh-family-label">Command family</InputLabel>
                        <Select
                            labelId="gh-family-label"
                            label="Command family"
                            value={family}
                            onChange={(event) => setFamily(event.target.value)}
                        >
                            {Object.entries(FAMILIES).map(([key, value]) => (
                                <MenuItem key={key} value={key}>{value.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField size="small" label="Repository (owner/name)" value={repo} onChange={(event) => setRepo(event.target.value)} />
                    <TextField
                        size="small"
                        label="Issue/PR number"
                        value={id}
                        onChange={(event) => setId(event.target.value)}
                        disabled={family === "repo"}
                    />
                    <TextField size="small" label="Extra flags" value={flags} onChange={(event) => setFlags(event.target.value)} placeholder="--web" />

                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" onClick={() => setApplied(previewCommand)}>Run</Button>
                        <Button variant="outlined" onClick={() => setApplied("")}>Reset</Button>
                    </Stack>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.4, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Generated command</Typography>
                    <Typography variant="body2" sx={{ mt: 1, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                        $ {previewCommand}
                    </Typography>
                </Paper>
            }
            output={
                <Alert severity={applied ? "success" : "info"} variant="outlined">
                    {output === "Run to generate command output." ? output : output + " -> " + FAMILIES[family].response}
                </Alert>
            }
            note="Choose the command family first, then fill repository and target id to avoid wrong-context CLI calls."
        />
    );
}
