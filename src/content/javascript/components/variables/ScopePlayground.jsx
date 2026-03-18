import { useMemo, useState } from "react";
import {
    Alert,
    Box,
    Button,
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

export default function ScopePlayground() {
    const [kind, setKind] = useState("let");
    const [useBlock, setUseBlock] = useState(true);
    const [reassign, setReassign] = useState(true);
    const [result, setResult] = useState({ output: "Run to evaluate", checks: [] });

    const code = useMemo(() => {
        const declaration = kind === "const" ? "const x = 1;" : `${kind} x = 1;`;
        const blockLine = useBlock ? `${kind} x = 99;\n  console.log('inner x =', x);` : "console.log('no inner block');";
        const reassignLine = reassign ? "x = 2;" : "// no reassignment";

        return `${declaration}\n${useBlock ? `{\n  ${blockLine}\n}` : ""}\n${reassignLine}\nconsole.log('outer x =', x);`;
    }, [kind, reassign, useBlock]);

    const run = () => {
        const logs = [];
        const checks = [];
        const originalLog = console.log;

        try {
            console.log = (...args) => logs.push(args.join(" "));
            // eslint-disable-next-line no-new-func
            new Function(code)();
            checks.push({ ok: true, text: "Code executed successfully" });
        } catch (error) {
            logs.push(`${error.name}: ${error.message}`);
            checks.push({ ok: false, text: `${error.name}: ${error.message}` });
        } finally {
            console.log = originalLog;
        }

        checks.push({
            ok: !(kind === "const" && reassign),
            text: kind === "const" && reassign ? "const cannot be reassigned" : "Reassignment rule respected"
        });

        setResult({ output: logs.join("\n") || "(no output)", checks });
    };

    return (
        <PlaygroundShell
            title="Scope and Hoisting Playground"
            goal="See how declaration type, block scope, and reassignment rules change runtime behavior."
            status={{ color: kind === "const" && reassign ? "warning" : "info", label: kind }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 640 }}>
                    <Stack direction={{ xs: "column", md: "row" }} spacing={1}>
                        <FormControl size="small" sx={{ minWidth: 180 }}>
                            <InputLabel id="scope-kind-label">Declaration</InputLabel>
                            <Select labelId="scope-kind-label" label="Declaration" value={kind} onChange={(event) => setKind(event.target.value)}>
                                <MenuItem value="var">var</MenuItem>
                                <MenuItem value="let">let</MenuItem>
                                <MenuItem value="const">const</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControlLabel
                            control={<Switch checked={useBlock} onChange={(event) => setUseBlock(event.target.checked)} />}
                            label="Use inner block"
                        />

                        <FormControlLabel
                            control={<Switch checked={reassign} onChange={(event) => setReassign(event.target.checked)} />}
                            label="Try reassignment"
                        />
                    </Stack>

                    <Button variant="contained" onClick={run} sx={{ width: "fit-content" }}>Run</Button>
                </Stack>
            }
            preview={
                <Paper
                    variant="outlined"
                    sx={(theme) => ({
                        p: 1.3,
                        borderRadius: 2,
                        bgcolor: theme.palette.mode === "dark" ? alpha(theme.palette.common.white, 0.04) : alpha(theme.palette.common.black, 0.02)
                    })}
                >
                    <Typography variant="caption" color="text.secondary">Generated code</Typography>
                    <Box component="pre" sx={{ m: "8px 0 0", fontSize: 12, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>{code}</Box>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    <Paper
                        variant="outlined"
                        sx={(theme) => ({
                            p: 1.2,
                            borderRadius: 2,
                            bgcolor: theme.palette.mode === "dark" ? alpha(theme.palette.common.white, 0.04) : alpha(theme.palette.common.black, 0.02)
                        })}
                    >
                        <Typography variant="caption" color="text.secondary">Runtime output</Typography>
                        <Box component="pre" sx={{ m: "8px 0 0", fontSize: 12, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>{result.output}</Box>
                    </Paper>
                    {result.checks.map((item) => (
                        <Alert key={item.text} severity={item.ok ? "success" : "warning"} variant="outlined">{item.text}</Alert>
                    ))}
                </Stack>
            }
            code={<pre>{code}</pre>}
            note="`var` is function-scoped, while `let` and `const` are block-scoped. `const` also forbids reassignment."
        />
    );
}
