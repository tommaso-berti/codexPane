import { useMemo, useState } from "react";

export default function GridPlayground() {
    const [cols, setCols] = useState("repeat(3, 1fr)");
    const [rows, setRows] = useState("repeat(2, 120px)");
    const [gapR, setGapR] = useState(12);
    const [gapC, setGapC] = useState(12);
    const [jItems, setJItems] = useState("stretch");
    const [aItems, setAItems] = useState("stretch");
    const [jContent, setJContent] = useState("start");
    const [aContent, setAContent] = useState("start");
    const [autoFlow, setAutoFlow] = useState("row");
    const [autoRows, setAutoRows] = useState("100px");
    const [autoCols, setAutoCols] = useState("100px");
    const [spanItem, setSpanItem] = useState(3); // which card spans
    const [rowSpan, setRowSpan] = useState(1);
    const [colSpan, setColSpan] = useState(2);

    const items = useMemo(() => Array.from({ length: 8 }, (_, i) => i + 1), []);

    const containerStyle = {
        display: "grid",
        gridTemplateColumns: cols,
        gridTemplateRows: rows,
        rowGap: `${gapR}px`,
        columnGap: `${gapC}px`,
        justifyItems: jItems,
        alignItems: aItems,
        justifyContent: jContent,
        alignContent: aContent,
        gridAutoFlow: autoFlow,
        gridAutoRows: autoRows,
        gridAutoColumns: autoCols,
        height: "min(420px, 60vh)",
        padding: 12,
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        background: "#fafafa",
        overflow: "auto"
    };

    const cardBase = {
        background: "linear-gradient(180deg,#eef2ff,#e0e7ff)",
        color: "#111827",
        border: "1px solid #c7d2fe",
        borderRadius: 10,
        padding: 12,
        fontWeight: 600,
        boxShadow: "0 1px 0 rgba(0,0,0,.04)"
    };

    return (
        <div style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(220px, 1fr))", gap: 12, marginBottom: 16 }}>
                <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <span>grid-template-columns</span>
                    <input value={cols} onChange={e => setCols(e.target.value)} placeholder="e.g. repeat(3, 1fr)" />
                    <small>Examples: <code>repeat(3, 1fr)</code>, <code>200px 1fr 2fr</code>, <code>100px minmax(120px, 1fr)</code></small>
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <span>grid-template-rows</span>
                    <input value={rows} onChange={e => setRows(e.target.value)} placeholder="e.g. repeat(2, 120px)" />
                    <small>Examples: <code>repeat(2, 120px)</code>, <code>auto 1fr</code></small>
                </label>

                <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ width: 130 }}>row-gap</span>
                    <input type="range" min="0" max="40" value={gapR} onChange={e => setGapR(Number(e.target.value))} />
                    <span>{gapR}px</span>
                </label>
                <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ width: 130 }}>column-gap</span>
                    <input type="range" min="0" max="40" value={gapC} onChange={e => setGapC(Number(e.target.value))} />
                    <span>{gapC}px</span>
                </label>

                <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ width: 130 }}>justify-items</span>
                    <select value={jItems} onChange={e => setJItems(e.target.value)}>
                        {["start","end","center","stretch"].map(v => <option key={v}>{v}</option>)}
                    </select>
                </label>
                <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ width: 130 }}>align-items</span>
                    <select value={aItems} onChange={e => setAItems(e.target.value)}>
                        {["start","end","center","stretch"].map(v => <option key={v}>{v}</option>)}
                    </select>
                </label>

                <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ width: 130 }}>justify-content</span>
                    <select value={jContent} onChange={e => setJContent(e.target.value)}>
                        {["start","end","center","stretch","space-around","space-between","space-evenly"].map(v => <option key={v}>{v}</option>)}
                    </select>
                </label>
                <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ width: 130 }}>align-content</span>
                    <select value={aContent} onChange={e => setAContent(e.target.value)}>
                        {["start","end","center","stretch","space-around","space-between","space-evenly"].map(v => <option key={v}>{v}</option>)}
                    </select>
                </label>

                <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ width: 130 }}>grid-auto-flow</span>
                    <select value={autoFlow} onChange={e => setAutoFlow(e.target.value)}>
                        {["row","column","row dense","column dense"].map(v => <option key={v}>{v}</option>)}
                    </select>
                </label>
                <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ width: 130 }}>grid-auto-rows</span>
                    <input value={autoRows} onChange={e => setAutoRows(e.target.value)} />
                </label>
                <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ width: 130 }}>grid-auto-columns</span>
                    <input value={autoCols} onChange={e => setAutoCols(e.target.value)} />
                </label>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                    <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span>span item</span>
                        <select value={spanItem} onChange={e => setSpanItem(Number(e.target.value))}>
                            {items.map(i => <option key={i} value={i}>{i}</option>)}
                        </select>
                    </label>
                    <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span>row span</span>
                        <input type="number" min="1" max="6" value={rowSpan} onChange={e => setRowSpan(Math.max(1, Number(e.target.value)))} />
                    </label>
                    <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span>col span</span>
                        <input type="number" min="1" max="6" value={colSpan} onChange={e => setColSpan(Math.max(1, Number(e.target.value)))} />
                    </label>
                </div>
            </div>

            <div style={containerStyle} aria-label="Grid preview">
                {items.map(n => {
                    const isSpan = n === spanItem;
                    return (
                        <div
                            key={n}
                            style={{
                                ...cardBase,
                                ...(isSpan ? { gridRow: `span ${rowSpan}`, gridColumn: `span ${colSpan}`, background: "linear-gradient(180deg,#cffafe,#a5f3fc)", borderColor: "#22d3ee" } : {})
                            }}
                        >
                            Item {n}{isSpan ? " (span)" : ""}
                        </div>
                    );
                })}
            </div>

            <details style={{ marginTop: 14 }}>
                <summary style={{ cursor: "pointer", fontWeight: 600 }}>Generated CSS (copy-ready)</summary>
                <pre style={{ background: "#0b1020", color: "#e2e8f0", padding: 12, borderRadius: 8, overflow: "auto" }}>
{`/* container */
.grid {
  display: grid;
  grid-template-columns: ${cols};
  grid-template-rows: ${rows};
  row-gap: ${gapR}px;
  column-gap: ${gapC}px;
  justify-items: ${jItems};
  align-items: ${aItems};
  justify-content: ${jContent};
  align-content: ${aContent};
  grid-auto-flow: ${autoFlow};
  grid-auto-rows: ${autoRows};
  grid-auto-columns: ${autoCols};
}

/* example spanned item */
.item-span {
  grid-row: span ${rowSpan};
  grid-column: span ${colSpan};
}`}
        </pre>
            </details>
        </div>
    );
}