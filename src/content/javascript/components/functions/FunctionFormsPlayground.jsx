import { useMemo, useState } from "react";

const card = { border: "1px solid #e5e7eb", borderRadius: "12px", padding: "12px" };
const label = { fontSize: 12, color: "#374151" };
const code = { background: "#0b1020", color: "#e5e7eb", borderRadius: 8, padding: "10px", fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace", fontSize: 13, overflowX: "auto" };

export default function FunctionFormsPlayground() {
    const [width, setWidth] = useState(3);
    const [height, setHeight] = useState(4);
    const [form, setForm] = useState("declaration"); // declaration | expression | arrow
    const [implicit, setImplicit] = useState(false);

    const areaFnSrc = useMemo(() => {
        if (form === "declaration") {
            return `function rectArea(w, h) { return w * h; }`;
        } else if (form === "expression") {
            return `const rectArea = function (w, h) { return w * h; };`;
        } else {
            return implicit
                ? `const rectArea = (w, h) => w * h;`
                : `const rectArea = (w, h) => { return w * h; };`;
        }
    }, [form, implicit]);

    const area = Number(width) * Number(height);

    return (
        <div style={card}>
            <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:8}}>
                <div>
                    <div style={label}>Form</div>
                    <select value={form} onChange={e=>setForm(e.target.value)} style={{width:"100%"}}>
                        <option value="declaration">function declaration</option>
                        <option value="expression">function expression</option>
                        <option value="arrow">arrow function</option>
                    </select>
                </div>
                {form === "arrow" && (
                    <div>
                        <div style={label}>Arrow: implicit return</div>
                        <label style={{display:"flex", gap:8, alignItems:"center"}}>
                            <input type="checkbox" checked={implicit} onChange={e=>setImplicit(e.target.checked)} />
                            Use implicit return
                        </label>
                    </div>
                )}
                <div>
                    <div style={label}>width</div>
                    <input type="number" value={width} onChange={e=>setWidth(e.target.value)} style={{width:"100%"}} />
                </div>
                <div>
                    <div style={label}>height</div>
                    <input type="number" value={height} onChange={e=>setHeight(e.target.value)} style={{width:"100%"}} />
                </div>
            </div>

            <div style={{marginTop:10}}>
                <div style={{...label, marginBottom:6}}><strong>Function source</strong></div>
                <pre style={code}>{areaFnSrc}</pre>
            </div>

            <div style={{marginTop:10}}>
                <div style={{...label, marginBottom:6}}><strong>Result</strong></div>
                <pre style={code}>{`rectArea(${width}, ${height}) // → ${area}`}</pre>
            </div>

            <div style={{...label, marginTop:6}}>
                <strong>FYI:</strong> declarations are hoisted; expressions/arrow functions are not.
            </div>
        </div>
    );
}