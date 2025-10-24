import { useMemo, useState } from "react";

const fieldStyle = {
    flex: 1,
    padding: "8px 10px",
    border: "1px solid #d1d5db",
    borderRadius: 6,
    outline: "none",
};

const focusRing = {
    boxShadow: "0 0 0 3px rgba(59,130,246,0.3)",
    borderColor: "#60a5fa",
};

export default function BreadcrumbPlayground() {
    const [separator, setSeparator] = useState(">");
    const [style, setStyle] = useState("simple"); // simple | arrows
    const [segments, setSegments] = useState("Home, Fashion, Shoes, Sneakers");
    const [abbreviate, setAbbreviate] = useState(false); // checkbox: abbreviate head

    const items = useMemo(
        () => segments.split(",").map((s) => s.trim()).filter(Boolean),
        [segments]
    );

    const visible = useMemo(() => {
        if (!abbreviate) return items;
        if (items.length <= 3) return items; // niente ellissi per liste corte
        // mostra ellissi + ultime 2 voci
        return ["…", ...items.slice(-2)];
    }, [items, abbreviate]);

    // handler per focus ring
    const onFocus = (e) => (e.currentTarget.style.boxShadow = focusRing.boxShadow);
    const onBlur = (e) => (e.currentTarget.style.boxShadow = "none");

    return (
        <div style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto" }}>
            <div style={{ display: "grid", gap: 12, marginBottom: 16 }}>
                <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ width: 150 }}>Segments</span>
                    <input
                        style={fieldStyle}
                        value={segments}
                        onChange={(e) => setSegments(e.target.value)}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        aria-label="breadcrumb segments"
                    />
                </label>

                <div style={{ display: "grid", gap: 8, gridTemplateColumns: "1fr 1fr" }}>
                    <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span>Separator</span>
                        <select
                            value={separator}
                            onChange={(e) => setSeparator(e.target.value)}
                            style={{ ...fieldStyle, flex: "unset" }}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            aria-label="breadcrumb separator"
                        >
                            <option value="/">{"/"}</option>
                            <option value=">">{">"}</option>
                            <option value="›">{"›"}</option>
                            <option value="»">{"»"}</option>
                        </select>
                    </label>

                    <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span>Style</span>
                        <select
                            value={style}
                            onChange={(e) => setStyle(e.target.value)}
                            style={{ ...fieldStyle, flex: "unset" }}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            aria-label="breadcrumb style"
                        >
                            <option value="simple">Simple</option>
                            <option value="arrows">Arrows</option>
                        </select>
                    </label>
                </div>

                {/* Checkbox al posto del number input */}
                <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ width: 150 }}>Abbreviate first</span>
                    <input
                        type="checkbox"
                        checked={abbreviate}
                        onChange={(e) => setAbbreviate(e.target.checked)}
                        aria-label="abbreviate head items"
                        style={{
                            width: 18,
                            height: 18,
                            cursor: "pointer",
                            border: "1px solid #d1d5db",
                            borderRadius: 4,
                            accentColor: "#2563eb",
                        }}
                    />
                </label>
            </div>

            {/* Preview */}
            {style === "simple" ? (
                <nav aria-label="Breadcrumb">
                    <ol
                        style={{
                            display: "flex",
                            gap: 6,
                            alignItems: "center",
                            padding: 0,
                            margin: 0,
                            listStyle: "none",
                        }}
                    >
                        {visible.map((label, i) => {
                            const isLast = i === visible.length - 1;
                            const isEllipsis = label === "…";
                            return (
                                <li
                                    key={i}
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        color: isLast ? "#111827" : "#2563eb",
                                    }}
                                >
                                    {isEllipsis ? (
                                        <span aria-hidden="true">…</span>
                                    ) : isLast ? (
                                        <span aria-current="page" style={{ fontWeight: 600 }}>
                      {label}
                    </span>
                                    ) : (
                                        <a href="#" style={{ color: "#2563eb", textDecoration: "none" }}>
                                            {label}
                                        </a>
                                    )}
                                    {!isLast && (
                                        <span style={{ margin: "0 6px", color: "#6b7280" }}>{separator}</span>
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                </nav>
            ) : (
                <nav aria-label="Breadcrumb">
                    <ol style={{ padding: 0, margin: 0, listStyle: "none", overflow: "hidden" }}>
                        <style>{`
              .bc a {
                float: left;
                color: #fff;
                background: darkcyan;
                text-decoration: none;
                position: relative;
                height: 30px;
                line-height: 30px;
                text-align: center;
                margin-right: 15px;
                padding: 0 10px;
                font-weight: 600;
                border: 1px solid rgba(0,0,0,0.1); /* bordo */
                border-radius: 4px; /* leggero arrotondamento */
              }
              .bc a::before,
              .bc a::after {
                content: "";
                position: absolute;
                border-color: darkcyan;
                border-style: solid;
                border-width: 15px 5px;
              }
              .bc a::before {
                left: -10px;
                border-left-color: transparent;
              }
              .bc a::after {
                left: 100%;
                border-color: transparent;
                border-left-color: darkcyan;
              }
              .bc a:hover { background: blue; }
              .bc a:hover::before { border-color: blue; border-left-color: transparent; }
              .bc a:hover::after { border-left-color: blue; }
              .bc span.current {
                float: left;
                background: #e5e7eb;
                color: #111827;
                position: relative;
                height: 30px;
                line-height: 30px;
                padding: 0 10px;
                margin-right: 15px;
                border: 1px solid #d1d5db; /* bordo visibile */
                border-radius: 4px;
              }
              .bc span.current::before,
              .bc span.current::after {
                content: "";
                position: absolute;
                border-style: solid;
                border-width: 15px 5px;
              }
              .bc span.current::before {
                border-color: #e5e7eb;
                left: -10px;
                border-left-color: transparent;
              }
              .bc span.current::after {
                left: 100%;
                border-color: transparent;
                border-left-color: #e5e7eb;
              }
            `}</style>
                        <li className="bc" style={{ overflow: "hidden" }}>
                            {visible.map((label, i) => {
                                const isLast = i === visible.length - 1;
                                const isEllipsis = label === "…";
                                return (
                                    <span key={i} style={{ display: "inline" }}>
                    {isEllipsis ? (
                        <span className="current" aria-hidden="true">
                        …
                      </span>
                    ) : isLast ? (
                        <span className="current" aria-current="page">
                        {label}
                      </span>
                    ) : (
                        <a href="#">{label}</a>
                    )}
                  </span>
                                );
                            })}
                        </li>
                    </ol>
                </nav>
            )}

            <div style={{ marginTop: 16, fontSize: 12, color: "#374151" }}>
                <p>
                    <strong>Accessibility tips:</strong> usa <code>aria-label="Breadcrumb"</code>, marca
                    la pagina corrente con <code>aria-current="page"</code>, assicurati del contrasto e
                    che la checkbox sia etichettata.
                </p>
            </div>
        </div>
    );
}
