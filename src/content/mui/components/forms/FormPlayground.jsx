import * as React from "react";
import {
    Stack,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Switch,
    Paper,
    Typography
} from "@mui/material";

export default function FormPlayground() {
    const [country, setCountry] = React.useState("it");
    const [newsletter, setNewsletter] = React.useState(false);
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");

    const hasNameError = name.length > 0 && name.length < 2;
    const hasEmailError = email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const code = `import { TextField, FormControl, InputLabel, Select, MenuItem, Switch, FormControlLabel, Button } from "@mui/material";

export default function Example() {
  return (
    <form noValidate>
      {/* fields */}
    </form>
  );
}`;

    return (
            <Stack spacing={2}>
                <Typography variant="h6">Form controls</Typography>

                <Stack spacing={2} sx={{ maxWidth: 440 }}>
                    <TextField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        error={hasNameError}
                        helperText={hasNameError ? "At least 2 characters" : " "}
                        required
                    />

                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={hasEmailError}
                        helperText={hasEmailError ? "Invalid email address" : " "}
                        required
                    />

                    <FormControl>
                        <InputLabel id="country-label">Country</InputLabel>
                        <Select
                            labelId="country-label"
                            label="Country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        >
                            <MenuItem value="it">Italy</MenuItem>
                            <MenuItem value="fr">France</MenuItem>
                            <MenuItem value="es">Spain</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControlLabel
                        control={<Switch checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)} />}
                        label="Subscribe to newsletter"
                    />

                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" disabled={hasNameError || hasEmailError}>
                            Submit
                        </Button>
                        <Button
                            variant="text"
                            onClick={() => {
                                setName("");
                                setEmail("");
                                setCountry("it");
                                setNewsletter(false);
                            }}
                        >
                            Reset
                        </Button>
                    </Stack>
                </Stack>

                <Paper sx={{ p: 2, bgcolor: "grey.50" }}>
                    <Typography variant="overline">Code</Typography>
                    <pre style={{ margin: 0, overflowX: "auto" }}>
          <code>{code}</code>
        </pre>
                </Paper>
            </Stack>
    );
}