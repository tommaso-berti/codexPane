import { useMemo, useState } from "react";

const controlsStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
    gap: "8px",
    marginBottom: "12px"
};
const card = { border: "1px solid #e5e7eb", borderRadius: "12px", padding: "12px" };
const label = { fontSize: 12, color: "#374151" };
const code = { background: "#0b1020", color: "#e5e7eb", borderRadius: 8, padding: "10px", fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace", fontSize: 13, overflowX: "auto" };

export default function ArrayMethodsPlayground() {
    const [raw, setRaw] = useState('["a","b","c","d","e"]');
    const [method, setMethod] = useState("map");
    const [mapOp, setMapOp] = useState("upper");
    const [filterVal, setFilterVal] = useState("c");
    const [sliceStart, setSliceStart] = useState(1);
    const [sliceEnd, setSliceEnd] = useState(3);
    const [spliceStart, setSpliceStart] = useState(1);
    const [spliceDelete, setSpliceDelete] = useState(1);

    const parsed = useMemo(() => {
        try { return JSON.parse(raw); } catch { return null; }
    }, [raw]);

    const destructive = method === "splice";
    const result = useMemo(() => {
        if (!Array.isArray(parsed)) return { error: "Input must be a JSON array." };
        const input = destructive ? [...parsed] : parsed; // show original intact but demonstrate mutation conceptually
        try {
            switch (method) {
                case "map":
                    return {
                        output: input.map(v => mapOp === "upper" && typeof v === "string" ? v.toUpperCase()
                            : mapOp === "double" && typeof v === "number" ? v * 2
                                : v),
                    };
                case "filter":
                    return {
                        output: input.filter(v => String(v) !== String(filterVal)),
                    };
                case "reduce":
                    return {
                        output: input.reduce((acc, v) => (typeof v === "number" ? acc + v : acc), 0),
                    };
                case "slice":
                    return { output: input.slice(Number(sliceStart), Number(sliceEnd)) };
                case "splice":
                    const clone = [...input];
                    const deleted = clone.splice(Number(spliceStart), Number(spliceDelete));
                    return { output: clone, deleted };
                default:
                    return { output: input };
            }
        } catch (e) {
            return { error: e.message };
        }
    }, [parsed, method, mapOp, filterVal, sliceStart, sliceEnd, spliceStart, spliceDelete, destructive]);

    return (
        <div style={{...card}}>
            <div style={controlsStyle}>
                <div>
                    <div style={label}>Input array (JSON)</div>
                    <textarea value={raw} onChange={e=>setRaw(e.target.value)} rows={3} style={{width:"100%", fontFamily:"monospace"}} />
                </div>
                <div>
                    <div style={label}>Method</div>
                    <select value={method} onChange={e=>setMethod(e.target.value)} style={{width:"100%"}}>
                        <option value="map">map (non-destructive)</option>
                        <option value="filter">filter (non-destructive)</option>
                        <option value="reduce">reduce (non-destructive)</option>
                        <option value="slice">slice (non-destructive)</option>
                        <option value="splice">splice (destructive)</option>
                    </select>
                </div>
                {method === "map" && (
                    <div>
                        <div style={label}>Map operation</div>
                        <select value={mapOp} onChange={e=>setMapOp(e.target.value)} style={{width:"100%"}}>
                            <option value="upper">toUpperCase (strings)</option>
                            <option value="double">×2 (numbers)</option>
                        </select>
                    </div>
                )}
                {method === "filter" && (
                    <div>
                        <div style={label}>Filter: remove equals</div>
                        <input value={filterVal} onChange={e=>setFilterVal(e.target.value)} style={{width:"100%"}} />
                    </div>
                )}
                {method === "slice" && (
                    <>
                        <div>
                            <div style={label}>start</div>
                            <input type="number" value={sliceStart} onChange={e=>setSliceStart(e.target.value)} style={{width:"100%"}} />
                        </div>
                        <div>
                            <div style={label}>end (excluded)</div>
                            <input type="number" value={sliceEnd} onChange={e=>setSliceEnd(e.target.value)} style={{width:"100%"}} />
                        </div>
                    </>
                )}
                {method === "splice" && (
                    <>
                        <div>
                            <div style={label}>start</div>
                            <input type="number" value={spliceStart} onChange={e=>setSpliceStart(e.target.value)} style={{width:"100%"}} />
                        </div>
                        <div>
                            <div style={label}>delete count</div>
                            <input type="number" value={spliceDelete} onChange={e=>setSpliceDelete(e.target.value)} style={{width:"100%"}} />
                        </div>
                    </>
                )}
            </div>
            <div style={{marginTop:8}}>
                <div style={{...label, marginBottom:6}}><strong>Before</strong> (original):</div>
                <pre style={code}>{Array.isArray(parsed) ? JSON.stringify(parsed) : "Invalid JSON array"}</pre>
            </div>
            <div style={{marginTop:8}}>
                <div style={{...label, marginBottom:6}}>
                    <strong>After</strong> {destructive ? "(splice: destructive)" : "(non-destructive)"}:
                </div>
                <pre style={code}>{result.error ? result.error : JSON.stringify(result.output)}</pre>
                {method === "splice" && (
                    <>
                        <div style={{...label, marginTop:6}}><strong>Deleted (splice return):</strong></div>
                        <pre style={code}>{JSON.stringify(result.deleted)}</pre>
                    </>
                )}
            </div>
        </div>
    );
}