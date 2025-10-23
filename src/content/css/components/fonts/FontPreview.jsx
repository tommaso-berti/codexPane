import { useState } from "react";

const SAMPLE =
    "The quick brown fox jumps over the lazy dog — 0123456789.";

const PRESETS = [
    { label: "System UI (sans)", stack: 'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif' },
    { label: "Humanist sans", stack: 'Gill Sans, "Segoe UI", Calibri, sans-serif' },
    { label: "Transitional serif", stack: 'Georgia, "Times New Roman", serif' },
    { label: "Old-style serif", stack: 'Garamond, "Times New Roman", serif' },
    { label: "Monospace", stack: 'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace' }
];

export default function FontPreview() {
    const [family, setFamily] = useState(PRESETS[0].stack);
    const [size, setSize] = useState(18);
    const [weight, setWeight] = useState(400);
    const [lineHeight, setLineHeight] = useState(1.6);

    return (
        <section aria-label="Font stack playground" style={{border:"1px solid #e5e7eb", borderRadius:12, padding:16}}>
            <div style={{display:"grid", gap:12, gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", alignItems:"end"}}>
                <label style={{display:"grid", gap:6}}>
                    <span style={{fontSize:12, color:"#374151"}}>Font family</span>
                    <select
                        value={family}
                        onChange={e=>setFamily(e.target.value)}
                        style={{padding:"8px 10px", borderRadius:8, border:"1px solid #d1d5db"}}
                    >
                        {PRESETS.map(p => <option key={p.label} value={p.stack}>{p.label}</option>)}
                    </select>
                </label>

                <label style={{display:"grid", gap:6}}>
                    <span style={{fontSize:12, color:"#374151"}}>Weight ({weight})</span>
                    <input
                        type="range" min="100" max="900" step="100"
                        value={weight}
                        onChange={e=>setWeight(parseInt(e.target.value,10))}
                    />
                </label>

                <label style={{display:"grid", gap:6}}>
                    <span style={{fontSize:12, color:"#374151"}}>Size ({size}px)</span>
                    <input
                        type="range" min="12" max="36" step="1"
                        value={size}
                        onChange={e=>setSize(parseInt(e.target.value,10))}
                    />
                </label>

                <label style={{display:"grid", gap:6}}>
                    <span style={{fontSize:12, color:"#374151"}}>Line height ({lineHeight})</span>
                    <input
                        type="range" min="1.2" max="2" step="0.1"
                        value={lineHeight}
                        onChange={e=>setLineHeight(parseFloat(e.target.value))}
                    />
                </label>
            </div>

            <div
                style={{
                    marginTop:16,
                    padding:16,
                    border:"1px dashed #d1d5db",
                    borderRadius:10,
                    fontFamily: family,
                    fontWeight: weight,
                    fontSize: size,
                    lineHeight: lineHeight
                }}
            >
                <p style={{margin:0}}>{SAMPLE}</p>
            </div>

            <code style={{display:"block", marginTop:12, fontSize:12, color:"#4b5563"}}>
                font-family: <span style={{color:"#111827"}}>{family}</span>; &nbsp;
                font-weight: <span style={{color:"#111827"}}>{weight}</span>; &nbsp;
                font-size: <span style={{color:"#111827"}}>{size}px</span>; &nbsp;
                line-height: <span style={{color:"#111827"}}>{lineHeight}</span>;
            </code>
        </section>
    );
}