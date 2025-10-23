import { useState, useMemo } from "react";

export default function PositionPlayground() {
    const [pos, setPos] = useState("relative"); // static | relative | absolute | fixed | sticky
    const [top, setTop] = useState(16);
    const [left, setLeft] = useState(16);
    const [ancestor, setAncestor] = useState(true);

    const code = useMemo(() => {
        const lines = [];
        lines.push(".box {");
        lines.push(`  position: ${pos};`);
        if (pos !== "static") {
            lines.push(`  top: ${top}px;`);
            lines.push(`  left: ${left}px;`);
        }
        if (pos === "sticky") lines.push("  /* sticks when scrolling past top */");
        lines.push("}");
        if (ancestor) lines.push(".anchor { position: relative; }");
        return lines.join("\n");
    }, [pos, top, left, ancestor]);

    const boxStyle = {
        position: pos,
        top: pos !== "static" ? top : undefined,
        left: pos !== "static" ? left : undefined,
        background: "#22c55e",
        color: "#052e16",
        border: "2px solid #14532d",
        borderRadius: 8,
        padding: "8px 12px",
        width: 160,
        boxShadow: "0 2px 6px rgba(0,0,0,.08)",
        zIndex: 1
    };

    return (
        <div style={{ display: "grid", gap: 12 }}>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
                <label>position:&nbsp;
                    <select value={pos} onChange={e=>setPos(e.target.value)}>
                        <option>static</option>
                        <option>relative</option>
                        <option>absolute</option>
                        <option>fixed</option>
                        <option>sticky</option>
                    </select>
                </label>
                <label>top:&nbsp;
                    <input type="range" min="-40" max="160" value={top} onChange={e=>setTop(+e.target.value)} />
                    <span style={{ fontSize: 12, marginLeft: 6 }}>{top}px</span>
                </label>
                <label>left:&nbsp;
                    <input type="range" min="-40" max="160" value={left} onChange={e=>setLeft(+e.target.value)} />
                    <span style={{ fontSize: 12, marginLeft: 6 }}>{left}px</span>
                </label>
                <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <input type="checkbox" checked={ancestor} onChange={e=>setAncestor(e.target.checked)} />
                    positioned ancestor
                </label>
            </div>

            <div style={{
                height: 280,
                border: "1px solid #e5e7eb",
                borderRadius: 12,
                overflow: "auto",
                position: "relative",
                background: "linear-gradient(180deg,#fff, #f8fafc)"
            }}>
                <div style={{
                    position: "sticky",
                    top: 0,
                    background: "#fff",
                    borderBottom: "1px solid #e5e7eb",
                    padding: 8,
                    zIndex: 2
                }}>
                    Scroll inside this area — sticky header
                </div>

                <div className={ancestor ? "anchor" : undefined} style={{
                    position: ancestor ? "relative" : "static",
                    border: ancestor ? "1px dashed #94a3b8" : "none",
                    margin: 16,
                    padding: 16,
                    borderRadius: 8,
                    minHeight: 180,
                    background: "rgba(148,163,184,.08)"
                }}>
                    <div style={boxStyle} className="box">
                        I am {pos}
                    </div>
                    <p style={{ maxWidth: 420, color: "#334155", fontSize: 14, marginTop: 8 }}>
                        Toggle “positioned ancestor” to see how <code>absolute</code> changes its anchor.
                        Try switching to <code>fixed</code> and scroll — notice it pins to the viewport.
                    </p>
                    <div style={{ height: 360 }} />
                </div>
            </div>

            <pre style={{
                margin: 0, background: "#0b1220", color: "#e2e8f0",
                padding: 12, borderRadius: 8, overflow: "auto"
            }}>
        <code>{code}</code>
      </pre>
        </div>
    );
}