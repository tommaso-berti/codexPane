import { useMemo, useRef, useState } from "react";
import {
    Alert,
    Button,
    Chip,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const INITIAL_VALUES = {
    allergies: "",
    username: "user123",
    code: ""
};

export default function ValidationPlayground() {
    const formRef = useRef(null);
    const [values, setValues] = useState(INITIAL_VALUES);
    const [validated, setValidated] = useState(false);
    const [browserMessage, setBrowserMessage] = useState("Run validation to see native browser feedback.");

    const fieldStatus = useMemo(() => {
        const requiredValid = values.allergies.trim().length > 0;
        const lengthValid = values.username.length >= 3 && values.username.length <= 15;
        const patternValid = /^[cC]odexPane$/.test(values.code);
        return {
            requiredValid,
            lengthValid,
            patternValid,
            allValid: requiredValid && lengthValid && patternValid
        };
    }, [values]);

    const onFieldChange = (key, value) => {
        setValues((prev) => ({ ...prev, [key]: value }));
        setValidated(false);
        setBrowserMessage("Run validation to see native browser feedback.");
    };

    const onValidate = () => {
        const form = formRef.current;
        if (!form) return;

        const valid = form.checkValidity();
        setValidated(true);

        if (valid) {
            setBrowserMessage("The form is valid and ready to submit.");
            return;
        }

        const firstInvalid = Array.from(form.elements).find(
            (element) => typeof element.checkValidity === "function" && !element.checkValidity()
        );

        setBrowserMessage(firstInvalid?.validationMessage || "One or more fields are invalid.");
        form.reportValidity();
    };

    const onReset = () => {
        setValues(INITIAL_VALUES);
        setValidated(false);
        setBrowserMessage("Run validation to see native browser feedback.");
    };

    const status = validated
        ? fieldStatus.allValid
            ? { color: "success", label: "Valid" }
            : { color: "error", label: "Invalid" }
        : { color: "info", label: "Not validated" };

    return (
        <PlaygroundShell
            title="Validation Playground"
            goal="See how required, text length, and pattern attributes drive native browser validation."
            status={status}
            controls={
                <form ref={formRef} noValidate={false} onSubmit={(event) => event.preventDefault()}>
                    <Stack spacing={1.4} sx={{ maxWidth: 460 }}>
                        <TextField
                            label="Allergies (required)"
                            name="allergies"
                            value={values.allergies}
                            onChange={(event) => onFieldChange("allergies", event.target.value)}
                            required
                            size="small"
                        />
                        <TextField
                            label="Username (min 3, max 15)"
                            name="username"
                            value={values.username}
                            onChange={(event) => onFieldChange("username", event.target.value)}
                            required
                            inputProps={{ minLength: 3, maxLength: 15 }}
                            size="small"
                        />
                        <TextField
                            label="Code (must be CodexPane)"
                            name="code"
                            value={values.code}
                            onChange={(event) => onFieldChange("code", event.target.value)}
                            required
                            inputProps={{ pattern: "^[cC]odexPane$" }}
                            size="small"
                        />
                        <Stack direction="row" spacing={1}>
                            <Button variant="contained" onClick={onValidate}>
                                Validate
                            </Button>
                            <Button variant="outlined" onClick={onReset}>
                                Reset
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mb: 1.2 }}>
                        <Chip
                            size="small"
                            color={fieldStatus.requiredValid ? "success" : "error"}
                            variant="filled"
                            sx={(theme) => {
                                const tone = fieldStatus.requiredValid ? "success" : "error";
                                return {
                                    border: "1px solid",
                                    borderColor: alpha(theme.palette[tone].main, theme.palette.mode === "dark" ? 0.58 : 0.35),
                                    bgcolor: alpha(theme.palette[tone].main, theme.palette.mode === "dark" ? 0.28 : 0.12),
                                    color: theme.palette.mode === "dark" ? theme.palette[tone].light : theme.palette[tone].dark,
                                    "& .MuiChip-label": { color: "inherit", fontWeight: 700 }
                                };
                            }}
                            label={`required: ${fieldStatus.requiredValid ? "pass" : "fail"}`}
                        />
                        <Chip
                            size="small"
                            color={fieldStatus.lengthValid ? "success" : "error"}
                            variant="filled"
                            sx={(theme) => {
                                const tone = fieldStatus.lengthValid ? "success" : "error";
                                return {
                                    border: "1px solid",
                                    borderColor: alpha(theme.palette[tone].main, theme.palette.mode === "dark" ? 0.58 : 0.35),
                                    bgcolor: alpha(theme.palette[tone].main, theme.palette.mode === "dark" ? 0.28 : 0.12),
                                    color: theme.palette.mode === "dark" ? theme.palette[tone].light : theme.palette[tone].dark,
                                    "& .MuiChip-label": { color: "inherit", fontWeight: 700 }
                                };
                            }}
                            label={`length: ${fieldStatus.lengthValid ? "pass" : "fail"}`}
                        />
                        <Chip
                            size="small"
                            color={fieldStatus.patternValid ? "success" : "error"}
                            variant="filled"
                            sx={(theme) => {
                                const tone = fieldStatus.patternValid ? "success" : "error";
                                return {
                                    border: "1px solid",
                                    borderColor: alpha(theme.palette[tone].main, theme.palette.mode === "dark" ? 0.58 : 0.35),
                                    bgcolor: alpha(theme.palette[tone].main, theme.palette.mode === "dark" ? 0.28 : 0.12),
                                    color: theme.palette.mode === "dark" ? theme.palette[tone].light : theme.palette[tone].dark,
                                    "& .MuiChip-label": { color: "inherit", fontWeight: 700 }
                                };
                            }}
                            label={`pattern: ${fieldStatus.patternValid ? "pass" : "fail"}`}
                        />
                    </Stack>
                    <Alert severity={fieldStatus.allValid ? "success" : "warning"} variant="outlined">
                        Form state: {fieldStatus.allValid ? "all constraints currently pass" : "at least one constraint fails"}
                    </Alert>
                </Paper>
            }
            output={
                <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                    <Typography variant="body2" sx={{ mb: 0.75 }}>
                        Native browser feedback
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {browserMessage}
                    </Typography>
                </Paper>
            }
            note="Native validation is useful UX guidance, but real applications must still validate again on the server."
        />
    );
}
