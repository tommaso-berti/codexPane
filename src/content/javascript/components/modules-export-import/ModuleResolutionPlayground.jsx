import { useMemo, useState } from "react";
import { Alert, Button, FormControl, InputLabel, MenuItem, Paper, Select, Stack, Typography } from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const CASES = {
    named_ok: {
        title: "Named import",
        snippet: "import { sum } from './math.js';",
        result: "Valid if `sum` is exported by name."
    },
    default_ok: {
        title: "Default import",
        snippet: "import utils from './utils.js';",
        result: "Valid if the module has exactly one default export."
    },
    named_from_default: {
        title: "Wrong destructuring from default",
        snippet: "import { sum } from './utils.js';",
        result: "Error when `utils.js` only exports default."
    },
    missing_module_type: {
        title: "Missing module script type",
        snippet: "<script src='./main.js'></script>",
        result: "Browser won't allow `import` syntax without type='module'."
    }
};

export default function ModuleResolutionPlayground() {
    const [draft, setDraft] = useState("named_ok");
    const [selected, setSelected] = useState("named_ok");
    const info = useMemo(() => CASES[selected], [selected]);

    return (
        <PlaygroundShell
            title="Import/Export Resolution"
            goal="Test common module wiring cases and spot invalid import patterns quickly."
            status={{ color: selected.includes("ok") ? "success" : "warning", label: info.title }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 620 }}>
                    <FormControl size="small" fullWidth>
                        <InputLabel id="module-case">Case</InputLabel>
                        <Select
                            labelId="module-case"
                            label="Case"
                            value={draft}
                            onChange={(event) => setDraft(event.target.value)}
                        >
                            <MenuItem value="named_ok">Named import works</MenuItem>
                            <MenuItem value="default_ok">Default import works</MenuItem>
                            <MenuItem value="named_from_default">Wrong named import from default</MenuItem>
                            <MenuItem value="missing_module_type">Missing script type module</MenuItem>
                        </Select>
                    </FormControl>
                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" onClick={() => setSelected(draft)}>Apply</Button>
                        <Button variant="outlined" onClick={() => { setDraft("named_ok"); setSelected("named_ok"); }}>Reset</Button>
                    </Stack>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.2, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Snippet</Typography>
                    <Typography component="pre" variant="body2" sx={{ mt: 0.8, mb: 0, whiteSpace: "pre-wrap", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                        {info.snippet}
                    </Typography>
                </Paper>
            }
            output={<Alert severity={selected.includes("ok") ? "success" : "warning"} variant="outlined">{info.result}</Alert>}
            code={
                <pre>
{`// named
export function sum(a, b) { return a + b; }
// default
export default { sum };`}
                </pre>
            }
        />
    );
}
