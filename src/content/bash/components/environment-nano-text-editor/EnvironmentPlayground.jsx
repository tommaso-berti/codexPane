import { useMemo, useState } from "react";
import {
    Alert,
    Button,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const INITIAL_SESSION = {
    HOME: "/home/ccuser",
    USER: "ccuser",
    PATH: "/usr/local/bin:/usr/bin:/bin",
    aliases: {}
};

function renderAliases(aliases) {
    const keys = Object.keys(aliases).sort((a, b) => a.localeCompare(b));
    if (!keys.length) return "(none)";
    return keys.map((key) => `${key}='${aliases[key]}'`).join("\n");
}

export default function EnvironmentPlayground() {
    const [session, setSession] = useState(INITIAL_SESSION);
    const [userValue, setUserValue] = useState("jane");
    const [pathAddition, setPathAddition] = useState("/opt/tools/bin");
    const [aliasName, setAliasName] = useState("ll");
    const [aliasCommand, setAliasCommand] = useState("ls -al");
    const [message, setMessage] = useState({ severity: "info", text: "Apply export values or source the alias profile." });

    const commandResolution = useMemo(() => {
        const hasTools = session.PATH.split(":").includes("/opt/tools/bin");
        const aliasExists = Boolean(session.aliases[aliasName]);
        return {
            alias: aliasExists
                ? `${aliasName} resolves to: ${session.aliases[aliasName]}`
                : `${aliasName} is not available yet (run Source).`,
            node: hasTools
                ? "node lookup includes /opt/tools/bin in PATH"
                : "node lookup does not include /opt/tools/bin yet"
        };
    }, [session, aliasName]);

    const onApply = () => {
        setSession((prev) => {
            const pathParts = prev.PATH.split(":").filter(Boolean);
            const normalizedAddition = pathAddition.trim();
            const mergedPath = normalizedAddition && !pathParts.includes(normalizedAddition)
                ? `${normalizedAddition}:${prev.PATH}`
                : prev.PATH;
            return {
                ...prev,
                USER: userValue.trim() || prev.USER,
                PATH: mergedPath
            };
        });
        setMessage({ severity: "success", text: "Applied export values to current shell session." });
    };

    const onSource = () => {
        if (!aliasName.trim() || !aliasCommand.trim()) {
            setMessage({ severity: "warning", text: "Alias name and command are required before source." });
            return;
        }
        setSession((prev) => ({
            ...prev,
            aliases: {
                ...prev.aliases,
                [aliasName.trim()]: aliasCommand.trim()
            }
        }));
        setMessage({ severity: "success", text: "Simulated source: alias loaded into current shell." });
    };

    const onReset = () => {
        setSession(INITIAL_SESSION);
        setUserValue("jane");
        setPathAddition("/opt/tools/bin");
        setAliasName("ll");
        setAliasCommand("ls -al");
        setMessage({ severity: "info", text: "Session reset to defaults." });
    };

    return (
        <PlaygroundShell
            title="Environment Playground"
            goal="Understand how export, PATH updates, aliases, and source affect the active shell session."
            controls={
                <Stack spacing={1.4} sx={{ maxWidth: 520 }}>
                    <TextField
                        size="small"
                        label="Export USER"
                        value={userValue}
                        onChange={(event) => setUserValue(event.target.value)}
                    />
                    <TextField
                        size="small"
                        label="Add PATH entry"
                        value={pathAddition}
                        onChange={(event) => setPathAddition(event.target.value)}
                    />
                    <TextField
                        size="small"
                        label="Alias name"
                        value={aliasName}
                        onChange={(event) => setAliasName(event.target.value)}
                    />
                    <TextField
                        size="small"
                        label="Alias command"
                        value={aliasCommand}
                        onChange={(event) => setAliasCommand(event.target.value)}
                    />
                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" onClick={onApply}>Apply export</Button>
                        <Button variant="outlined" onClick={onSource}>Source profile</Button>
                        <Button variant="text" onClick={onReset}>Reset</Button>
                    </Stack>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Current session snapshot</Typography>
                    <pre style={{ margin: "8px 0 0", fontSize: 12, lineHeight: 1.45 }}>
{`HOME=${session.HOME}
USER=${session.USER}
PATH=${session.PATH}

ALIASES
${renderAliases(session.aliases)}`}
                    </pre>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    <Alert severity={message.severity} variant="outlined">{message.text}</Alert>
                    <Alert severity="info" variant="outlined">{commandResolution.alias}</Alert>
                    <Alert severity="info" variant="outlined">{commandResolution.node}</Alert>
                </Stack>
            }
            code={
                <pre>{`export USER="${session.USER}"
export PATH="${session.PATH}"
alias ${aliasName}="${session.aliases[aliasName] || aliasCommand}"
source ~/.bashrc

# active alias table
${renderAliases(session.aliases)}`}</pre>
            }
            note="`export` affects the current shell immediately. `source` applies profile content (such as aliases) to the current session."
        />
    );
}
