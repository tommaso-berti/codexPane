import { useEffect, useMemo, useRef, useState } from "react";

export default function ValidationPlayground() {
    const [values, setValues] = useState({
        allergies: "",
        username: "user123",
        code: "",
    });

    const formRef = useRef(null);

    const constraints = {
        username: {
            minlength: 3,
            maxlength: 15,
            pattern: "^[a-zA-Z0-9]+$",
        },
        code: {
            pattern: "^[cC]odecademy$",
        },
    };

    const queryString = useMemo(() => {
        const params = new URLSearchParams();
        params.append("allergies", values.allergies);
        params.append("username", values.username);
        params.append("code", values.code);
        return params.toString();
    }, [values]);

    useEffect(() => {
        // Keep native attributes in sync with the configured constraints
        const form = formRef.current;
        if (!form) return;
        const u = form.elements.namedItem("username");
        const c = form.elements.namedItem("code");
        if (u) {
            u.setAttribute("minlength", constraints.username.minlength);
            u.setAttribute("maxlength", constraints.username.maxlength);
            u.setAttribute("pattern", constraints.username.pattern);
            u.required = true;
        }
        if (c) {
            c.setAttribute("pattern", constraints.code.pattern);
            c.required = true;
        }
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        // Show native messages if invalid
        const form = formRef.current;
        if (form && !form.checkValidity()) {
            form.reportValidity();
            return;
        }
        alert("Form valid! Data would be submitted:\n" + queryString);
    };

    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: 1.45 }}>
            <form ref={formRef} onSubmit={onSubmit} noValidate={false} style={formStyle}>
                <Field label="Allergies (required)" htmlFor="allergies">
                    <input
                        id="allergies"
                        name="allergies"
                        type="text"
                        required
                        value={values.allergies}
                        onChange={(e) => setValues({ ...values, allergies: e.target.value })}
                        style={input}
                        placeholder="e.g., peanuts"
                    />
                </Field>

                <Field label="Username (3–15, alphanumeric)" htmlFor="username" hint="minlength, maxlength, pattern">
                    <input
                        id="username"
                        name="username"
                        type="text"
                        required
                        value={values.username}
                        onChange={(e) => setValues({ ...values, username: e.target.value })}
                        style={input}
                        placeholder="e.g., coder42"
                        minLength={3}
                        maxLength={15}
                        pattern="^[a-zA-Z0-9]+$"
                    />
                    <Validity stateFor="username" formRef={formRef} />
                </Field>

                <Field label="Code (must equal 'CodexPane')" htmlFor="code" hint="pattern">
                    <input
                        id="code"
                        name="code"
                        type="text"
                        required
                        value={values.code}
                        onChange={(e) => setValues({ ...values, code: e.target.value })}
                        style={input}
                        placeholder="CodexPane"
                        pattern="^[cC]odexPane$"
                    />
                    <Validity stateFor="code" formRef={formRef} />
                </Field>

                <div style={{ display: "flex", gap: 8 }}>
                    <button type="submit" style={buttonPrimary}>Submit</button>
                    <button
                        type="button"
                        onClick={() => setValues({ allergies: "", username: "user123", code: "" })}
                        style={buttonSecondary}
                    >
                        Reset
                    </button>
                </div>
            </form>

            <section style={panel}>
                <h4 style={h4}>What would be sent</h4>
                <code style={codeBlock}>{queryString}</code>
                <p style={muted}>
                    This demo uses **native HTML validation** (required, minlength, maxlength, pattern)
                    and the Constraint Validation API (<code>checkValidity()</code>, <code>reportValidity()</code>).
                </p>
            </section>
        </div>
    );
}

function Field({ label, htmlFor, hint, children }) {
    return (
        <label htmlFor={htmlFor} style={{ display: "grid", gap: 6, marginBottom: 14 }}>
      <span style={{ color: "#111827", fontSize: 14, fontWeight: 600 }}>
        {label} {hint ? <em style={{ color: "#6b7280", fontStyle: "normal" }}>· {hint}</em> : null}
      </span>
            {children}
        </label>
    );
}

function Validity({ stateFor, formRef }) {
    const [state, setState] = useState({ valid: true, message: "" });

    useEffect(() => {
        const input = formRef.current?.elements.namedItem(stateFor);
        if (!input) return;
        const handler = () => setState({ valid: input.checkValidity(), message: input.validationMessage });
        handler();
        input.addEventListener("input", handler);
        input.addEventListener("blur", handler);
        return () => {
            input.removeEventListener("input", handler);
            input.removeEventListener("blur", handler);
        };
    }, [stateFor, formRef]);

    return (
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: state.valid ? "#059669" : "#b91c1c" }}>
            <span aria-hidden="true">{state.valid ? "✔︎" : "✖︎"}</span>
            <small>{state.message || "Looks good."}</small>
        </div>
    );
}

const formStyle = { border: "1px solid #e5e7eb", borderRadius: 12, padding: 16, background: "white", boxShadow: "0 1px 2px rgba(0,0,0,0.04)" };
const panel = { marginTop: 16, border: "1px solid #e5e7eb", borderRadius: 12, padding: 16, background: "#f9fafb" };
const input = { border: "1px solid #d1d5db", borderRadius: 8, padding: "8px 10px", fontSize: 14 };
const buttonPrimary = { background: "#111827", color: "white", border: "1px solid #111827", borderRadius: 10, padding: "8px 12px", cursor: "pointer" };
const buttonSecondary = { background: "white", color: "#111827", border: "1px solid #d1d5db", borderRadius: 10, padding: "8px 12px", cursor: "pointer" };
const h4 = { margin: "0 0 8px", fontSize: 14, color: "#374151" };
const codeBlock = { display: "block", background: "white", padding: 8, borderRadius: 8, wordBreak: "break-all", border: "1px solid #e5e7eb" };
const muted = { color: "#6b7280", fontSize: 13, marginTop: 8 };