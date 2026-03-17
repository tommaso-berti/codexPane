import { useMemo, useState } from "react";
import {
    Alert,
    Box,
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
import { alpha } from "@mui/material/styles";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const REQUEST_BY_VERSION = {
    "1.0": `GET /img/logo.png HTTP/1.0\nHost: example.com\nConnection: close`,
    "1.1": `GET /img/logo.png HTTP/1.1\nHost: example.com\nConnection: keep-alive`
};

export default function Httpdemo() {
    const [version, setVersion] = useState("1.1");
    const [resources, setResources] = useState(4);
    const [useTls, setUseTls] = useState(true);

    const result = useMemo(() => {
        const tcpHandshakes = version === "1.0" ? resources : 1;
        const tlsHandshakes = useTls ? tcpHandshakes : 0;
        const estimatedSetupCost = tcpHandshakes + tlsHandshakes;

        return {
            tcpHandshakes,
            tlsHandshakes,
            estimatedSetupCost,
            interpretation:
                version === "1.0"
                    ? "HTTP/1.0 opens one connection per resource, so setup cost grows with each file."
                    : "HTTP/1.1 can reuse one persistent connection across multiple resources."
        };
    }, [resources, useTls, version]);

    const checks = [
        {
            ok: result.tcpHandshakes === 1,
            text: "Connection reuse is active (single TCP setup)."
        },
        {
            ok: !useTls || result.tlsHandshakes >= 1,
            text: useTls ? "TLS adds security handshakes on top of TCP." : "No TLS overhead in this simulation."
        }
    ];

    const passed = checks.filter((item) => item.ok).length;

    return (
        <PlaygroundShell
            title="HTTP Connection Reuse Playground"
            goal="See how HTTP version and page resource count change connection setup cost."
            status={{
                color: result.tcpHandshakes === 1 ? "success" : "warning",
                label: passed + "/" + checks.length + " checks pass"
            }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 620 }}>
                    <FormControl size="small">
                        <InputLabel id="http-version-label">HTTP version</InputLabel>
                        <Select
                            labelId="http-version-label"
                            label="HTTP version"
                            value={version}
                            onChange={(event) => setVersion(event.target.value)}
                        >
                            <MenuItem value="1.0">HTTP/1.0</MenuItem>
                            <MenuItem value="1.1">HTTP/1.1</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl size="small">
                        <InputLabel id="resources-label">Resources on page</InputLabel>
                        <Select
                            labelId="resources-label"
                            label="Resources on page"
                            value={resources}
                            onChange={(event) => setResources(Number(event.target.value))}
                        >
                            {[1, 2, 3, 4, 5, 6].map((value) => (
                                <MenuItem key={value} value={value}>{value}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControlLabel
                        control={<Switch checked={useTls} onChange={(event) => setUseTls(event.target.checked)} />}
                        label="Simulate HTTPS (TLS handshake)"
                    />
                </Stack>
            }
            preview={
                <Stack spacing={1.1}>
                    <Paper
                        variant="outlined"
                        sx={(theme) => ({
                            p: 1.3,
                            borderRadius: 2,
                            bgcolor: theme.palette.mode === "dark"
                                ? alpha(theme.palette.common.white, 0.04)
                                : alpha(theme.palette.common.black, 0.02)
                        })}
                    >
                        <Typography variant="caption" color="text.secondary">Request preview</Typography>
                        <Box
                            component="pre"
                            sx={{
                                m: "8px 0 0",
                                whiteSpace: "pre-wrap",
                                fontSize: 12,
                                lineHeight: 1.5,
                                color: "text.primary"
                            }}
                        >
                            {REQUEST_BY_VERSION[version]}
                        </Box>
                    </Paper>
                    <Alert severity="info" variant="outlined">
                        {result.interpretation}
                    </Alert>
                </Stack>
            }
            output={
                <Stack spacing={1}>
                    <Alert severity={result.tcpHandshakes === 1 ? "success" : "warning"} variant="outlined">
                        TCP handshakes: {result.tcpHandshakes}
                    </Alert>
                    <Alert severity={useTls ? "info" : "success"} variant="outlined">
                        TLS handshakes: {result.tlsHandshakes}
                    </Alert>
                    <Alert severity="info" variant="outlined">
                        Estimated setup cost (TCP + TLS): {result.estimatedSetupCost}
                    </Alert>
                </Stack>
            }
            note="Connection reuse matters most when a page loads multiple files. HTTP/1.1 usually lowers setup overhead versus HTTP/1.0."
        />
    );
}
