import { useMemo, useState } from "react";
import {
    Alert,
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

export default function FormsPlayground() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const [submitted, setSubmitted] = useState(false);

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const passwordValid = password.length >= 6;
    const formValid = emailValid && passwordValid;

    const payload = useMemo(() => ({ email, password: password ? "******" : "", role }), [email, password, role]);

    return (
        <PlaygroundShell
            title="Controlled Forms Playground"
            goal="Understand how controlled inputs drive validation and submit readiness."
            status={{ color: formValid ? "success" : "warning", label: formValid ? "Ready" : "Invalid" }}
            controls={
                <Stack spacing={1.2} sx={{ maxWidth: 560 }}>
                    <TextField
                        size="small"
                        label="Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <TextField
                        size="small"
                        label="Password (min 6)"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <FormControl size="small">
                        <InputLabel id="forms-role-label">Role</InputLabel>
                        <Select
                            labelId="forms-role-label"
                            label="Role"
                            value={role}
                            onChange={(event) => setRole(event.target.value)}
                        >
                            <MenuItem value="user">User</MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                        </Select>
                    </FormControl>
                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" onClick={() => setSubmitted(true)} disabled={!formValid}>Run</Button>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                setEmail("");
                                setPassword("");
                                setRole("user");
                                setSubmitted(false);
                            }}
                        >
                            Reset
                        </Button>
                    </Stack>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.4, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Form payload preview</Typography>
                    <Typography component="pre" sx={{ m: "8px 0 0", fontSize: 12 }}>{JSON.stringify(payload, null, 2)}</Typography>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    <Alert severity={emailValid ? "success" : "warning"} variant="outlined">Email format {emailValid ? "valid" : "invalid"}.</Alert>
                    <Alert severity={passwordValid ? "success" : "warning"} variant="outlined">Password length {passwordValid ? "valid" : "too short"}.</Alert>
                    <Alert severity={submitted ? "success" : "info"} variant="outlined">
                        {submitted ? "Submit simulation completed." : "Click Run when form is valid."}
                    </Alert>
                </Stack>
            }
            note="In controlled forms, React state is the source of truth for both UI and validation."
        />
    );
}
