import { useMemo, useState } from "react";
import {
    Alert,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    Typography
} from "@mui/material";
import PlaygroundShell from "../../../../components/PlaygroundShell.jsx";

const ALT_OPTIONS = [
    {
        id: "descriptive",
        label: "Descriptive alt text",
        value: "Team dashboard showing sales trends in Q1",
        quality: "good",
        feedback: "Good: it describes the image purpose."
    },
    {
        id: "generic",
        label: "Generic alt text",
        value: "image",
        quality: "weak",
        feedback: "Weak: generic terms like 'image' do not provide context."
    },
    {
        id: "decorative",
        label: "Decorative image (empty alt)",
        value: "",
        quality: "decorative",
        feedback: "Correct for decorative content: empty alt hides noise from screen readers."
    }
];

const LINK_OPTIONS = [
    {
        id: "descriptive",
        label: "Descriptive link text",
        value: "Read the accessibility checklist",
        quality: "good",
        feedback: "Good: users know destination without surrounding text."
    },
    {
        id: "click-here",
        label: "Ambiguous link text",
        value: "Click here",
        quality: "weak",
        feedback: "Weak: 'Click here' is unclear out of context."
    },
    {
        id: "redundant",
        label: "Redundant link text",
        value: "Read more read more",
        quality: "weak",
        feedback: "Weak: repetitive text increases cognitive load."
    }
];

export default function TextQualityPlayground() {
    const [altChoice, setAltChoice] = useState(ALT_OPTIONS[0].id);
    const [linkChoice, setLinkChoice] = useState(LINK_OPTIONS[0].id);

    const alt = useMemo(() => ALT_OPTIONS.find((item) => item.id === altChoice) ?? ALT_OPTIONS[0], [altChoice]);
    const link = useMemo(() => LINK_OPTIONS.find((item) => item.id === linkChoice) ?? LINK_OPTIONS[0], [linkChoice]);

    const status = alt.quality === "good" && link.quality === "good"
        ? { color: "success", label: "Clear text choices" }
        : { color: "warning", label: "Improve text clarity" };

    return (
        <PlaygroundShell
            title="Text Quality Playground"
            goal="Compare strong and weak alt/link text choices for assistive reading."
            status={status}
            controls={
                <Stack direction={{ xs: "column", md: "row" }} spacing={1.2}>
                    <FormControl size="small" sx={{ minWidth: 240 }}>
                        <InputLabel id="alt-choice-label">Alt text example</InputLabel>
                        <Select
                            labelId="alt-choice-label"
                            value={altChoice}
                            label="Alt text example"
                            onChange={(event) => setAltChoice(event.target.value)}
                        >
                            {ALT_OPTIONS.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl size="small" sx={{ minWidth: 240 }}>
                        <InputLabel id="link-choice-label">Link text example</InputLabel>
                        <Select
                            labelId="link-choice-label"
                            value={linkChoice}
                            label="Link text example"
                            onChange={(event) => setLinkChoice(event.target.value)}
                        >
                            {LINK_OPTIONS.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
            }
            preview={
                <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                    <Paper
                        variant="outlined"
                        sx={{
                            p: 1.5,
                            borderRadius: 1.5,
                            borderStyle: "dashed",
                            bgcolor: "background.default"
                        }}
                    >
                        <Typography variant="body2" sx={{ mb: 0.75 }}>
                            Image placeholder
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1 }}>
                            alt="{alt.value}"
                        </Typography>
                        <Typography component="a" href="#" sx={{ textDecoration: "underline" }}>
                            {link.value}
                        </Typography>
                    </Paper>
                </Paper>
            }
            output={
                <Stack spacing={1}>
                    <Alert severity={alt.quality === "good" || alt.quality === "decorative" ? "success" : "warning"} variant="outlined">
                        {alt.feedback}
                    </Alert>
                    <Alert severity={link.quality === "good" ? "success" : "warning"} variant="outlined">
                        {link.feedback}
                    </Alert>
                </Stack>
            }
            note="Write alt and link text so users understand purpose and destination without guessing."
        />
    );
}
