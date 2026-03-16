import DocMenu from "./DocMenu.jsx";
import SearchModal from "../features/search/SearchModal.jsx";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ICONS from '../../icons.js';
import { useMatch } from 'react-router-dom';
import Breadcrumb from './Breadcrumb.jsx';
import { HEADER_HEIGHT_DEFAULT, getHeaderHeight } from '../lib/layout.js';

const GitHubIcon = ICONS.GitHubIcon;

export default function Header({onOpenDrawer}) {
    const docsRouteMatch = useMatch('/:docs');
    const sectionRouteMatch = useMatch('/:docs/:section');
    const isDocsPage = Boolean(docsRouteMatch || sectionRouteMatch);
    const headerHeight = getHeaderHeight(isDocsPage);

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
                flexDirection: 'column',
                height: `${headerHeight}px`
            }}
        >
            <Box
                sx={{
                    height: `${HEADER_HEIGHT_DEFAULT}px`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: { xs: 1.5, md: 2.5 },
                    width: '100%',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.2, md: 2.2 }, mr: 2, minWidth: 0 }}>
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
                            borderRadius: 2.5,
                            backgroundColor: 'background.paper',
                            '&:hover': {
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
                            borderRadius: 2.5,
                            backgroundColor: 'background.paper',
                            '&:hover': {
                                backgroundColor: 'action.hover',
                            },
                        }}
                    >
                        <SettingsIcon />
                    </IconButton>
                </Box>
            </Box>
            {isDocsPage && (
                <Box
                    sx={{
                        height: `${headerHeight - HEADER_HEIGHT_DEFAULT}px`,
                        px: { xs: 1.5, md: 2.5 },
                        borderTop: 1,
                        borderColor: 'divider',
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        minWidth: 0,
                    }}
                >
                    <Breadcrumb inHeader />
                </Box>
            )}
        </Box>
    );
}
