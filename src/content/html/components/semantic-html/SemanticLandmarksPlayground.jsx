import { useMemo, useState } from "react";
import {
    Alert,
    Button,
    FormControlLabel,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    Switch,
    Typography
} from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const INITIAL = {
    topBanner: "header",
    primaryNav: "nav",
    pageContent: "main",
    relatedLinks: "aside",
    storyBlock: "section",
    pageFooter: "footer"
};

const OPTIONS = ["header", "nav", "main", "aside", "section", "article", "div"];

const LABELS = {
    topBanner: "Top banner element",
    primaryNav: "Primary nav element",
    pageContent: "Main content element",
    relatedLinks: "Related links element",
    storyBlock: "Story block element",
    pageFooter: "Footer element"
};

function AssignmentField({ label, value, onChange }) {
    return (
        <FormControl size="small" sx={{ minWidth: 210 }}>
            <InputLabel>{label}</InputLabel>
            <Select label={label} value={value} onChange={(event) => onChange(event.target.value)}>
                {OPTIONS.map((option) => (
                    <MenuItem key={option} value={option}>
                        {`<${option}>`}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default function SemanticLandmarksPlayground() {
    const [assignment, setAssignment] = useState(INITIAL);
    const [storyHasHeading, setStoryHasHeading] = useState(true);

    const audit = useMemo(() => {
        const tags = Object.values(assignment);
        const mainCount = tags.filter((tag) => tag === "main").length;
        const hasHeader = tags.includes("header");
        const hasNav = tags.includes("nav");
        const hasFooter = tags.includes("footer");
        const sectionWithoutHeading = assignment.storyBlock === "section" && !storyHasHeading;

        return [
            { ok: mainCount === 1, text: mainCount === 1 ? "Exactly one <main> landmark." : "Use exactly one <main> landmark." },
            { ok: hasHeader, text: hasHeader ? "<header> landmark present." : "Missing <header> landmark." },
            { ok: hasNav, text: hasNav ? "<nav> landmark present." : "Missing <nav> landmark." },
            {
                ok: hasFooter,
                text: hasFooter
                    ? "<footer> landmark present."
                    : "Missing <footer> landmark. Set \"Footer element\" to <footer>."
            },
            {
                ok: !sectionWithoutHeading,
                text: sectionWithoutHeading
                    ? "If you use <section>, include a heading inside it."
                    : assignment.storyBlock === "section"
                        ? "<section> includes a heading."
                        : "Story block uses a non-section element, so section-heading rule does not apply."
            }
        ];
    }, [assignment, storyHasHeading]);

    const validCount = audit.filter((item) => item.ok).length;

    return (
        <PlaygroundShell
            title="Semantic Landmarks Playground"
            goal="Pick the right semantic element for each page block and check landmark quality."
            status={{
                color: validCount === audit.length ? "success" : "warning",
                label: `${validCount}/${audit.length} checks pass`
            }}
            controls={
                <Stack spacing={1.2}>
                    <Typography variant="body2" color="text.secondary">
                        Assign one HTML element to each block, then check the audit below.
                    </Typography>
                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                        {Object.entries(assignment).map(([key, value]) => (
                            <AssignmentField
                                key={key}
                                label={LABELS[key]}
                                value={value}
                                onChange={(nextValue) => setAssignment((prev) => ({ ...prev, [key]: nextValue }))}
                            />
                        ))}
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center" useFlexGap flexWrap="wrap">
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={storyHasHeading}
                                    onChange={(event) => setStoryHasHeading(event.target.checked)}
                                />
                            }
                            label="Story block contains a heading"
                        />
                        <Button
                            size="small"
                            variant="outlined"
                            onClick={() => {
                                setAssignment(INITIAL);
                                setStoryHasHeading(true);
                            }}
                        >
                            Reset setup
                        </Button>
                    </Stack>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                    <Stack spacing={0.8}>
                        {Object.entries(assignment).map(([key, tag]) => (
                            <Paper key={key} variant="outlined" sx={{ p: 1, borderRadius: 1.5, bgcolor: "background.default" }}>
                                <Typography variant="body2" sx={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                                    {`<${tag}>`} {LABELS[key]} {`</${tag}>`}
                                </Typography>
                            </Paper>
                        ))}
                    </Stack>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    {audit.map((item) => (
                        <Alert key={item.text} severity={item.ok ? "success" : "warning"} variant="outlined">
                            {item.text}
                        </Alert>
                    ))}
                </Stack>
            }
            code={
                <pre>{`<${assignment.topBanner}>Top banner</${assignment.topBanner}>
<${assignment.primaryNav}>Primary nav</${assignment.primaryNav}>
<${assignment.pageContent}>Main content</${assignment.pageContent}>
<${assignment.relatedLinks}>Related links</${assignment.relatedLinks}>
<${assignment.storyBlock}>Story block${storyHasHeading ? " + heading" : ""}</${assignment.storyBlock}>
<${assignment.pageFooter}>Footer</${assignment.pageFooter}>`}</pre>
            }
            note="Landmarks help both assistive technologies and developers understand page structure quickly."
        />
    );
}
