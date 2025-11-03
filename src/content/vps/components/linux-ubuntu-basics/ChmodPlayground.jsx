import React, { useMemo, useState } from "react";
import { Box, Card, CardContent, CardHeader, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";

const triads = ["user", "group", "other"];
const flags = ["r", "w", "x"];

function triadToOctal(bits) {
    // bits: {r:boolean,w:boolean,x:boolean}
    return (bits.r ? 4 : 0) + (bits.w ? 2 : 0) + (bits.x ? 1 : 0);
}
function octalToTriad(n) {
    return {
        r: !!(n & 4),
        w: !!(n & 2),
        x: !!(n & 1),
    };
}

export default function ChmodPlayground() {
    const [modeSym, setModeSym] = useState({
        user: { r: true, w: true, x: false },
        group: { r: true, w: false, x: false },
        other: { r: true, w: false, x: false },
    });
    const [special, setSpecial] = useState({ setuid: false, setgid: false, sticky: false });

    const octal = useMemo(() => {
        const u = triadToOctal(modeSym.user);
        const g = triadToOctal(modeSym.group);
        const o = triadToOctal(modeSym.other);
        const s = (special.setuid ? 4 : 0) + (special.setgid ? 2 : 0) + (special.sticky ? 1 : 0);
        return `${s}${u}${g}${o}`;
    }, [modeSym, special]);

    const symbolic = useMemo(() => {
        const sbit = (who, x) => {
            if (who === "user" && special.setuid) return x ? "s" : "S";
            if (who === "group" && special.setgid) return x ? "s" : "S";
            if (who === "other" && special.sticky) return x ? "t" : "T";
            return x ? "x" : "-";
        };
        const toStr = who => {
            const t = modeSym[who];
            return `${t.r ? "r" : "-"}${t.w ? "w" : "-"}${sbit(who, t.x)}`;
        };
        return `u=${toStr("user")},g=${toStr("group")},o=${toStr("other")}`;
    }, [modeSym, special]);

    const handleToggle = (who, flag) => {
        setModeSym(prev => ({
            ...prev,
            [who]: { ...prev[who], [flag]: !prev[who][flag] },
        }));
    };

    const handleOctalInput = (value) => {
        const clean = value.replace(/[^\d]/g, "").slice(0, 4);
        if (clean.length === 0) return;
        const pad = clean.padStart(4, "0");
        const [s, u, g, o] = pad.split("").map(d => parseInt(d, 10));
        if ([s, u, g, o].some(n => isNaN(n) || n < 0 || n > 7)) return;

        setSpecial({ setuid: !!(s & 4), setgid: !!(s & 2), sticky: !!(s & 1) });
        setModeSym({
            user: octalToTriad(u),
            group: octalToTriad(g),
            other: octalToTriad(o),
        });
    };

    return (
        <Box sx={{ p: 2 }}>
            <Card sx={{ borderRadius: "16px", boxShadow: 2 }}>
                <CardHeader title="chmod converter" subheader="Toggle permissions or type an octal to see equivalents" />
                <CardContent>
                    <Stack spacing={2}>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <TextField
                                label="octal"
                                value={octal}
                                onChange={(e) => handleOctalInput(e.target.value)}
                                inputProps={{ inputMode: "numeric" }}
                            />
                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                symbolic: <code>{symbolic}</code>
                            </Typography>
                        </Stack>

                        <Stack direction="row" spacing={3}>
                            {triads.map(who => (
                                <Card key={who} sx={{ p: 1, borderRadius: "12px", flex: 1, background: "#fafafa" }}>
                                    <CardHeader title={who} />
                                    <CardContent>
                                        <Stack direction="row" spacing={1}>
                                            {flags.map(f => {
                                                const active = modeSym[who][f];
                                                return (
                                                    <Box
                                                        key={f}
                                                        onClick={() => handleToggle(who, f)}
                                                        sx={{
                                                            cursor: "pointer",
                                                            px: 2, py: 1,
                                                            borderRadius: "10px",
                                                            bgcolor: active ? "primary.main" : "grey.300",
                                                            color: active ? "primary.contrastText" : "text.primary",
                                                            textTransform: "uppercase",
                                                            fontWeight: 700,
                                                        }}
                                                    >
                                                        {f}
                                                    </Box>
                                                );
                                            })}
                                        </Stack>
                                    </CardContent>
                                </Card>
                            ))}
                        </Stack>

                        <Stack direction="row" spacing={2}>
                            <FormControl size="small">
                                <InputLabel>setuid</InputLabel>
                                <Select
                                    variant="outlined"
                                    label="setuid"
                                    value={special.setuid ? 1 : 0}
                                    onChange={(e) => setSpecial(s => ({ ...s, setuid: Boolean(Number(e.target.value)) }))}
                                >
                                    <MenuItem value={0}>off</MenuItem>
                                    <MenuItem value={1}>on</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl size="small">
                                <InputLabel>setgid</InputLabel>
                                <Select
                                    variant="outlined"
                                    label="setgid"
                                    value={special.setgid ? 1 : 0}
                                    onChange={(e) => setSpecial(s => ({ ...s, setgid: Boolean(Number(e.target.value)) }))}
                                >
                                    <MenuItem value={0}>off</MenuItem>
                                    <MenuItem value={1}>on</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl size="small">
                                <InputLabel>sticky</InputLabel>
                                <Select
                                    variant="outlined"
                                    label="sticky"
                                    value={special.sticky ? 1 : 0}
                                    onChange={(e) => setSpecial(s => ({ ...s, sticky: Boolean(Number(e.target.value)) }))}
                                >
                                    <MenuItem value={0}>off</MenuItem>
                                    <MenuItem value={1}>on</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>

                        <Box sx={{ mt: 1 }}>
                            <Typography variant="body2">
                                Example usage: <code>chmod {octal} /path/to/file</code>
                            </Typography>
                        </Box>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}