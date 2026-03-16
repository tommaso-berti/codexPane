import { useMemo, useState } from "react";
import {
    Alert,
    Chip,
    FormControlLabel,
    Paper,
    Stack,
    Switch,
    Typography
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import HtmlPlaygroundShell from "../HtmlPlaygroundShell.jsx";

const INITIAL = {
    doctype: true,
    lang: true,
    metaCharset: true,
    titleInHead: true,
    titleInBody: false
};

export default function DocumentStructurePlayground() {
    const [state, setState] = useState(INITIAL);

    const checks = useMemo(() => {
        const hasTitleInHead = state.titleInHead;
        const hasTitleInBody = state.titleInBody;

        return [
            {
                level: state.doctype ? "success" : "warning",
                text: state.doctype ? "Doctype is present." : "Doctype missing: browsers may trigger quirks mode."
            },
            {
                level: state.lang ? "success" : "warning",
                text: state.lang ? "<html lang=\"en\"> is set." : "Missing lang attribute on <html>."
            },
            {
                level: state.metaCharset ? "success" : "warning",
                text: state.metaCharset ? "<meta charset=\"utf-8\"> is present." : "Missing charset meta in <head>."
            },
            {
                level: hasTitleInHead ? "success" : "error",
                text: hasTitleInHead ? "<title> is correctly inside <head>." : "Missing <title> inside <head>."
            },
            {
                level: hasTitleInBody ? "error" : "success",
                text: hasTitleInBody ? "Invalid placement: <title> should not be inside <body>." : "No invalid <title> in <body>."
            }
        ];
    }, [state]);

    const score = checks.filter((check) => check.level === "success").length;

    return (
        <HtmlPlaygroundShell
            title="Document Structure Playground"
            goal="See how HTML metadata placement affects document validity and clarity."
            status={{
                color: score === checks.length ? "success" : "warning",
                label: `${score}/${checks.length} checks pass`
            }}
            controls={
                <Stack spacing={0.5}>
                    <FormControlLabel
                        control={<Switch checked={state.doctype} onChange={(event) => setState((prev) => ({ ...prev, doctype: event.target.checked }))} />}
                        label="Include <!DOCTYPE html>"
                    />
                    <FormControlLabel
                        control={<Switch checked={state.lang} onChange={(event) => setState((prev) => ({ ...prev, lang: event.target.checked }))} />}
                        label="Set html lang attribute"
                    />
                    <FormControlLabel
                        control={<Switch checked={state.metaCharset} onChange={(event) => setState((prev) => ({ ...prev, metaCharset: event.target.checked }))} />}
                        label="Include meta charset in head"
                    />
                    <FormControlLabel
                        control={<Switch checked={state.titleInHead} onChange={(event) => setState((prev) => ({ ...prev, titleInHead: event.target.checked }))} />}
                        label="Place title in head"
                    />
                    <FormControlLabel
                        control={<Switch checked={state.titleInBody} onChange={(event) => setState((prev) => ({ ...prev, titleInBody: event.target.checked }))} />}
                        label="Misuse case: place title in body"
                    />
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2, bgcolor: "background.default" }}>
                    <Typography sx={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 13 }}>
                        {state.doctype ? "<!DOCTYPE html>\n" : ""}
                        {`<html${state.lang ? ' lang="en"' : ""}>`}
                        {"\n  <head>\n"}
                        {state.metaCharset ? '    <meta charset="utf-8" />\n' : ""}
                        {state.titleInHead ? "    <title>My page</title>\n" : ""}
                        {"  </head>\n  <body>\n"}
                        {"    <main>Page content</main>\n"}
                        {state.titleInBody ? "    <title>Wrong location</title>\n" : ""}
                        {"  </body>\n</html>"}
                    </Typography>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    {checks.map((check) => (
                        <Alert key={check.text} severity={check.level} variant="outlined">
                            {check.text}
                        </Alert>
                    ))}
                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                        {checks.map((check) => (
                            <Chip
                                key={`chip-${check.text}`}
                                size="small"
                                variant="filled"
                                color={check.level === "error" ? "error" : check.level === "warning" ? "warning" : "success"}
                                sx={(theme) => {
                                    const tone = check.level === "error" ? "error" : check.level === "warning" ? "warning" : "success";
                                    return {
                                        border: "1px solid",
                                        borderColor: alpha(theme.palette[tone].main, theme.palette.mode === "dark" ? 0.58 : 0.35),
                                        bgcolor: alpha(theme.palette[tone].main, theme.palette.mode === "dark" ? 0.28 : 0.12),
                                        color: theme.palette.mode === "dark" ? theme.palette[tone].light : theme.palette[tone].dark,
                                        "& .MuiChip-label": {
                                            color: "inherit",
                                            fontWeight: 700
                                        }
                                    };
                                }}
                                label={check.level}
                            />
                        )
                        )}
                    </Stack>
                </Stack>
            }
            note="Head metadata is not visible content, but it strongly affects browser behavior, encoding, and accessibility tools."
        />
    );
}
