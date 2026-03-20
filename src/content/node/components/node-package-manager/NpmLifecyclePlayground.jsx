import { useMemo, useState } from "react";
import { Alert, Button, FormControl, InputLabel, MenuItem, Paper, Select, Stack, Typography } from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

export default function NpmLifecyclePlayground() {
    const [draftAction, setDraftAction] = useState("install");
    const [draftScope, setDraftScope] = useState("dependency");
    const [state, setState] = useState({ action: "install", scope: "dependency", note: "No command generated yet." });

    const command = useMemo(() => {
        const pkg = "example-lib";
        if (state.action === "install" && state.scope === "dependency") return `npm install ${pkg}`;
        if (state.action === "install" && state.scope === "dev") return `npm install -D ${pkg}`;
        if (state.action === "update") return `npm update ${pkg}`;
        if (state.action === "remove") return `npm uninstall ${pkg}`;
        return "npm install";
    }, [state]);

    const apply = () => {
        const note =
            draftAction === "remove"
                ? "package removed from node_modules and package.json."
                : draftScope === "dev"
                    ? "package goes into devDependencies."
                    : "package goes into dependencies.";
        setState({ action: draftAction, scope: draftScope, note });
    };

    const reset = () => {
        setDraftAction("install");
        setDraftScope("dependency");
        setState({ action: "install", scope: "dependency", note: "Reset to default install flow." });
    };

    return (
        <PlaygroundShell
            title="npm Lifecycle Commands"
            goal="Map install/update/remove actions to dependency sections and lockfile impact."
            status={{ color: "info", label: state.action }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 620 }}>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2}>
                        <FormControl size="small" fullWidth>
                            <InputLabel id="npm-action">Action</InputLabel>
                            <Select
                                labelId="npm-action"
                                label="Action"
                                value={draftAction}
                                onChange={(event) => setDraftAction(event.target.value)}
                            >
                                <MenuItem value="install">Install</MenuItem>
                                <MenuItem value="update">Update</MenuItem>
                                <MenuItem value="remove">Remove</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl size="small" fullWidth disabled={draftAction !== "install"}>
                            <InputLabel id="npm-scope">Scope</InputLabel>
                            <Select
                                labelId="npm-scope"
                                label="Scope"
                                value={draftScope}
                                onChange={(event) => setDraftScope(event.target.value)}
                            >
                                <MenuItem value="dependency">dependency</MenuItem>
                                <MenuItem value="dev">devDependency</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" onClick={apply}>Apply</Button>
                        <Button variant="outlined" onClick={reset}>Reset</Button>
                    </Stack>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.2, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Command preview</Typography>
                    <Typography sx={{ mt: 0.8, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                        {command}
                    </Typography>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    <Alert severity="info" variant="outlined">{state.note}</Alert>
                    <Alert severity="success" variant="outlined">
                        package-lock.json updates on install/update/remove to keep dependency tree reproducible.
                    </Alert>
                </Stack>
            }
            code={
                <pre>
{`// install as production dependency
npm install package
// install as dev dependency
npm install -D package`}
                </pre>
            }
        />
    );
}
