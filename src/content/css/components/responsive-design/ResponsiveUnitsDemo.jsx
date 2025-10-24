import { useState } from "react";

export default function ResponsiveUnitsDemo() {
    const [root, setRoot] = useState(16);
    const [parentSize, setParentSize] = useState(1);
    const [containerWidth, setContainerWidth] = useState(60);

    const rootStyle = { fontSize: `${root}px`, lineHeight: 1.4 };

    return (
        <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 16, boxShadow: "0 1px 3px rgba(0,0,0,.06)", background: "#fff", marginBottom: 24 }}>
            <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", alignItems: "end" }}>
                <label>
                    <div style={{ fontSize: 12, color: "#6b7280" }}>Root font-size (html)</div>
                    <input type="range" min="12" max="22" value={root} onChange={e => setRoot(parseInt(e.target.value, 10))} />
                    <div style={{ fontSize: 12 }}>{root}px = 1rem</div>
                </label>
                <label>
                    <div style={{ fontSize: 12, color: "#6b7280" }}>Parent text size (em)</div>
                    <input type="range" min="0.75" max="2" step="0.05" value={parentSize} onChange={e => setParentSize(parseFloat(e.target.value))} />
                    <div style={{ fontSize: 12 }}>{parentSize}em</div>
                </label>
                <label>
                    <div style={{ fontSize: 12, color: "#6b7280" }}>Container width (%)</div>
                    <input type="range" min="30" max="100" value={containerWidth} onChange={e => setContainerWidth(parseInt(e.target.value, 10))} />
                    <div style={{ fontSize: 12 }}>{containerWidth}%</div>
                </label>
            </div>

            <div style={{ ...rootStyle, marginTop: 16 }}>
                <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
                    <div style={{ border: "1px solid #d1d5db", borderRadius: 10, padding: 12 }}>
                        <div style={{ fontWeight: 600, marginBottom: 8 }}>em vs rem</div>
                        <div style={{ fontSize: `${parentSize}em`, padding: "0.5em", background: "#f9fafb", borderRadius: 8 }}>
                            <div style={{ marginBottom: 6 }}>Parent text = {parentSize}em</div>
                            <div style={{ fontSize: "1em", background: "#e5e7eb", padding: "0.5em", borderRadius: 6 }}>1em (relative to parent)</div>
                            <div style={{ fontSize: "1rem", background: "#e0f2fe", padding: "0.5rem", borderRadius: 6, marginTop: 6 }}>1rem (relative to root)</div>
                        </div>
                        <div style={{ fontSize: 12, color: "#6b7280", marginTop: 8 }}>
                            Change sliders to see how <code>em</code> follows the parent while <code>rem</code> follows the root.
                        </div>
                    </div>

                    <div style={{ border: "1px solid #d1d5db", borderRadius: 10, padding: 12 }}>
                        <div style={{ fontWeight: 600, marginBottom: 8 }}>% layout</div>
                        <div style={{ width: `${containerWidth}%`, background: "#f3f4f6", borderRadius: 8, padding: 8 }}>
                            <div style={{ height: 120, background: "linear-gradient(135deg,#c7d2fe,#93c5fd)", display: "grid", placeItems: "center", borderRadius: 6 }}>
                                <div style={{ width: "50%", height: "50%", background: "rgba(255,255,255,0.7)", borderRadius: 4, display: "grid", placeItems: "center", fontSize: 12 }}>
                                    50% × 50%
                                </div>
                            </div>
                            <div style={{ fontSize: 12, color: "#6b7280", marginTop: 8 }}>
                                Child sizes are relative to parent. Beware of 100% width with padding/border (use <code>box-sizing: border-box</code>).
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}