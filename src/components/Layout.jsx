import { useState } from 'react';
import { Outlet, useMatch } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import SettingsDrawer from './SettingsDrawer.jsx';
import Box from '@mui/material/Box';
import DocsToc from '../features/docs/DocsToc.jsx';

const SIDEBAR_WIDTH = 312;
const TOC_WIDTH = 272;

export default function Layout() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const openDrawer = () => setDrawerOpen(true);
    const closeDrawer = () => setDrawerOpen(false);
    const docsRouteMatch = useMatch('/:docs');
    const sectionRouteMatch = useMatch('/:docs/:section');
    const isDocsPage = Boolean(docsRouteMatch || sectionRouteMatch);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', width: '100%' }}>
            <Header onOpenDrawer={openDrawer} />
            <SettingsDrawer open={drawerOpen} onClose={closeDrawer} />

            <Box sx={{ display: 'flex', flex: 1, mt: '72px', width: '100%', height: 'calc(100dvh - 72px)', minHeight: 0 }}>
                <Box
                    sx={{
                        position: 'fixed',
                        top: 72,
                        left: 0,
                        height: 'calc(100dvh - 72px)',
                        width: SIDEBAR_WIDTH,
                        borderRight: 1,
                        borderColor: 'divider',
                        backgroundColor: 'background.paper',
                        zIndex: 5,
                    }}
                >
                    <Sidebar />
                </Box>

                <Box
                    sx={{
                        flex: 1,
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            xl: isDocsPage ? `minmax(0, 1fr) ${TOC_WIDTH}px` : '1fr',
                        },
                        columnGap: 3,
                        minHeight: 0,
                        ml: `${SIDEBAR_WIDTH}px`,
                        px: { xs: 2, md: 3 },
                        py: 2,
                    }}
                >
                    <Box
                        component="main"
                        data-scroller="content"
                        sx={{
                            minHeight: 0,
                            overflow: 'auto',
                            pr: { xs: 0, md: 1 },
                            mb: 1.5,
                        }}
                    >
                        <Box
                            sx={{
                                mx: 'auto',
                                width: '100%',
                                maxWidth: isDocsPage ? 920 : 980,
                            }}
                        >
                            <Outlet />
                        </Box>
                    </Box>
                    <Box sx={{ display: { xs: 'none', xl: isDocsPage ? 'block' : 'none' }, pt: 0.5 }}>
                        <DocsToc enabled={isDocsPage} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
