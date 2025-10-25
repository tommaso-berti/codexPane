import { useEffect, useMemo, useState } from "react";

const card = { border: "1px solid #e5e7eb", borderRadius: "12px", padding: "12px" };
const code = { background: "#0b1020", color: "#e5e7eb", borderRadius: 8, padding: "10px", fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace", fontSize: 13, overflowX: "auto" };
const label = { fontSize: 12, color: "#374151" };

export default function LoopVisualizer() {
    const [type, setType] = useState("for");
    const [times, setTimes] = useState(5);
    const [arrRaw, setArrRaw] = useState('["a","b","c"]');
    const arr = useMemo(() => { try { return JSON.parse(arrRaw); } catch { return null; } }, [arrRaw]);

    const [trace, setTrace] = useState([]);

    useEffect(() => {
        const out = [];
        if (type === "for") {
            for (let i = 0; i < Number(times); i++) {
                out.push({ i, value: undefined });
            }
        } else if (type === "forof" && Array.isArray(arr)) {
            let idx = 0;
            for (const v of arr) {
                out.push({ i: idx++, value: v });
            }
        } else if (type === "while") {
            let i = 0;
            while (i < Number(times)) {
                out.push({ i, value: undefined });
                i++;
            }
        }
        setTrace(out);
    }, [type, times, arr]);

    return (
        <div style={card}>
            <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:8}}>
                <div>
                    <div style={label}>Loop type</div>
                    <select value={type} onChange={e=>setType(e.target.value)} style={{width:"100%"}}>
                        <option value="for">for (counter)</option>
                        <option value="forof">for…of (values)</option>
                        <option value="while">while (condition)</option>
                    </select>
                </div>
                {type !== "forof" && (
                    <div>
                        <div style={label}>Iterations</div>
                        <input type="number" value={times} min={0} onChange={e=>setTimes(e.target.value)} style={{width:"100%"}} />
                    </div>
                )}
                {type === "forof" && (
                    <div>
                        <div style={label}>Iterable array (JSON)</div>
                        <input value={arrRaw} onChange={e=>setArrRaw(e.target.value)} style={{width:"100%"}} />
                    </div>
                )}
            </div>

            <div style={{marginTop:10}}>
                <div style={{...label, marginBottom:6}}><strong>Trace</strong> (step → index/value)</div>
                <pre style={code}>{trace.map((t, k) => `${k}: i=${t.i}` + (t.value !== undefined ? `, value=${JSON.stringify(t.value)}` : "")).join("\n")}</pre>
            </div>

            <div style={{...label, marginTop:8}}>
                <strong>Reminder:</strong> for-of iterates values; for/while control the counter explicitly.
            </div>
        </div>
    );
}