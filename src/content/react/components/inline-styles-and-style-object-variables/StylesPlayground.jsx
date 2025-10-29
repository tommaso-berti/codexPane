import React, { useMemo, useState } from "react";
import { Card, CardContent, Button, Slider } from "@mui/material";

/**
 * StylesPlayground
 * - Toggle dark mode (style object variable)
 * - Adjust font size (numeric vs string values)
 * - Toggle inline style vs className
 * - Shows the exact JSX snippet being executed
 */
export default function StylesPlayground() {
    const [dark, setDark] = useState(false);
    const [useInline, setUseInline] = useState(true);
    const [font, setFont] = useState(18); // number => 'px' implied
    const [radius, setRadius] = useState(8);

    const darkMode = useMemo(
        () => ({
            color: "white",
            background: "black",
        }),
        []
    );

    const lightMode = useMemo(
        () => ({
            color: "#111",
            background: "white",
        }),
        []
    );

    const boxInlineStyle = useMemo(
        () => ({
            ...(!dark ? lightMode : darkMode),
            fontSize: font, // numeric => px
            padding: 16,
            borderRadius: radius, // px
            border: `1px solid ${dark ? "#555" : "#ddd"}`,
            transition: "all .2s ease",
        }),
        [dark, font, radius, darkMode, lightMode]
    );

    // Fallback simple class styles (inlined for demo)
    const classStyles = `
  .box {
    transition: all .2s ease;
    padding: 16px;
    border: 1px solid #ddd;
  }
  .box.dark {
    color: white;
    background: black;
    border-color: #555;
  }
  .box.light {
    color: #111;
    background: white;
  }
  `;

    const snippet = useMemo(() => {
        if (useInline) {
            return `<div style={{
  ${dark ? `color: 'white', background: 'black'` : `color: '#111', background: 'white'`},
  fontSize: ${font},
  padding: 16,
  borderRadius: ${radius},
  border: '1px solid ${dark ? "#555" : "#ddd"}',
  transition: 'all .2s ease'
}}>
  Inline style with numeric px
</div>`;
        }
        return `<div className={\`box ${dark ? "dark" : "light"}\`}>
  Class styles (could be CSS Module)
</div>`;
    }, [useInline, dark, font, radius]);

    return (
        <div className="grid gap-4">
            <div className="flex items-center gap-2">
                <Button
                    variant={dark ? "secondary" : "default"}
                    onClick={() => setDark((d) => !d)}
                    className="rounded-2xl"
                >
                    Toggle {dark ? "Light" : "Dark"} mode
                </Button>
                <Button
                    variant="outline"
                    onClick={() => setUseInline((v) => !v)}
                    className="rounded-2xl"
                >
                    Use {useInline ? "className" : "inline style"}
                </Button>
            </div>

            <div className="flex items-center gap-4">
                <label className="text-sm w-28">Font size: {font}px</label>
                <Slider
                    min={12}
                    max={40}
                    step={1}
                    value={font}
                    onChange={(_, v) => setFont(v)}
                    sx={{ width: 260 }}
                />
            </div>

            <div className="flex items-center gap-4">
                <label className="text-sm w-28">Border radius: {radius}px</label>
                <Slider
                    min={0}
                    max={24}
                    step={1}
                    value={radius}
                    onChange={(_, v) => setRadius(v)}
                    sx={{ width: 260 }}
                />
            </div>

            <Card className="rounded-2xl shadow-sm">
                <CardContent className="p-4">
                    {useInline ? (
                        <div style={boxInlineStyle}>Inline style with numeric px</div>
                    ) : (
                        <>
                            <style>{classStyles}</style>
                            <div className={`box ${dark ? "dark" : "light"}`}>
                                Class styles (could be CSS Module)
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm">
                <CardContent className="p-4">
                    <div className="text-xs text-muted-foreground mb-2">
                        JSX being executed:
                    </div>
                    <pre className="text-xs overflow-auto p-3 rounded-xl bg-neutral-900 text-neutral-50">
{snippet}
          </pre>
                </CardContent>
            </Card>
        </div>
    );
}