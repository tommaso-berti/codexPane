// MdxTable.jsx
import Box from "@mui/material/Box";
import { alpha } from "@mui/material/styles";

export default function MdxTable(props) {
    return (
        <Box
            component="table"
            role="table"
            sx={(theme) => {
                const isDark = theme.palette.mode === "dark";
                const bg = theme.palette.background.paper;
                const fg = theme.palette.text.primary;
                const border = theme.palette.divider;
                const headerBg = isDark
                    ? alpha(theme.palette.common.white, 0.08)
                    : alpha(theme.palette.common.black, 0.04);
                const stripeBg = isDark
                    ? alpha(theme.palette.common.white, 0.06)
                    : alpha(theme.palette.common.black, 0.02);
                return {
                    "&&": {
                        width: "100%",
                        borderCollapse: "collapse",
                        backgroundColor: bg,
                        color: fg,
                        "--bgColor-default": bg,
                        "--bgColor-muted": stripeBg,
                        "--fgColor-default": fg,
                        "--fgColor-muted": alpha(fg, 0.72),
                        "--borderColor-default": border,
                        "--color-canvas-default": bg,
                        "--color-canvas-subtle": stripeBg,
                        "--color-border-default": border,
                        "--fgColor-accent": fg,
                    },
                    "& th, & td": {
                        backgroundColor: "var(--bgColor-default)",
                        border: `1px solid var(--borderColor-default)`,
                        padding: "8px 12px",
                        verticalAlign: "top",
                    },
                    "& thead th": {
                        backgroundColor: headerBg,
                        fontWeight: 600,
                    },
                    "& tbody tr:nth-of-type(odd) td": {
                        backgroundColor: "var(--bgColor-muted)",
                    },
                    "@media (max-width:600px)": {
                        "& th, & td": { padding: "6px 8px" },
                    },
                };
            }}
            {...props}
        />
    );
}