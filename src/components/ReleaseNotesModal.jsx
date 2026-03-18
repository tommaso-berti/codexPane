import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Alert,
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Link,
    List,
    ListItem,
    ListItemText,
    Skeleton,
    Stack,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { APP_VERSION } from "../lib/version.js";
import { useLatestReleaseNotes } from "../hooks/useLatestReleaseNotes.js";

function formatDate(value) {
    if (!value) return "";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString();
}

function extractLanguageSection(markdown, language) {
    const source = `${markdown ?? ""}`.trim();
    if (!source) return "";

    const topHeadingMatch = source.match(/^#\s+[^\n]+/m);
    const topHeading = topHeadingMatch ? topHeadingMatch[0].trim() : "";
    const targetHeading = language === "it" ? "## Italiano" : "## English";
    const alternateHeading = language === "it" ? "## English" : "## Italiano";

    const targetIndex = source.indexOf(targetHeading);
    if (targetIndex === -1) return source;

    const fromTarget = source.slice(targetIndex + targetHeading.length).trimStart();
    const nextMajorHeadingIndex = fromTarget.search(/\n#\s+/);
    const alternateIndex = fromTarget.indexOf(alternateHeading);

    let endIndex = fromTarget.length;
    if (alternateIndex !== -1) endIndex = Math.min(endIndex, alternateIndex);
    if (nextMajorHeadingIndex !== -1) endIndex = Math.min(endIndex, nextMajorHeadingIndex);

    const section = fromTarget
        .slice(0, endIndex)
        .replace(/^#\s+[^\n]+\n?/gm, "")
        .trim();
    if (!section) return topHeading || source;

    return topHeading ? `${topHeading}\n\n${section}` : section;
}

function releaseTitle(releaseType) {
    if (releaseType === "major") return "Major Release Notes";
    if (releaseType === "minor") return "Minor Release Notes";
    return "Patch Release Notes";
}

function releaseLabel(releaseType) {
    if (releaseType === "major") return "major";
    if (releaseType === "minor") return "minor";
    return "patch";
}

function MarkdownPanel({ markdown }) {
    return (
        <Box
            sx={{
                p: 1.5,
                borderRadius: 1.5,
                bgcolor: "action.hover",
                "& h1, & h2, & h3, & h4": {
                    mt: 1.25,
                    mb: 0.75,
                },
                "& h1": { typography: "h6" },
                "& h2": { typography: "subtitle1", fontWeight: 700 },
                "& h3": { typography: "body1", fontWeight: 700 },
                "& p, & li": {
                    typography: "body2",
                    lineHeight: 1.55,
                },
                "& ul, & ol": {
                    pl: 2.5,
                    my: 0.75,
                },
                "& code": {
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                    fontSize: "0.8rem",
                },
                "& a": {
                    color: "primary.main",
                },
            }}
        >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {markdown}
            </ReactMarkdown>
        </Box>
    );
}

export default function ReleaseNotesModal({ open, onClose }) {
    const { data, isLoading, error, refetch } = useLatestReleaseNotes(open);
    const [expandedTag, setExpandedTag] = useState("");

    const language = "en";
    const releaseType = data?.releaseType || "patch";
    const title = releaseTitle(releaseType);
    const visibleVersion = data?.version || APP_VERSION;
    const history = useMemo(() => {
        const items = Array.isArray(data?.history) ? data.history : [];
        if (items.length > 0) return items;
        if (!data?.tag) return [];
        return [{
            tag: data.tag,
            version: data.version,
            previousTag: data.previousTag,
            releaseType: data.releaseType,
            entries: data.entries,
            bodyMarkdown: data.bodyMarkdown,
            releaseUrl: data.releaseUrl,
            publishedAt: data.publishedAt,
            source: data.source,
        }];
    }, [data]);
    const historyWithContent = useMemo(
        () => history.map((item) => ({
            ...item,
            filteredMarkdown: extractLanguageSection(item?.bodyMarkdown || "", language),
        })),
        [history, language]
    );

    useEffect(() => {
        if (!open) return;
        setExpandedTag(historyWithContent[0]?.tag || "");
    }, [open, historyWithContent]);

    const handleToggle = (tag) => (_, expanded) => {
        setExpandedTag(expanded ? tag : "");
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    width: "min(980px, 94vw)",
                    maxWidth: "980px",
                    height: "78vh",
                    maxHeight: "78vh",
                },
            }}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent dividers sx={{ overflowY: "auto" }}>
                <Stack spacing={2}>
                    <Typography variant="body2" color="text.secondary">
                        {`Latest deployed version: v${visibleVersion}`}
                    </Typography>

                    {data?.previousTag && data?.tag && (
                        <Typography variant="caption" color="text.secondary">
                            {`Compared from ${data.previousTag} to ${data.tag}`}
                        </Typography>
                    )}

                    {isLoading && (
                        <Stack spacing={1.5}>
                            <Skeleton variant="text" width="35%" />
                            {[0, 1, 2, 3].map((index) => (
                                <Box key={index} sx={{ py: 0.5 }}>
                                    <Skeleton variant="text" width={index % 2 === 0 ? "88%" : "76%"} />
                                    <Skeleton variant="text" width="40%" />
                                </Box>
                            ))}
                        </Stack>
                    )}

                    {!isLoading && error && (
                        <Alert
                            severity="warning"
                            action={
                                <Button color="inherit" size="small" onClick={refetch}>
                                    Retry
                                </Button>
                            }
                        >
                            Unable to load release notes right now. Please try again.
                        </Alert>
                    )}

                    {!isLoading && !error && historyWithContent.length === 0 && (
                        <Typography variant="body2" color="text.secondary">
                            No release notes available for this version.
                        </Typography>
                    )}

                    {!isLoading && !error && historyWithContent.length > 0 && (
                        <Stack spacing={1}>
                            {historyWithContent.map((item) => {
                                const hasMarkdown = Boolean(item.filteredMarkdown);
                                const hasEntries = Array.isArray(item.entries) && item.entries.length > 0;
                                const headerDate = formatDate(item.publishedAt);
                                return (
                                    <Accordion
                                        key={item.tag}
                                        disableGutters
                                        elevation={0}
                                        expanded={expandedTag === item.tag}
                                        onChange={handleToggle(item.tag)}
                                        sx={{
                                            border: "1px solid",
                                            borderColor: "divider",
                                            borderRadius: 1.5,
                                            "&:before": { display: "none" },
                                        }}
                                    >
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                            <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 0 }}>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                                                    {item.tag || `v${item.version || "unknown"}`}
                                                </Typography>
                                                <Chip size="small" label={releaseLabel(item.releaseType)} variant="outlined" />
                                                {headerDate ? (
                                                    <Typography variant="caption" color="text.secondary" noWrap>
                                                        {headerDate}
                                                    </Typography>
                                                ) : null}
                                            </Stack>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Stack spacing={1}>
                                                {item.releaseUrl ? (
                                                    <Link
                                                        href={item.releaseUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        underline="hover"
                                                        sx={{ width: "fit-content" }}
                                                    >
                                                        GitHub Release
                                                    </Link>
                                                ) : null}

                                                {hasMarkdown ? <MarkdownPanel markdown={item.filteredMarkdown} /> : null}

                                                {!hasMarkdown && hasEntries && (
                                                    <List sx={{ p: 0 }}>
                                                        {item.entries.map((entry) => (
                                                            <ListItem key={entry.sha} sx={{ px: 0, alignItems: "flex-start" }}>
                                                                <ListItemText
                                                                    primary={
                                                                        entry.url ? (
                                                                            <Link
                                                                                href={entry.url}
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                                underline="hover"
                                                                                color="inherit"
                                                                            >
                                                                                {entry.subject}
                                                                            </Link>
                                                                        ) : (
                                                                            entry.subject
                                                                        )
                                                                    }
                                                                    secondary={
                                                                        <Box component="span">
                                                                            {entry.author}
                                                                            {entry.date ? ` · ${formatDate(entry.date)}` : ""}
                                                                        </Box>
                                                                    }
                                                                />
                                                            </ListItem>
                                                        ))}
                                                    </List>
                                                )}

                                                {!hasMarkdown && !hasEntries && (
                                                    <Typography variant="body2" color="text.secondary">
                                                        No notes available for this release.
                                                    </Typography>
                                                )}
                                            </Stack>
                                        </AccordionDetails>
                                    </Accordion>
                                );
                            })}
                        </Stack>
                    )}
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}
