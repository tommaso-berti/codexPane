import { useMemo, useState } from "react";

const card = { border: "1px solid #e5e7eb", borderRadius: "12px", padding: "12px" };
const code = { background: "#0b1020", color: "#e5e7eb", borderRadius: 8, padding: "10px", fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace", fontSize: 13, overflowX: "auto" };
const label = { fontSize: 12, color: "#374151" };

function addTwo(x){ return x + 2; }
function double(x){ return x * 2; }

export default function CallbackTracer() {
    const [fn, setFn] = useState("addTwo");
    const [val, setVal] = useState(5);

    const trace = useMemo(() => {
        const cb = fn === "addTwo" ? addTwo : double;
        const before = Number(val);
        const after = cb(before);
        return [
            `higherOrderFunc(cb, ${before})`,
            `↳ invoking ${cb.name}(${before})`,
            `↳ ${cb.name} returned ${after}`,
            `→ final result: ${after}`
        ].join("\n");
    }, [fn, val]);

    return (
        <div style={card}>
            <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:8}}>
                <div>
                    <div style={label}>Callback function</div>
                    <select value={fn} onChange={e=>setFn(e.target.value)} style={{width:"100%"}}>
                        <option value="addTwo">addTwo(x) → x + 2</option>
                        <option value="double">double(x) → x * 2</option>
                    </select>
                </div>
                <div>
                    <div style={label}>Value</div>
                    <input type="number" value={val} onChange={e=>setVal(e.target.value)} style={{width:"100%"}} />
                </div>
            </div>

            <div style={{marginTop:10}}>
                <div style={{...label, marginBottom:6}}><strong>Invocation trace</strong></div>
                <pre style={code}>{trace}</pre>
            </div>

            <div style={{...label, marginTop:6}}>
                Pass the <em>function itself</em> (no parentheses) to avoid passing its return value.
            </div>
        </div>
    );
}