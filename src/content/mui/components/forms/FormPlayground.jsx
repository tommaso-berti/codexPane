import { useMemo, useState } from "react";
import {
    Alert,
    Box,
    Button,
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

function validateName(value) {
    if (!value.trim()) return "Name is required.";
    if (value.trim().length < 2) return "Use at least 2 characters.";
    return "";
}

function validateEmail(value) {
    if (!value.trim()) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Use a valid email format.";
    return "";
}

export default function FormPlayground() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState("it");
    const [touched, setTouched] = useState({ name: false, email: false });

    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const isValid = !nameError && !emailError;

    const status = isValid ? "Ready to submit" : "Needs validation fixes";

    const checks = useMemo(
        () => [
            { ok: !nameError, text: "Name rule passed" },
            { ok: !emailError, text: "Email rule passed" },
            { ok: isValid, text: "Form state is valid" }
        ],
        [emailError, isValid, nameError]
    );

    const runValidate = () => {
        setTouched({ name: true, email: true });
    };

    const reset = () => {
        setName("");
        setEmail("");
        setCountry("it");
        setTouched({ name: false, email: false });
    };

    return (
        <PlaygroundShell
            title="Form Validation Feedback Playground"
            goal="Practice clear field-level validation and understand the global form state."
            status={{ color: isValid ? "success" : "warning", label: status }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 520 }}>
                    <TextField
                        size="small"
                        label="Name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        error={touched.name && Boolean(nameError)}
                        helperText={touched.name ? (nameError || "Looks good") : "Type a full first name"}
                    />

                    <TextField
                        size="small"
                        label="Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        error={touched.email && Boolean(emailError)}
                        helperText={touched.email ? (emailError || "Looks good") : "Use a standard address format"}
                    />

                    <FormControl size="small">
                        <InputLabel id="form-country-label">Country</InputLabel>
                        <Select
                            labelId="form-country-label"
                            label="Country"
                            value={country}
                            onChange={(event) => setCountry(event.target.value)}
                        >
                            <MenuItem value="it">Italy</MenuItem>
                            <MenuItem value="fr">France</MenuItem>
                            <MenuItem value="es">Spain</MenuItem>
                        </Select>
                    </FormControl>

                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" onClick={runValidate}>Validate</Button>
                        <Button variant="outlined" onClick={reset}>Reset</Button>
                    </Stack>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.4, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Live payload preview</Typography>
                    <Box component="pre" sx={{ m: "8px 0 0", fontSize: 12, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>
                        {JSON.stringify({ name, email, country }, null, 2)}
                    </Box>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    {checks.map((item) => (
                        <Alert key={item.text} severity={item.ok ? "success" : "warning"} variant="outlined">
                            {item.text}
                        </Alert>
                    ))}
                    {!isValid ? (
                        <Alert severity="info" variant="outlined">Fix field errors first, then submit.</Alert>
                    ) : (
                        <Alert severity="success" variant="outlined">Form can be submitted safely.</Alert>
                    )}
                </Stack>
            }
            code={
                <pre>{`const nameError = validateName("${name}");
const emailError = validateEmail("${email}");
const canSubmit = ${isValid};

<TextField error={Boolean(nameError)} helperText={nameError} />
<TextField error={Boolean(emailError)} helperText={emailError} />`}</pre>
            }
            note="Good UX combines immediate field hints with one clear form-level state before submission."
        />
    );
}
