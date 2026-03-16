import {
    Alert,
    Box,
    Button,
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

export default function ReleaseNotesModal({ open, onClose }) {
    const { data, isLoading, error, refetch } = useLatestReleaseNotes(open);

    const language = "en";
    const releaseType = data?.releaseType || "patch";
    const title = releaseTitle(releaseType);
    const visibleVersion = data?.version || APP_VERSION;
    const filteredMarkdown = extractLanguageSection(data?.bodyMarkdown || "", language);
    const hasMarkdown = Boolean(filteredMarkdown);

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

                    {!isLoading && !error && hasMarkdown && (
                        <Stack spacing={0.75}>
                            {data?.releaseUrl ? (
                                <Link
                                    href={data.releaseUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    underline="hover"
                                    sx={{ width: "fit-content" }}
                                >
                                    GitHub Release
                                </Link>
                            ) : null}
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
                                    {filteredMarkdown}
                                </ReactMarkdown>
                            </Box>
                        </Stack>
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

                    {!isLoading && !error && !hasMarkdown && (!data?.entries || data.entries.length === 0) && (
                        <Typography variant="body2" color="text.secondary">
                            No release notes available for this version.
                        </Typography>
                    )}

                    {!isLoading &&
                        !error &&
                        !hasMarkdown &&
                        Array.isArray(data?.entries) &&
                        data.entries.length > 0 && (
                        <List sx={{ p: 0 }}>
                            {data.entries.map((entry) => (
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
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}
