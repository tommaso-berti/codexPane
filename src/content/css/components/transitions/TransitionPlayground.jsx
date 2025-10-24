import { useMemo, useState } from "react";

const EASES = [
    "ease",
    "linear",
    "ease-in",
    "ease-out",
    "ease-in-out",
    "cubic-bezier(0.4, 0, 0.2, 1)"
];

const PROPS = [
    { key: "background-color", label: "background-color" },
    { key: "color", label: "color" },
    { key: "font-size", label: "font-size" },
    { key: "transform", label: "transform (scale)" },
    { key: "border-radius", label: "border-radius" },
];

export default function TransitionPlayground() {
    const [selected, setSelected] = useState(["background-color", "font-size"]);
    const [duration, setDuration] = useState(800); // ms
    const [delay, setDelay] = useState(0); // ms
    const [ease, setEase] = useState("ease");
    const [hovered, setHovered] = useState(false);

    const transitionString = useMemo(() => {
        const dur = `${duration}ms`;
        const del = `${delay}ms`;
        return selected
            .map((p) => `${p} ${dur} ${ease} ${del}`)
            .join(", ");
    }, [selected, duration, delay, ease]);

    const baseStyle = {
        transition: transitionString,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 180,
        height: 96,
        borderRadius: 12,
        border: "1px solid #d0d7de",
        cursor: "pointer",
        userSelect: "none",
        gap: 8,
        padding: 16,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        background: hovered ? "#16a34a" : "#2563eb",
        color: hovered ? "white" : "white",
        fontSize: hovered ? 24 : 18,
        transform: selected.includes("transform")
            ? (hovered ? "scale(1.07)" : "scale(1)")
            : "none",
        borderTopLeftRadius: selected.includes("border-radius")
            ? (hovered ? 28 : 12)
            : 12,
    };

    function toggleSelected(key) {
        setSelected((prev) =>
            prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
        );
    }

    return (
        <div style={{ display: "grid", gap: 16 }}>
            <div
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={baseStyle}
                title="Hover me"
            >
                Hover me
            </div>

            <div style={{ display: "grid", gap: 10, gridTemplateColumns: "1fr 1fr", alignItems: "center" }}>
                <label style={{ fontWeight: 600 }}>Duration (ms)</label>
                <input
                    type="range"
                    min="0"
                    max="3000"
                    step="50"
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value, 10))}
                />
                <div />
                <div style={{ fontSize: 12, color: "#666" }}>{duration} ms</div>

                <label style={{ fontWeight: 600 }}>Delay (ms)</label>
                <input
                    type="range"
                    min="0"
                    max="2000"
                    step="50"
                    value={delay}
                    onChange={(e) => setDelay(parseInt(e.target.value, 10))}
                />
                <div />
                <div style={{ fontSize: 12, color: "#666" }}>{delay} ms</div>

                <label style={{ fontWeight: 600 }}>Timing function</label>
                <select value={ease} onChange={(e) => setEase(e.target.value)}>
                    {EASES.map((e) => (
                        <option key={e} value={e}>
                            {e}
                        </option>
                    ))}
                </select>

                <label style={{ fontWeight: 600 }}>Properties</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {PROPS.map((p) => (
                        <label key={p.key} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14 }}>
                            <input
                                type="checkbox"
                                checked={selected.includes(p.key)}
                                onChange={() => toggleSelected(p.key)}
                            />
                            {p.label}
                        </label>
                    ))}
                </div>
            </div>

            <pre
                style={{
                    margin: 0,
                    padding: 12,
                    background: "#0b1020",
                    color: "#e2e8f0",
                    borderRadius: 12,
                    overflowX: "auto",
                    fontSize: 12,
                }}
            >
            {
                `/* Resulting CSS */
                .selector {
                  transition: ${transitionString};
                }`
            }
            </pre>
        </div>
    );
}