import { useState } from "react";

export default function BoxSizingDemo() {
    const [width, setWidth] = useState(220);
    const [padding, setPadding] = useState(16);
    const [border, setBorder] = useState(8);

    const totalContentBox = width + 2 * padding + 2 * border;
    const totalBorderBox = width; // width already includes padding+border

    const label = (text) => (
        <span style={{ fontSize: 12, color: "#555" }}>{text}</span>
    );

    const controlStyle = { display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", marginBottom: 16 };

    const boxBase = {
        height: 100,
        background: "linear-gradient(135deg,#e0f2fe 0%,#f1f5f9 100%)",
        color: "#0f172a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderStyle: "solid",
        margin: 8
    };

    return (
        <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 16 }}>
            <div style={controlStyle}>
                <div>
                    {label("width")}<br/>
                    <input type="range" min="140" max="320" value={width} onChange={e=>setWidth(+e.target.value)} />
                    <div style={{ fontSize: 12 }}>{width}px</div>
                </div>
                <div>
                    {label("padding")}<br/>
                    <input type="range" min="0" max="40" value={padding} onChange={e=>setPadding(+e.target.value)} />
                    <div style={{ fontSize: 12 }}>{padding}px each side</div>
                </div>
                <div>
                    {label("border")}<br/>
                    <input type="range" min="0" max="20" value={border} onChange={e=>setBorder(+e.target.value)} />
                    <div style={{ fontSize: 12 }}>{border}px</div>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ border: "1px dashed #cbd5e1", borderRadius: 10, padding: 12 }}>
                    <div style={{ fontWeight: 600, marginBottom: 8 }}>content-box (default)</div>
                    <div
                        style={{
                            ...boxBase,
                            width,
                            padding,
                            borderWidth: border,
                            boxSizing: "content-box",
                            outline: "2px solid rgba(59,130,246,.2)"
                        }}
                    >
                        Declared width {width}px
                    </div>
                    <div style={{ fontSize: 12, color: "#334155" }}>
                        Total rendered width = <b>{totalContentBox}px</b> (width + 2×padding + 2×border)
                    </div>
                </div>

                <div style={{ border: "1px dashed #cbd5e1", borderRadius: 10, padding: 12 }}>
                    <div style={{ fontWeight: 600, marginBottom: 8 }}>border-box</div>
                    <div
                        style={{
                            ...boxBase,
                            width,
                            padding,
                            borderWidth: border,
                            boxSizing: "border-box",
                            outline: "2px solid rgba(16,185,129,.2)"
                        }}
                    >
                        Declared width {width}px
                    </div>
                    <div style={{ fontSize: 12, color: "#334155" }}>
                        Total rendered width = <b>{totalBorderBox}px</b> (fixed)
                    </div>
                </div>
            </div>
        </div>
    );
}