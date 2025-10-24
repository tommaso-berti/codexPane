import { useMemo, useState } from "react";

export default function FormPlayground() {
    const [form, setForm] = useState({
        text: "already pre-filled",
        password: "",
        years: 1,
        volume: 50,
        toppings: { cheese: false, pepperoni: true },
        answer: "2",
        lunch: "pizza",
        city: "",
        blog: "Default text"
    });

    const queryString = useMemo(() => {
        const params = new URLSearchParams();

        params.append("first-text-field", form.text);
        params.append("user-password", form.password);
        params.append("years", String(form.years));
        params.append("volume", String(form.volume));
        Object.entries(form.toppings).forEach(([k, v]) => {
            if (v) params.append("topping", k);
        });
        params.append("answer", form.answer);
        params.append("lunch", form.lunch);
        params.append("city", form.city);
        params.append("blog", form.blog);

        return params.toString();
    }, [form]);

    const onChange = (key, value) => setForm((f) => ({ ...f, [key]: value }));

    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: 1.45 }}>
            <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
                <section style={card}>
                    <h3 style={h3}>Form</h3>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <Field label="Text (name=first-text-field)" htmlFor="text">
                            <input
                                id="text"
                                name="first-text-field"
                                type="text"
                                value={form.text}
                                onChange={(e) => onChange("text", e.target.value)}
                                style={input}
                            />
                        </Field>

                        <Field label="Password (name=user-password)" htmlFor="password">
                            <input
                                id="password"
                                name="user-password"
                                type="password"
                                value={form.password}
                                onChange={(e) => onChange("password", e.target.value)}
                                style={input}
                            />
                        </Field>

                        <Field label="Number years (step=1)" htmlFor="years">
                            <input
                                id="years"
                                name="years"
                                type="number"
                                step="1"
                                value={form.years}
                                onChange={(e) => onChange("years", e.target.value)}
                                style={input}
                            />
                        </Field>

                        <Field label={`Range volume (${form.volume})`} htmlFor="volume">
                            <input
                                id="volume"
                                name="volume"
                                type="range"
                                min="0"
                                max="100"
                                step="1"
                                value={form.volume}
                                onChange={(e) => onChange("volume", Number(e.target.value))}
                                style={{ width: "100%" }}
                            />
                        </Field>

                        <fieldset style={fieldset}>
                            <legend style={legend}>Checkbox toppings (name=topping)</legend>
                            <label style={label}>
                                <input
                                    id="cheese"
                                    type="checkbox"
                                    checked={form.toppings.cheese}
                                    onChange={(e) =>
                                        onChange("toppings", { ...form.toppings, cheese: e.target.checked })
                                    }
                                />
                                Extra cheese
                            </label>
                            <label style={label}>
                                <input
                                    id="pepperoni"
                                    type="checkbox"
                                    checked={form.toppings.pepperoni}
                                    onChange={(e) =>
                                        onChange("toppings", { ...form.toppings, pepperoni: e.target.checked })
                                    }
                                />
                                Pepperoni
                            </label>
                        </fieldset>

                        <fieldset style={fieldset}>
                            <legend style={legend}>Radio answer (name=answer)</legend>
                            <label style={label}>
                                <input
                                    type="radio"
                                    name="answer"
                                    value="2"
                                    checked={form.answer === "2"}
                                    onChange={(e) => onChange("answer", e.target.value)}
                                />
                                2
                            </label>
                            <label style={label}>
                                <input
                                    type="radio"
                                    name="answer"
                                    value="11"
                                    checked={form.answer === "11"}
                                    onChange={(e) => onChange("answer", e.target.value)}
                                />
                                11
                            </label>
                        </fieldset>

                        <Field label="Dropdown lunch (name=lunch)" htmlFor="lunch">
                            <select
                                id="lunch"
                                name="lunch"
                                value={form.lunch}
                                onChange={(e) => onChange("lunch", e.target.value)}
                                style={input}
                            >
                                <option value="pizza">Pizza</option>
                                <option value="curry">Curry</option>
                                <option value="salad">Salad</option>
                                <option value="ramen">Ramen</option>
                                <option value="tacos">Tacos</option>
                            </select>
                        </Field>

                        <Field label="City with datalist" htmlFor="city">
                            <input
                                id="city"
                                name="city"
                                list="cities"
                                value={form.city}
                                onChange={(e) => onChange("city", e.target.value)}
                                style={input}
                            />
                            <datalist id="cities">
                                <option value="New York City" />
                                <option value="Tokyo" />
                                <option value="Barcelona" />
                                <option value="Mexico City" />
                                <option value="Melbourne" />
                                <option value="Other" />
                            </datalist>
                        </Field>

                        <Field label="Textarea blog (name=blog)" htmlFor="blog">
                            <textarea
                                id="blog"
                                name="blog"
                                rows={4}
                                value={form.blog}
                                onChange={(e) => onChange("blog", e.target.value)}
                                style={{ ...input, height: 96 }}
                            />
                        </Field>

                        <div style={{ display: "flex", gap: 8 }}>
                            <button type="submit" style={button}>Submit</button>
                            <button
                                type="button"
                                onClick={() =>
                                    setForm({
                                        text: "already pre-filled",
                                        password: "",
                                        years: 1,
                                        volume: 50,
                                        toppings: { cheese: false, pepperoni: true },
                                        answer: "2",
                                        lunch: "pizza",
                                        city: "",
                                        blog: "Default text"
                                    })
                                }
                                style={buttonSecondary}
                            >
                                Reset
                            </button>
                        </div>
                    </form>
                </section>

                <section style={card}>
                    <h3 style={h3}>Submission Preview</h3>
                    <p style={muted}>Simulated query string (GET) or body (POST):</p>
                    <code style={codeBlock}>{queryString}</code>

                    <h4 style={h4}>Parsed Values</h4>
                    <ul style={{ margin: 0, paddingLeft: 18 }}>
                        <li>first-text-field: <strong>{form.text}</strong></li>
                        <li>user-password: <strong>{form.password ? "••••••" : ""}</strong></li>
                        <li>years: <strong>{form.years}</strong></li>
                        <li>volume: <strong>{form.volume}</strong></li>
                        <li>topping: <strong>{["cheese", "pepperoni"].filter(t => form.toppings[t]).join(", ") || "none"}</strong></li>
                        <li>answer: <strong>{form.answer}</strong></li>
                        <li>lunch: <strong>{form.lunch}</strong></li>
                        <li>city: <strong>{form.city}</strong></li>
                        <li>blog: <strong>{form.blog.slice(0, 40)}{form.blog.length > 40 ? "…" : ""}</strong></li>
                    </ul>

                    <p style={muted}>
                        Notes: {'<select>'} è single select di default (usa {'multiple'} per multi select). {'<datalist>'} fornisce suggerimenti; il valore digitato viene comunque inviato.
                    </p>
                </section>
            </div>
        </div>
    );
}

