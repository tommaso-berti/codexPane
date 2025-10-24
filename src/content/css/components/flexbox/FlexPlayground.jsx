import { useState } from "react";

const options = (arr) => arr.map(v => <option key={v} value={v}>{v}</option>);

export default function FlexPlayground() {
    const [direction, setDirection] = useState("row");
    const [justify, setJustify] = useState("flex-start");
    const [align, setAlign] = useState("stretch");
    const [wrap, setWrap] = useState("nowrap");
    const [alignContent, setAlignContent] = useState("stretch");
    const [gap, setGap] = useState(12);

    const boxBase = { padding: "8px 12px", borderRadius: 10, color: "#111" };
    const items = [
        { label: "A", style: { background: "#c7f9cc" } },
        { label: "B", style: { background: "#ffddd2" } },
        { label: "C", style: { background: "#bde0fe" } },
        { label: "D", style: { background: "#f1c0e8" } },
        { label: "E", style: { background: "#fde2e4" } }
    ];

    const containerStyle = {
        display: "flex",
        flexDirection: direction,
        justifyContent: justify,
        alignItems: align,
        flexWrap: wrap,
        alignContent: alignContent,
        gap: `${gap}px`,
        minHeight: 160,
        border: "1px solid #e5e7eb",
        borderRadius: 16,
        padding: 12,
        background: "#fff"
    };

    const controlStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: 12,
        marginBottom: 12
    };

    return (
        <div style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system", color: "#111827" }}>
            <div style={controlStyle}>
                <label>
                    <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>flex-direction</div>
                    <select value={direction} onChange={e => setDirection(e.target.value)} style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #e5e7eb" }}>
                        {options(["row","row-reverse","column","column-reverse"])}
                    </select>
                </label>
                <label>
                    <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>justify-content</div>
                    <select value={justify} onChange={e => setJustify(e.target.value)} style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #e5e7eb" }}>
                        {options(["flex-start","center","flex-end","space-between","space-around","space-evenly"])}
                    </select>
                </label>
                <label>
                    <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>align-items</div>
                    <select value={align} onChange={e => setAlign(e.target.value)} style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #e5e7eb" }}>
                        {options(["stretch","flex-start","center","flex-end","baseline"])}
                    </select>
                </label>
                <label>
                    <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>flex-wrap</div>
                    <select value={wrap} onChange={e => setWrap(e.target.value)} style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #e5e7eb" }}>
                        {options(["nowrap","wrap","wrap-reverse"])}
                    </select>
                </label>
                <label>
                    <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>align-content (multi-line)</div>
                    <select value={alignContent} onChange={e => setAlignContent(e.target.value)} style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #e5e7eb" }}>
                        {options(["stretch","flex-start","center","flex-end","space-between","space-around"])}
                    </select>
                </label>
                <label>
                    <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>gap</div>
                    <input type="range" min="0" max="40" value={gap} onChange={e => setGap(parseInt(e.target.value,10))} style={{ width: "100%" }} />
                </label>
            </div>

            <div style={containerStyle}>
                {items.map((it, i) => (
                    <div key={i} style={{ ...boxBase, ...it.style }}>
                        <div style={{ fontWeight: 600 }}>{it.label}</div>
                        <div style={{ fontSize: 12, color: "#374151" }}>grow 0, shrink 1</div>
                    </div>
                ))}
            </div>

            <div style={{ fontSize: 12, color: "#6b7280", marginTop: 8 }}>
                Tip: set <code>flex-wrap</code> to <code>wrap</code> and increase <code>gap</code> to see <code>align-content</code> in action.
            </div>
        </div>
    );
}