import { useState, useMemo } from "react";

function Slider({ label, min, max, step = 1, value, onChange, suffix = "" }) {
    const id = label.replace(/\s+/g, "-").toLowerCase();
    return (
        <label htmlFor={id} style={{ display: "grid", gap: 6 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                <span style={{ color: "#374151" }}>{label}</span>
                <span style={{ color: "#6B7280" }}>{value}{suffix}</span>
            </div>
            <input
                id={id}
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                style={{ width: "100%" }}
            />
        </label>
    );
}

export default function ColorHslPlayground() {
    const [h, setH] = useState(200);
    const [s, setS] = useState(70);
    const [l, setL] = useState(50);
    const [a, setA] = useState(1);

    const hsla = useMemo(() => `hsla(${h}, ${s}%, ${l}%, ${a})`, [h, s, l, a]);
    const hsl = useMemo(() => `hsl(${h}, ${s}%, ${l}%)`, [h, s, l]);

    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: 1.4 }}>
            <div
                style={{
                    display: "grid",
                    gap: 14,
                    gridTemplateColumns: "1fr",
                    maxWidth: 560,
                    border: "1px solid #E5E7EB",
                    borderRadius: 12,
                    padding: 16,
                    boxShadow: "0 2px 10px rgba(0,0,0,.04)",
                    background: "#fff"
                }}
            >
                <div style={{ display: "grid", gap: 12 }}>
                    <Slider label="Hue" min={0} max={360} value={h} onChange={setH} />
                    <Slider label="Saturation" min={0} max={100} value={s} onChange={setS} suffix="%" />
                    <Slider label="Lightness" min={0} max={100} value={l} onChange={setL} suffix="%" />
                    <Slider label="Alpha" min={0} max={1} step={0.01} value={a} onChange={setA} />
                </div>

                <div
                    role="img"
                    aria-label={`Preview swatch in ${hsla}`}
                    style={{
                        height: 120,
                        borderRadius: 12,
                        background: `linear-gradient(45deg, #fff 25%, #f3f4f6 25%, #f3f4f6 50%, #fff 50%, #fff 75%, #f3f4f6 75%)`,
                        backgroundSize: "16px 16px",
                        display: "grid",
                        placeItems: "center",
                        border: "1px solid #E5E7EB",
                        overflow: "hidden"
                    }}
                >
                    <div style={{ width: "90%", height: "80%", background: hsla, borderRadius: 10 }} />
                </div>

                <div style={{ display: "grid", gap: 8 }}>
                    <code style={{ background: "#F3F4F6", padding: "8px 10px", borderRadius: 8 }}>
                        {`background-color: ${hsl};`}
                    </code>
                    <code style={{ background: "#F3F4F6", padding: "8px 10px", borderRadius: 8 }}>
                        {`background-color: ${hsla};`}
                    </code>
                </div>

                <p style={{ color: "#6B7280", fontSize: 12, margin: 0 }}>
                    Tip: keep S and L fixed and rotate H to build a palette.
                </p>
            </div>
        </div>
    );
}