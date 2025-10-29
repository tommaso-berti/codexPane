import React, { useMemo, useState } from "react";
import { Box, Card, CardContent, Typography, ToggleButtonGroup, ToggleButton, Divider } from "@mui/material";

const REQUEST_10 = `GET /img/logo.png HTTP/1.0
Host: example.com
Connection: close`;

const REQUEST_11 = `GET /img/logo.png HTTP/1.1
Host: example.com
Connection: keep-alive`;

const RESPONSE_OK = `HTTP/1.1 200 OK
Content-Type: image/png
Content-Length: 1024`;

export default function Httpdemo() {
    const [version, setVersion] = useState("1.1");
    const [resources, setResources] = useState(3);

    const handshakes = useMemo(() => {
        // naive model: 1.0 needs one TCP handshake per resource, 1.1 needs one
        return version === "1.0" ? resources : 1;
    }, [version, resources]);

    return (
        <Box sx={{ display: "grid", gap: 2 }}>
            <Typography variant="h6">HTTP versions and connection reuse</Typography>

            <ToggleButtonGroup
                value={version}
                exclusive
                onChange={(_, v) => v && setVersion(v)}
                size="small"
            >
                <ToggleButton value="1.0">HTTP/1.0</ToggleButton>
                <ToggleButton value="1.1">HTTP/1.1</ToggleButton>
            </ToggleButtonGroup>

            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                <Card variant="outlined" sx={{ borderRadius: 3 }}>
                    <CardContent>
                        <Typography variant="subtitle1" gutterBottom>Request example</Typography>
                        <Box component="pre" sx={{ m: 0, p: 1.5, bgcolor: "#0b1020", color: "#e6e6e6", borderRadius: 2, fontSize: 14 }}>
                            {version === "1.0" ? REQUEST_10 : REQUEST_11}
                        </Box>
                    </CardContent>
                </Card>

                <Card variant="outlined" sx={{ borderRadius: 3 }}>
                    <CardContent>
                        <Typography variant="subtitle1" gutterBottom>Response example</Typography>
                        <Box component="pre" sx={{ m: 0, p: 1.5, bgcolor: "#0b1020", color: "#e6e6e6", borderRadius: 2, fontSize: 14 }}>
                            {RESPONSE_OK}
                        </Box>
                    </CardContent>
                </Card>
            </Box>

            <Divider />

            <Box sx={{ display: "grid", gridTemplateColumns: "auto 1fr", alignItems: "center", gap: 2 }}>
                <Typography variant="body2">Resources on page:</Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                    {[1,2,3,4,5].map(n => (
                        <ToggleButton key={n} value={n} selected={resources === n} onChange={() => setResources(n)} size="small">
                            {n}
                        </ToggleButton>
                    ))}
                </Box>
            </Box>

            <Card variant="outlined" sx={{ borderRadius: 3 }}>
                <CardContent>
                    <Typography variant="subtitle1" gutterBottom>Estimated TCP handshakes</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>{handshakes}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        HTTP/{version} {version === "1.0" ? "opens a new connection per resource" : "reuses a persistent connection (keep-alive) for multiple resources"}.
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}