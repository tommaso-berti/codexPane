import React, { useMemo, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Checkbox,
    FormControlLabel,
    LinearProgress,
    List,
    ListItem,
    Typography,
    Divider,
    Button,
    Stack,
    Chip
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const STEPS = [
    "VPS updated and nginx installed",
    "Deploy user created and sudo added",
    "UFW allows OpenSSH and Nginx Full",
    "Directory layout created under /srv/www",
    "Repo cloned into /srv/www/sites/<project-name>/public",
    "Nginx config written and enabled",
    "DNS A record points to <VPS-IP>",
    "Certbot TLS obtained for <domain>",
    "Permissions set to www-data 755",
    "GitHub secrets set (SSH_PRIVATE_KEY, VPS_HOST, VPS_USER)",
    "deploy/update-site.sh executable on VPS",
    "GitHub Actions workflows pushed to main",
    "Manual test: site loads over https"
];

export default function DeploymentChecklist() {
    const [checked, setChecked] = useState(() => Array(STEPS.length).fill(false));
    const completed = useMemo(() => checked.filter(Boolean).length, [checked]);
    const percent = Math.round((completed / STEPS.length) * 100);

    const toggle = (idx) =>
        setChecked((prev) => {
            const next = [...prev];
            next[idx] = !prev[idx];
            return next;
        });

    const reset = () => setChecked(Array(STEPS.length).fill(false));

    return (
        <Card sx={{ borderRadius: "16px", boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}>
            <CardHeader
                title="Deployment Checklist"
                subheader="Track your VPS + NGINX + HTTPS + GitHub Actions setup"
                action={
                    <Chip
                        color={percent === 100 ? "success" : "primary"}
                        icon={<CheckCircleIcon />}
                        label={`${percent}%`}
                        variant="filled"
                    />
                }
            />
            <CardContent>
                <Stack spacing={2}>
                    <Box>
                        <LinearProgress variant="determinate" value={percent} sx={{ height: 10, borderRadius: 5 }} />
                        <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
                            {completed} / {STEPS.length} steps complete
                        </Typography>
                    </Box>
                    <Divider />
                    <List dense>
                        {STEPS.map((label, i) => (
                            <ListItem key={i} disableGutters sx={{ py: 0.5 }}>
                                <FormControlLabel
                                    control={<Checkbox checked={checked[i]} onChange={() => toggle(i)} color="primary" />}
                                    label={<Typography variant="body2">{label}</Typography>}
                                />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <Button onClick={reset} startIcon={<RestartAltIcon />} variant="outlined">
                            Reset
                        </Button>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
}