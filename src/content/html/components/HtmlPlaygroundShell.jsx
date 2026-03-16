import {
    Alert,
    Box,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Divider,
    Stack,
    Typography
} from "@mui/material";
import { alpha } from "@mui/material/styles";

export default function HtmlPlaygroundShell({
    title,
    goal,
    controlsLabel = "Try it",
    previewLabel = "Preview",
    outputLabel = "What changed",
    note,
    status,
    controls,
    preview,
    output
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
