import React, { useMemo, useState } from "react";
import { Card, CardContent, Button } from "@mui/material";
import { TextField, FormControlLabel, Switch, MenuItem } from "@mui/material";

/**
 * FormsPlayground
 * - Demonstrates controlled inputs (value + onChange)
 * - Shows current state object and the exact JSX snippet being executed
 * - Toggles required, disabled, and input type to observe controlled behavior
 */
export default function FormsPlayground() {
    const [form, setForm] = useState({
        email: "",
        password: "",
        remember: false,
        role: "user",
    });
    const [disabled, setDisabled] = useState(false);
    const [required, setRequired] = useState(true);
    const [pwdType, setPwdType] = useState("password");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((f) => ({
            ...f,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Submitted:\n${JSON.stringify(form, null, 2)}`);
    };

    const snippet = useMemo(
        () => `<form onSubmit={handleSubmit}>
  <TextField
    label="Email"
    name="email"
    type="email"
    value={form.email}
    onChange={handleChange}
    required={${required}}
    disabled={${disabled}}
  />
  <TextField
    label="Password"
    name="password"
    type="${pwdType}"
    value={form.password}
    onChange={handleChange}
    required={${required}}
    disabled={${disabled}}
  />
  <TextField
    select
    label="Role"
    name="role"
    value={form.role}
    onChange={handleChange}
  >
    <MenuItem value="user">user</MenuItem>
    <MenuItem value="admin">admin</MenuItem>
  </TextField>
  <FormControlLabel
    control={<Switch checked={form.remember} name="remember" onChange={handleChange} />}
    label="remember me"
  />
  <Button type="submit">Submit</Button>
</form>`,
        [form, required, disabled, pwdType]
    );

    return (
        <div className="grid gap-4">
            <div className="flex flex-wrap items-center gap-4">
                <FormControlLabel
                    control={
                        <Switch checked={required} onChange={() => setRequired((v) => !v)} />
                    }
                    label="required"
                />
                <FormControlLabel
                    control={
                        <Switch checked={disabled} onChange={() => setDisabled((v) => !v)} />
                    }
                    label="disabled"
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={pwdType === "text"}
                            onChange={() => setPwdType((t) => (t === "password" ? "text" : "password"))}
                        />
                    }
                    label={`password type: ${pwdType}`}
                />
            </div>

            <Card className="rounded-2xl shadow-sm">
                <CardContent className="p-4">
                    <form onSubmit={handleSubmit} className="grid gap-4">
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            required={required}
                            disabled={disabled}
                        />
                        <TextField
                            label="Password"
                            name="password"
                            type={pwdType}
                            value={form.password}
                            onChange={handleChange}
                            required={required}
                            disabled={disabled}
                        />
                        <TextField
                            select
                            label="Role"
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                        >
                            <MenuItem value="user">user</MenuItem>
                            <MenuItem value="admin">admin</MenuItem>
                        </TextField>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={form.remember}
                                    name="remember"
                                    onChange={handleChange}
                                />
                            }
                            label="remember me"
                        />
                        <div className="flex gap-2">
                            <Button type="submit" className="rounded-2xl">Submit</Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="rounded-2xl"
                                onClick={() =>
                                    setForm({ email: "", password: "", remember: false, role: "user" })
                                }
                            >
                                Reset
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm">
                <CardContent className="p-4">
                    <div className="text-xs text-muted-foreground mb-2">State</div>
                    <pre className="text-xs overflow-auto p-3 rounded-xl bg-neutral-900 text-neutral-50">
{JSON.stringify(form, null, 2)}
          </pre>
                    <div className="text-xs text-muted-foreground mt-4 mb-2">JSX being executed</div>
                    <pre className="text-xs overflow-auto p-3 rounded-xl bg-neutral-900 text-neutral-50">
{snippet}
          </pre>
                </CardContent>
            </Card>
        </div>
    );
}