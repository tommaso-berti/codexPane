import { useMemo, useState } from "react";
import { Alert, Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

function triadToOctal(bits) {
    return (bits.r ? 4 : 0) + (bits.w ? 2 : 0) + (bits.x ? 1 : 0);
}

function octalToTriad(n) {
    return { r: Boolean(n & 4), w: Boolean(n & 2), x: Boolean(n & 1) };
}

const INITIAL = {
    user: { r: true, w: true, x: false },
    group: { r: true, w: false, x: false },
    other: { r: true, w: false, x: false }
};

export default function ChmodPlayground() {
    const [draft, setDraft] = useState("644");
    const [mode, setMode] = useState(INITIAL);
    const [message, setMessage] = useState("Set mode with octal digits and apply.");

    const octal = useMemo(() => {
        return `${triadToOctal(mode.user)}${triadToOctal(mode.group)}${triadToOctal(mode.other)}`;
    }, [mode]);

    const symbolic = useMemo(() => {
        const toStr = (who) => {
            const t = mode[who];
            return `${t.r ? "r" : "-"}${t.w ? "w" : "-"}${t.x ? "x" : "-"}`;
        };
        return `${toStr("user")}${toStr("group")}${toStr("other")}`;
    }, [mode]);

    const applyOctal = () => {
        const clean = draft.replace(/[^\d]/g, "").slice(-3).padStart(3, "0");
        const digits = clean.split("").map((n) => Number(n));
        if (digits.some((n) => Number.isNaN(n) || n < 0 || n > 7)) {
            setMessage("Invalid mode: use only digits 0-7.");
            return;
        }
        setMode({
            user: octalToTriad(digits[0]),
            group: octalToTriad(digits[1]),
            other: octalToTriad(digits[2])
        });
        setMessage(`Applied mode ${clean}.`);
    };

    const reset = () => {
        setDraft("644");
        setMode(INITIAL);
        setMessage("Reset to default mode 644.");
    };

    return (
        <PlaygroundShell
            title="chmod Converter Playground"
            goal="Translate octal permissions into symbolic flags used in Linux commands."
            status={{ color: "info", label: `mode ${octal}` }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 520 }}>
                    <TextField
                        size="small"
                        label="Octal mode"
                        value={draft}
                        onChange={(event) => setDraft(event.target.value)}
                        helperText="Use 3 digits, e.g. 644 or 755"
                    />
                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" onClick={applyOctal}>Apply</Button>
                        <Button variant="outlined" onClick={reset}>Reset</Button>
                    </Stack>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.2, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Current permission</Typography>
                    <Typography variant="body2" sx={{ mt: 0.8, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                        {`${octal} (${symbolic})`}
                    </Typography>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    <Alert severity="info" variant="outlined">{message}</Alert>
                    <Box
                        sx={{
                            p: 1.2,
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 2,
                            bgcolor: "background.paper"
                        }}
                    >
                        <Typography variant="caption" color="text.secondary">Command preview</Typography>
                        <Typography sx={{ mt: 0.8, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                            chmod {octal} /path/to/file
                        </Typography>
                    </Box>
                </Stack>
            }
            code={
                <pre>
{`const user = (r ? 4 : 0) + (w ? 2 : 0) + (x ? 1 : 0);
const group = ...;
const other = ...;
const mode = \`\${user}\${group}\${other}\`;`}
                </pre>
            }
            note="Use 600 for private keys and 755 for executable scripts/directories when appropriate."
        />
    );
}
