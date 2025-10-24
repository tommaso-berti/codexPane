import { useMemo, useState } from "react";

// Utility: parse hex #rrggbb to [r,g,b] 0-255
function hexToRgb(hex) {
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
    if (!m) return [0, 0, 0];
    return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
}

// Relative luminance (WCAG)
function luminance([r, g, b]) {
    const srgb = [r, g, b].map(v => v / 255).map(v =>
        v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    );
    return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

function contrastRatio(fg, bg) {
    const L1 = luminance(hexToRgb(fg));
    const L2 = luminance(hexToRgb(bg));
    const lighter = Math.max(L1, L2);
    const darker = Math.min(L1, L2);
    return (lighter + 0.05) / (darker + 0.05);
}

function Badge({ ok, label }) {
    return (
        <span style={{
            padding: "2px 8px",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 600,
            color: ok ? "#065f46" : "#991b1b",
            background: ok ? "#d1fae5" : "#fee2e2",
            border: `1px solid ${ok ? "#10b981" : "#f87171"}`
        }}>
      {ok ? "Pass" : "Fail"} · {label}
    </span>
    );
}

export default function ContrastPlayground() {
    const [fg, setFg] = useState("#111827");
    const [bg, setBg] = useState("#ffffff");

    const ratio = useMemo(() => contrastRatio(fg, bg), [fg, bg]);
    const ratioText = useMemo(() => ratio.toFixed(2) + ":1", [ratio]);

    const aaNormal = ratio >= 4.5;
    const aaLarge  = ratio >= 3.0;
    const aaaNormal = ratio >= 7.0;
    const aaaLarge = ratio >= 4.5;

    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: 1.45 }}>
            <div style={controls}>
                <label style={label}>
                    Foreground
                    <input type="color" value={fg} onChange={e => setFg(e.target.value)} style={colorInput} />
                    <input value={fg} onChange={e => setFg(e.target.value)} style={textInput} aria-label="Foreground hex" />
                </label>
                <label style={label}>
                    Background
                    <input type="color" value={bg} onChange={e => setBg(e.target.value)} style={colorInput} />
                    <input value={bg} onChange={e => setBg(e.target.value)} style={textInput} aria-label="Background hex" />
                </label>
                <div style={{ display: "grid", gap: 6 }}>
                    <strong>Contrast: {ratioText}</strong>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        <Badge ok={aaNormal} label="WCAG AA normal 4.5:1" />
                        <Badge ok={aaLarge}  label="WCAG AA large 3:1" />
                        <Badge ok={aaaNormal} label="WCAG AAA normal 7:1" />
                        <Badge ok={aaaLarge}  label="WCAG AAA large 4.5:1" />
                    </div>
                </div>
            </div>

            <div style={{ ...preview, background: bg, color: fg }}>
                <h2 style={{ margin: 0 }}>Heading Example</h2>
                <p style={{ margin: "6px 0 12px" }}>
                    The quick brown fox jumps over the lazy dog. 1234567890 — Aa Bb Cc.
                </p>
                <button style={button}>Primary Action</button>
                <a href="#" style={link}>Learn more</a>
            </div>

            <p style={hint}>
                Large text is typically 18.66px bold or 24px regular and larger. Aim for ≥ 4.5:1 for normal text and ≥ 3:1 for large text.
            </p>
        </div>
    );
}

const controls = {
    display: "grid",
    gap: 12,
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 12,
    background: "#fff",
    marginBottom: 12
};

const preview = {
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 16
};

const label = {
    display: "grid",
    gap: 6,
    fontSize: 14,
    color: "#374151"
};

const colorInput = { width: 44, height: 32, padding: 0, border: "1px solid #d1d5db", borderRadius: 8 };
const textInput = { border: "1px solid #d1d5db", borderRadius: 8, padding: "6px 8px", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" };

const button = {
    display: "inline-block",
    padding: "8px 12px",
    background: "currentColor",
    color: "currentColor",
    border: "2px solid currentColor",
    borderRadius: 10,
    marginRight: 10
};

const link = { color: "currentColor", marginLeft: 4, textDecoration: "underline", cursor: "pointer" };

const hint = { color: "#6b7280", fontSize: 13, marginTop: 8 };