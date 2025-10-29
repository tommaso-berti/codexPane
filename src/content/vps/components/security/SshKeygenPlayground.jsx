import { useMemo, useState } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function SshKeygenPlayground() {
    const [algo, setAlgo] = useState("rsa");
    const [bits, setBits] = useState(4096);
    const [format, setFormat] = useState("PEM");
    const [filename, setFilename] = useState("my_vps_key.pem");
    const [comment, setComment] = useState("vps-access");

    const command = useMemo(() => {
        const parts = ["ssh-keygen", "-t", algo];
        if (algo === "rsa") parts.push("-b", String(bits), "-m", format);
        parts.push("-C", comment, "-f", filename);
        return parts.join(" ");
    }, [algo, bits, format, filename, comment]);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(command);
        } catch {}
    };

    return (
        <Box sx={{ p: 2, border: "1px solid #e0e0e0", borderRadius: 4, bgcolor: "#fafafa" }}>
            <Typography variant="h6" sx={{ mb: 2 }}>SSH Keygen Builder</Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 2 }}>
                <FormControl fullWidth>
                    <InputLabel id="algo">Algorithm</InputLabel>
                    <Select labelId="algo" label="Algorithm" value={algo} onChange={(e)=>setAlgo(e.target.value)}>
                        <MenuItem value="rsa">rsa</MenuItem>
                        <MenuItem value="ed25519">ed25519</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth disabled={algo !== "rsa"}>
                    <InputLabel id="bits">Bits</InputLabel>
                    <Select labelId="bits" label="Bits" value={bits} onChange={(e)=>setBits(Number(e.target.value))}>
                        <MenuItem value={2048}>2048</MenuItem>
                        <MenuItem value={3072}>3072</MenuItem>
                        <MenuItem value={4096}>4096</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth disabled={algo !== "rsa"}>
                    <InputLabel id="format">Format</InputLabel>
                    <Select labelId="format" label="Format" value={format} onChange={(e)=>setFormat(e.target.value)}>
                        <MenuItem value="PEM">PEM</MenuItem>
                        <MenuItem value="RFC4716">RFC4716</MenuItem>
                    </Select>
                </FormControl>
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 2 }}>
                <TextField fullWidth label="Filename" value={filename} onChange={(e)=>setFilename(e.target.value)} />
                <TextField fullWidth label="Comment" value={comment} onChange={(e)=>setComment(e.target.value)} />
            </Stack>

            <Box sx={{ p: 2, bgcolor: "#111", color: "#e0e0e0", borderRadius: 2, fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography component="code" sx={{ whiteSpace: "nowrap", overflowX: "auto", pr: 2 }}>
                    {command}
                </Typography>
                <Button size="small" variant="contained" onClick={copy} startIcon={<ContentCopyIcon />}>Copy</Button>
            </Box>

            <Typography variant="body2" sx={{ mt: 2 }}>
                For RSA, prefer 4096 bits and ensure your private key file has restrictive permissions (e.g., <code>chmod 400</code>).
                For new environments, ed25519 is a strong default unless legacy systems require RSA.
            </Typography>
        </Box>
    );
}