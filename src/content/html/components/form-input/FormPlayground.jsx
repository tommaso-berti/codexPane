import { useMemo, useState } from "react";
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const INITIAL = {
    fullName: "Ada Lovelace",
    years: 3,
    lunch: "pizza",
    subscribe: true
};

export default function FormPlayground() {
    const [form, setForm] = useState(INITIAL);

    const queryString = useMemo(() => {
        const params = new URLSearchParams();
        params.append("full-name", form.fullName);
        params.append("years", String(form.years));
        params.append("lunch", form.lunch);
        if (form.subscribe) params.append("subscribe", "on");
        return params.toString();
    }, [form]);

    const parsed = useMemo(() => ({
        "full-name": form.fullName,
        years: Number(form.years),
        lunch: form.lunch,
        subscribe: form.subscribe ? "on" : "(not sent)"
    }), [form]);

    return (
        <PlaygroundShell
            title="Form Input Playground"
            goal="Understand how field name + input type map to submitted form data."
            controls={
                <Stack spacing={1.4} sx={{ maxWidth: 460 }}>
                    <TextField
                        label="Full name (name=full-name)"
                        value={form.fullName}
                        onChange={(event) => setForm((prev) => ({ ...prev, fullName: event.target.value }))}
                        size="small"
                    />
                    <TextField
                        label="Years of experience (name=years)"
                        type="number"
                        value={form.years}
                        onChange={(event) => setForm((prev) => ({ ...prev, years: event.target.value }))}
                        size="small"
                        inputProps={{ min: 0, step: 1 }}
                    />
                    <FormControl size="small">
                        <InputLabel id="lunch-label">Lunch preference (name=lunch)</InputLabel>
                        <Select
                            labelId="lunch-label"
                            label="Lunch preference (name=lunch)"
                            value={form.lunch}
                            onChange={(event) => setForm((prev) => ({ ...prev, lunch: event.target.value }))}
                        >
                            <MenuItem value="pizza">Pizza</MenuItem>
                            <MenuItem value="salad">Salad</MenuItem>
                            <MenuItem value="ramen">Ramen</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={form.subscribe}
                                onChange={(event) => setForm((prev) => ({ ...prev, subscribe: event.target.checked }))}
                            />
                        }
                        label="Subscribe to updates (name=subscribe)"
                    />
                    <Stack direction="row" spacing={1}>
                        <Button
                            variant="outlined"
                            onClick={() => setForm(INITIAL)}
                        >
                            Reset
                        </Button>
                    </Stack>
                </Stack>
            }
            preview={
                <Paper
                    variant="outlined"
                    sx={{ p: 1.5, borderRadius: 2, bgcolor: "background.default" }}
                >
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        Simulated form payload
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            p: 1,
                            borderRadius: 1.5,
                            bgcolor: "background.paper",
                            border: "1px solid",
                            borderColor: "divider",
                            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                            wordBreak: "break-all"
                        }}
                    >
                        {queryString || "(empty)"}
                    </Typography>
                </Paper>
            }
            output={
                <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        Parsed values
                    </Typography>
                    <pre
                        style={{
                            margin: 0,
                            fontSize: 13,
                            lineHeight: 1.45,
                            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace"
                        }}
                    >
                        {JSON.stringify(parsed, null, 2)}
                    </pre>
                </Paper>
            }
            note="Checkbox fields are submitted only when checked. Every submitted pair is sent as name=value."
        />
    );
}
