import { useMemo, useState } from "react";

export default function TablePlayground() {
    const [days, setDays] = useState(["Saturday", "Sunday"]);
    const [useHead, setUseHead] = useState(true);
    const [useFoot, setUseFoot] = useState(true);
    const [rowspan, setRowspan] = useState(false);
    const [colspan, setColspan] = useState(false);
    const [temperatures, setTemperatures] = useState({ Morning: 73, Afternoon: 78, Evening: 70 });

    const total = useMemo(
        () => Object.values(temperatures).reduce((a, b) => a + Number(b || 0), 0),
        [temperatures]
    );

    const toggleDay = (day) => {
        setDays((prev) =>
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
        );
    };

    const onTempChange = (key, value) =>
        setTemperatures((t) => ({ ...t, [key]: value.replace(/[^\d-]/g, "") }));

    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: 1.4 }}>
            <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", marginBottom: 16 }}>
                <fieldset style={fieldset}>
                    <legend style={legend}>Columns</legend>
                    {["Saturday", "Sunday", "Monday"].map((d) => (
                        <label key={d} style={label}>
                            <input type="checkbox" checked={days.includes(d)} onChange={() => toggleDay(d)} /> {d}
                        </label>
                    ))}
                </fieldset>

                <fieldset style={fieldset}>
                    <legend style={legend}>Sections</legend>
                    <label style={label}><input type="checkbox" checked={useHead} onChange={e => setUseHead(e.target.checked)} /> thead</label>
                    <label style={label}><input type="checkbox" checked={useFoot} onChange={e => setUseFoot(e.target.checked)} /> tfoot</label>
                </fieldset>

                <fieldset style={fieldset}>
                    <legend style={legend}>Span</legend>
                    <label style={label}><input type="checkbox" checked={rowspan} onChange={e => setRowspan(e.target.checked)} /> rowspan example</label>
                    <label style={label}><input type="checkbox" checked={colspan} onChange={e => setColspan(e.target.checked)} /> colspan example</label>
                </fieldset>

                <fieldset style={fieldset}>
                    <legend style={legend}>Data (°F)</legend>
                    {Object.keys(temperatures).map((k) => (
                        <label key={k} style={label}>
                            {k}: <input value={temperatures[k]} onChange={(e) => onTempChange(k, e.target.value)} style={input} />
                        </label>
                    ))}
                </fieldset>
            </div>

            <div style={{ overflowX: "auto" }}>
                <table style={table}>
                    {useHead && (
                        <thead>
                        <tr>
                            <th></th>
                            {days.map((d) => (
                                <th key={d} scope="col">{d}</th>
                            ))}
                        </tr>
                        </thead>
                    )}

                    <tbody>
                    <tr>
                        <th scope="row">Morning</th>
                        {rowspan ? (
                            <>
                                <td rowSpan={2}>Work</td>
                                {days.slice(1).map((d) => <td key={`m-${d}`}>{temperatures.Morning}</td>)}
                            </>
                        ) : (
                            days.map((d) => <td key={`m-${d}`}>{temperatures.Morning}</td>)
                        )}
                    </tr>
                    <tr>
                        <th scope="row">Afternoon</th>
                        {rowspan ? (
                            <>
                                {/* cell already spanned above */}
                                {days.slice(1).map((d) => <td key={`a-${d}`}>{temperatures.Afternoon}</td>)}
                            </>
                        ) : (
                            days.map((d) => <td key={`a-${d}`}>{temperatures.Afternoon}</td>)
                        )}
                    </tr>
                    <tr>
                        <th scope="row">Evening</th>
                        {colspan ? (
                            <>
                                <td colSpan={Math.max(1, days.length - 1)}>Dinner</td>
                                {days.length > 1 && <td>{temperatures.Evening}</td>}
                            </>
                        ) : (
                            days.map((d) => <td key={`e-${d}`}>{temperatures.Evening}</td>)
                        )}
                    </tr>
                    </tbody>

                    {useFoot && (
                        <tfoot>
                        <tr>
                            <td></td>
                            <td colSpan={Math.max(1, days.length)}>Totals: {total}</td>
                        </tr>
                        </tfoot>
                    )}
                </table>
            </div>

            <p style={{ color: "#555", fontSize: 14, marginTop: 8 }}>
                This demo shows <code>scope</code> on headers, and interactive <code>rowspan</code>/<code>colspan</code>, plus optional <code>thead</code>/<code>tfoot</code>.
            </p>
        </div>
    );
}

const table = {
    borderCollapse: "collapse",
    minWidth: 420,
    width: "100%"
};

const fieldset = {
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    padding: 12
};

const legend = {
    padding: "0 4px",
    color: "#374151",
    fontWeight: 600
};

const label = {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 6
};

const input = {
    width: 64,
    padding: "4px 6px",
    border: "1px solid #d1d5db",
    borderRadius: 6
};