function Field({ label, htmlFor, children }) {
    return (
        <label htmlFor={htmlFor} style={{ display: "grid", gap: 6, marginBottom: 12 }}>
            <span style={{ color: "#374151", fontSize: 14, fontWeight: 600 }}>{label}</span>
            {children}
        </label>
    );
}

const card = {
    border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: 16,
        background: "white",
        boxShadow: "0 1px 2px rgba(0,0,0,0.04)"
};

const input = {
    border: "1px solid #d1d5db",
        borderRadius: 8,
        padding: "8px 10px",
        fontSize: 14
};

const button = {
    background: "#111827",
        color: "white",
        border: "1px solid #111827",
        borderRadius: 10,
        padding: "8px 12px",
        cursor: "pointer"
};

const buttonSecondary = {
    background: "white",
        color: "#111827",
        border: "1px solid #d1d5db",
        borderRadius: 10,
        padding: "8px 12px",
        cursor: "pointer"
};

const h3 = { margin: "4px 0 8px", fontSize: 16 };
const h4 = { margin: "16px 0 8px", fontSize: 14, color: "#374151" };
const legend = { padding: "0 6px", color: "#374151", fontWeight: 600, fontSize: 13 };
const fieldset = { border: "1px solid #e5e7eb", borderRadius: 8, padding: 10, margin: "10px 0" };
const label = { display: "flex", alignItems: "center", gap: 8, margin: "6px 0" };
const muted = { color: "#6b7280", fontSize: 13, marginTop: 8 };
const codeBlock = { display: "block", background: "#f9fafb", padding: 8, borderRadius: 8, wordBreak: "break-all" };