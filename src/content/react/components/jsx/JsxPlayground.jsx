import { useMemo, useState } from "react";
import {
    Alert,
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const TEMPLATES = {
    ternary: {
        label: "Ternary expression",
        expression: "age >= 18 ? 'Adult' : 'Minor'"
    },
    and: {
        label: "Logical AND",
        expression: "showBadge && <Badge />"
    },
    map: {
        label: "List map",
        expression: "items.map(item => <li key={item}>{item}</li>)"
    }
};

export default function JsxPlayground() {
    const [template, setTemplate] = useState("ternary");
    const [name, setName] = useState("Ada");
    const [csv, setCsv] = useState("Home, Docs, About");

    const items = useMemo(
        () => csv.split(",").map((item) => item.trim()).filter(Boolean),
        [csv]
    );

    const rendered = useMemo(() => {
        if (template === "ternary") {
            return { title: `Hello, ${name}`, value: name.length >= 4 ? "Adult" : "Minor" };
        }
        if (template === "and") {
            return { title: `Hello, ${name}`, value: name.length >= 4 ? "Badge shown" : "Badge hidden" };
        }
        return { title: `Hello, ${name}`, value: `${items.length} list items rendered` };
    }, [items.length, name, template]);

    const checks = [
        { ok: name.trim().length > 0, text: "Interpolation value is not empty." },
        { ok: template !== "map" || items.length > 0, text: "Map has at least one item to render." },
        { ok: true, text: `Active JSX pattern: ${TEMPLATES[template].label}.` }
    ];

    return (
        <PlaygroundShell
            title="JSX Outcomes Playground"
            goal="See how interpolation, conditionals, and list rendering change output."
            status={{ color: "info", label: TEMPLATES[template].label }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 560 }}>
                    <FormControl size="small">
                        <InputLabel id="jsx-template-label">Pattern</InputLabel>
                        <Select
                            labelId="jsx-template-label"
                            label="Pattern"
                            value={template}
                            onChange={(event) => setTemplate(event.target.value)}
                        >
                            {Object.entries(TEMPLATES).map(([value, item]) => (
                                <MenuItem key={value} value={value}>{item.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        size="small"
                        label="Name value"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />

                    {template === "map" ? (
                        <TextField
                            size="small"
                            label="List items (comma separated)"
                            value={csv}
                            onChange={(event) => setCsv(event.target.value)}
                        />
                    ) : null}
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.4, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Rendered output</Typography>
                    <Typography variant="h6" sx={{ mt: 1 }}>{rendered.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{rendered.value}</Typography>
                    {template === "map" ? (
                        <Box component="ul" sx={{ mt: 1, mb: 0, pl: 2.5 }}>
                            {items.map((item) => <li key={item}>{item}</li>)}
                        </Box>
                    ) : null}
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    <Alert severity="info" variant="outlined">Expression: `{TEMPLATES[template].expression}`</Alert>
                    {checks.map((item) => (
                        <Alert key={item.text} severity={item.ok ? "success" : "warning"} variant="outlined">
                            {item.text}
                        </Alert>
                    ))}
                </Stack>
            }
            note="Pick one JSX pattern at a time, then change values to understand why the output changes."
        />
    );
}
