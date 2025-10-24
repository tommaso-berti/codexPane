import { useState } from "react";

export default function ButtonPlayground() {
    const [styleType, setStyleType] = useState("skeuo");
    const [label, setLabel] = useState("Submit form");
    const [round, setRound] = useState(8);
    const [size, setSize] = useState("md");
    const [isHover, setIsHover] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const paddings = { sm: ".4rem .7rem", md: ".6rem 1rem", lg: ".9rem 1.2rem" };

    const base = {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        userSelect: "none",
        borderRadius: `${round}px`,
        padding: paddings[size],
        fontWeight: 600,
        lineHeight: 1.1,
        transition: "all 150ms ease",
        cursor: "pointer",
        outline: "none"
    };

    const skeuo = {
        ...base,
        background: "#f8fafc",
        border: "1px solid #111827",
        color: "#111827",
        boxShadow: isActive ? "0 0 0 #111827" : "0 5px 0 #111827",
        transform: isActive ? "translateY(5px)" : "translateY(0)",
    };

    const flat = {
        ...base,
        background: isHover ? "#1d4ed8" : "#2563eb",
        border: "none",
        color: "white",
        transform: isActive ? "translateY(1px) scale(0.995)" : "none"
    };

    const styles = styleType === "skeuo" ? skeuo : flat;

    return (
        <div style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "12px", marginBottom: "16px" }}>
                <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ width: 130 }}>Style</span>
                    <select value={styleType} onChange={e => setStyleType(e.target.value)}>
                        <option value="skeuo">Skeuomorphic</option>
                        <option value="flat">Flat</option>
                    </select>
                </label>
                <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ width: 130 }}>Label</span>
                    <input value={label} onChange={e => setLabel(e.target.value)} />
                </label>
                <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ width: 130 }}>Border radius</span>
                    <input type="range" min="0" max="24" value={round} onChange={e => setRound(Number(e.target.value))} />
                    <span>{round}px</span>
                </label>
                <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ width: 130 }}>Size</span>
                    <select value={size} onChange={e => setSize(e.target.value)}>
                        <option value="sm">Small</option>
                        <option value="md">Medium</option>
                        <option value="lg">Large</option>
                    </select>
                </label>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <label style={{ display: "flex", gap: 6, alignItems: "center" }}>
                        <input type="checkbox" checked={isHover} onChange={e => setIsHover(e.target.checked)} />
                        Hover
                    </label>
                    <label style={{ display: "flex", gap: 6, alignItems: "center" }}>
                        <input type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} />
                        Active
                    </label>
                </div>
            </div>

            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                <button
                    type="button"
                    style={{
                        ...styles,
                        ...(styleType === "skeuo" && isHover ? { filter: "brightness(0.97)" } : {}),
                        ...(styleType === "skeuo" && isActive ? { filter: "brightness(0.95)" } : {})
                    }}
                >
                    {label}
                </button>

                <code style={{ fontSize: 12, background: "#0b1020", color: "#e2e8f0", padding: "10px 12px", borderRadius: 8, whiteSpace: "pre" }}>
                    {`/* accessibility hints */
button { cursor: pointer; }
button:focus-visible { outline: 3px solid #93c5fd; outline-offset: 2px; }`}
                </code>
            </div>
        </div>
    );
}