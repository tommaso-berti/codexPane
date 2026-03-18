import {
    Alert,
    Box,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Divider,
    Paper,
    Stack,
    Typography
} from "@mui/material";
import { alpha } from "@mui/material/styles";

export default function PlaygroundShell({
    title,
    goal,
    controlsLabel = "Try it",
    previewLabel = "Preview",
    outputLabel = "What changed",
    codeLabel = "Code behind this behavior",
    note,
    status,
    controls,
    preview,
    output,
    code
}) {
    const statusColor = status?.color || "default";
    const tone = ["success", "warning", "error", "info", "primary", "secondary"].includes(statusColor)
        ? statusColor
        : "info";

    return (
        <Card variant="outlined" sx={{ borderRadius: 3, mt: 2 }}>
            <CardHeader
                title={title}
                subheader={goal}
                action={
                    status ? (
                        <Chip
                            size="small"
                            label={status.label}
                            color={statusColor}
                            variant="filled"
                            sx={(theme) => ({
                                fontWeight: 600,
                                bgcolor: alpha(theme.palette[tone].main, theme.palette.mode === "dark" ? 0.28 : 0.12),
                                color: theme.palette.mode === "dark" ? theme.palette[tone].light : theme.palette[tone].dark,
                                border: "1px solid",
                                borderColor: alpha(theme.palette[tone].main, theme.palette.mode === "dark" ? 0.58 : 0.35),
                                "& .MuiChip-label": { color: "inherit" }
                            })}
                        />
                    ) : null
                }
                sx={{
                    "& .MuiCardHeader-title": { typography: "h6", fontWeight: 700 },
                    "& .MuiCardHeader-subheader": { mt: 0.5, color: "text.secondary" }
                }}
            />
            <Divider />
            <CardContent>
                <Stack spacing={2.2}>
                    <Box>
                        <Typography variant="overline" color="text.secondary">
                            {controlsLabel}
                        </Typography>
                        <Box sx={{ mt: 0.75 }}>{controls}</Box>
                    </Box>

                    <Box>
                        <Typography variant="overline" color="text.secondary">
                            {previewLabel}
                        </Typography>
                        <Box sx={{ mt: 0.75 }}>{preview}</Box>
                    </Box>

                    <Box>
                        <Typography variant="overline" color="text.secondary">
                            {outputLabel}
                        </Typography>
                        <Box sx={{ mt: 0.75 }}>{output}</Box>
                    </Box>

                    {code ? (
                        <Box>
                            <Typography variant="overline" color="text.secondary">
                                {codeLabel}
                            </Typography>
                            <Paper
                                variant="outlined"
                                sx={(theme) => ({
                                    mt: 0.75,
                                    p: 1.25,
                                    borderRadius: 2,
                                    borderColor:
                                        theme.palette.mode === "dark"
                                            ? alpha(theme.palette.info.light, 0.35)
                                            : alpha(theme.palette.info.main, 0.25),
                                    bgcolor:
                                        theme.palette.mode === "dark"
                                            ? alpha(theme.palette.common.white, 0.04)
                                            : alpha(theme.palette.info.main, 0.04),
                                    "& pre": {
                                        m: 0,
                                        overflowX: "auto",
                                        fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
                                        fontSize: 12.5,
                                        lineHeight: 1.6,
                                        color: "text.primary"
                                    },
                                    "& code": {
                                        fontFamily: "inherit",
                                        color: "inherit"
                                    }
                                })}
                            >
                                {code}
                            </Paper>
                        </Box>
                    ) : null}

                    {note ? (
                        <Alert severity="info" variant="outlined">
                            {note}
                        </Alert>
                    ) : null}
                </Stack>
            </CardContent>
        </Card>
    );
}
