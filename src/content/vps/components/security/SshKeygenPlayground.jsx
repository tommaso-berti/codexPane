import { useMemo, useState } from "react";
import { Alert, Button, FormControl, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const INITIAL = {
    algo: "ed25519",
    bits: 4096,
    format: "PEM",
    filename: "my_vps_key",
    comment: "vps-access"
};

export default function SshKeygenPlayground() {
    const [draft, setDraft] = useState(INITIAL);
    const [active, setActive] = useState(INITIAL);

    const command = useMemo(() => {
        const parts = ["ssh-keygen", "-t", active.algo];
        if (active.algo === "rsa") parts.push("-b", String(active.bits), "-m", active.format);
        parts.push("-C", active.comment, "-f", active.filename);
        return parts.join(" ");
    }, [active]);

    const apply = () => setActive(draft);
    const reset = () => {
        setDraft(INITIAL);
        setActive(INITIAL);
    };

    return (
        <PlaygroundShell
            title="SSH Keygen Builder"
            goal="Build a safe ssh-keygen command and understand option impact."
            status={{ color: active.algo === "ed25519" ? "success" : "info", label: active.algo }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 680 }}>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2}>
                        <FormControl size="small" fullWidth>
                            <InputLabel id="ssh-algo">Algorithm</InputLabel>
                            <Select
                                labelId="ssh-algo"
                                label="Algorithm"
                                value={draft.algo}
                                onChange={(event) => setDraft((prev) => ({ ...prev, algo: event.target.value }))}
                            >
                                <MenuItem value="ed25519">ed25519</MenuItem>
                                <MenuItem value="rsa">rsa</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl size="small" fullWidth disabled={draft.algo !== "rsa"}>
                            <InputLabel id="ssh-bits">Bits</InputLabel>
                            <Select
                                labelId="ssh-bits"
                                label="Bits"
                                value={draft.bits}
                                onChange={(event) => setDraft((prev) => ({ ...prev, bits: Number(event.target.value) }))}
                            >
                                <MenuItem value={2048}>2048</MenuItem>
                                <MenuItem value={3072}>3072</MenuItem>
                                <MenuItem value={4096}>4096</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2}>
                        <TextField
                            size="small"
                            fullWidth
                            label="Filename"
                            value={draft.filename}
                            onChange={(event) => setDraft((prev) => ({ ...prev, filename: event.target.value }))}
                        />
                        <TextField
                            size="small"
                            fullWidth
                            label="Comment"
                            value={draft.comment}
                            onChange={(event) => setDraft((prev) => ({ ...prev, comment: event.target.value }))}
                        />
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" onClick={apply}>Apply</Button>
                        <Button variant="outlined" onClick={reset}>Reset</Button>
                    </Stack>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.2, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Generated command</Typography>
                    <Typography component="pre" variant="body2" sx={{ mt: 0.8, mb: 0, whiteSpace: "pre-wrap", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                        {command}
                    </Typography>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    <Alert severity="info" variant="outlined">
                        Preferred default: `ed25519` for modern servers; use RSA only for legacy compatibility.
                    </Alert>
                    <Alert severity="warning" variant="outlined">
                        Protect private key permissions: <code>chmod 600 {active.filename}</code>
                    </Alert>
                </Stack>
            }
            code={
                <pre>
{`const parts = ["ssh-keygen", "-t", algo];
if (algo === "rsa") parts.push("-b", bits, "-m", format);
parts.push("-C", comment, "-f", filename);`}
                </pre>
            }
            note="Apply changes before copying into your terminal runbook."
        />
    );
}
