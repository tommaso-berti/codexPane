import * as React from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Switch, Typography, Paper } from "@mui/material";

export default function ScopePlayground() {
    const [kind, setKind] = React.useState("let");
    const [useBlock, setUseBlock] = React.useState(true);
    const [reassign, setReassign] = React.useState(true);
    const [output, setOutput] = React.useState("");

    const code = React.useMemo(() => {
        const decl = kind === "const" ? `const x = 1;` : `${kind} x = 1;`;
        const reassignLine = reassign ? `x = 2;` : `// no reassignment`;
        if (useBlock) {
            return `// ${kind} inside a block vs outside
${decl}
{
  ${kind} x = 99; // shadowing if let/const, redeclare if var
  console.log("inner x =", x);
}
${reassignLine}
console.log("outer x =", x);`;
        }
        return `// single scope with ${kind}
${decl}
${reassignLine}
console.log("x =", x);`;
    }, [kind, useBlock, reassign]);

    function run() {
        const logs = [];
        const originalLog = console.log;
        try {
            console.log = (...args) => logs.push(args.join(" "));
            // eslint-disable-next-line no-new-func
            const fn = new Function(code);
            fn();
            setOutput(logs.join("\n") || "(no output)");
        } catch (e) {
            setOutput(`${e.name}: ${e.message}`);
        } finally {
            console.log = originalLog;
        }
    }

    return (
        <Paper elevation={2} sx={{ p: 2, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Scope Playground</Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 2, mb: 2 }}>
                <FormControl size="small">
                    <InputLabel id="kind">Declaration</InputLabel>
                    <Select labelId="kind" value={kind} label="Declaration" onChange={(e) => setKind(e.target.value)}>
                        <MenuItem value="var">var</MenuItem>
                        <MenuItem value="let">let</MenuItem>
                        <MenuItem value="const">const</MenuItem>
                    </Select>
                </FormControl>
                <FormControl size="small">
                    <InputLabel id="reassign">Reassign</InputLabel>
                    <Select labelId="reassign" value={String(reassign)} label="Reassign" onChange={(e) => setReassign(e.target.value === "true")}>
                        <MenuItem value="true">Yes</MenuItem>
                        <MenuItem value="false">No</MenuItem>
                    </Select>
                </FormControl>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="body2">Use block</Typography>
                    <Switch checked={useBlock} onChange={(e) => setUseBlock(e.target.checked)} />
                </Box>
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: 2 }}>
                <Box component="pre" sx={{ p: 2, bgcolor: "#0b1020", color: "#e6e6e6", borderRadius: 2, overflowX: "auto" }}>
                    {`${code}`}
                </Box>
                <Button variant="contained" onClick={run}>Run</Button>
                <Box>
                    <Typography variant="subtitle2" gutterBottom>Output</Typography>
                    <Box component="pre" sx={{ p: 2, bgcolor: "#0f172a", color: "#d1d5db", borderRadius: 2, minHeight: 80, whiteSpace: "pre-wrap" }}>
                        {output}
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
}