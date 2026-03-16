import DocMenu from "./DocMenu.jsx";
import SearchModal from "../features/search/SearchModal.jsx";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ICONS from '../../icons.js';

const GitHubIcon = ICONS.GitHubIcon;

export default function Header({onOpenDrawer}) {
    return (
        <Box
            component="header"
            sx={{
                position: 'fixed',
                top: 0,
                width: '100%',
                zIndex: 30,
                backgroundColor: 'background.paper',
                color: 'text.primary',
                borderBottom: 1,
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: { xs: 1.5, md: 2.5 },
                height: 72
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.2, md: 2.2 }, mr: 2 }}>
                <Typography
                    variant="h5"
                    component="h1"
                    fontWeight={700}
                    color="primary"
                    noWrap
                    sx={{ letterSpacing: '-0.02em' }}
                >
                    CodexPane
                </Typography>
                <DocMenu />
            </Box>
            <Box sx={{ ml: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <SearchModal />
                <IconButton
                    aria-label="github"
                    size="large"
                    href="https://github.com/tommaso-berti/codexPane"
                    target="_blank"
                    sx={{
                        width: 48,
                        height: 48,
                        color: 'primary.main',
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 2.5,
                        backgroundColor: 'background.paper',
                        '&:hover': {
                            borderColor: 'primary.light',
                            backgroundColor: 'action.hover',
                        },
                    }}
                >
                    <GitHubIcon fontSize="medium" />
                </IconButton>
                <IconButton
                    aria-label="settings"
                    onClick={onOpenDrawer}
                    size="large"
                    sx={{
                        width: 48,
                        height: 48,
                        color: 'primary.main',
                        border: '1px solid',
                        borderColor: 'primary.light',
                        borderRadius: 2.5,
                        backgroundColor: 'background.paper',
                        '&:hover': {
                            borderColor: 'primary.main',
                            backgroundColor: 'action.hover',
                        },
                    }}
                >
                    <SettingsIcon />
                </IconButton>
            </Box>
        </Box>
    );
}
