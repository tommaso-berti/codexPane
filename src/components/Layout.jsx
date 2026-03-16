import { useEffect, useState } from 'react';
import { Outlet, useMatch } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import SettingsDrawer from './SettingsDrawer.jsx';
import Box from '@mui/material/Box';
import { getHeaderHeight } from '../lib/layout.js';
import { ActiveSectionProvider } from '../features/docs/ActiveSectionContext.jsx';
import { useActiveSection } from '../features/docs/useActiveSection.js';

const SIDEBAR_WIDTH = 312;

function LayoutInner() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const openDrawer = () => setDrawerOpen(true);
    const closeDrawer = () => setDrawerOpen(false);
    const docsRouteMatch = useMatch('/:docs');
    const sectionRouteMatch = useMatch('/:docs/:section');
    const isDocsPage = Boolean(docsRouteMatch || sectionRouteMatch);
    const headerHeight = getHeaderHeight(isDocsPage);
    const { setActiveSectionId } = useActiveSection();

    useEffect(() => {
        if (!isDocsPage) {
            setActiveSectionId('');
        }
    }, [isDocsPage, setActiveSectionId]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100dvh',
                width: '100%',
                '--header-h': `${headerHeight}px`,
            }}
        >
            <Header onOpenDrawer={openDrawer} />
            <SettingsDrawer open={drawerOpen} onClose={closeDrawer} />

            <Box
                sx={{
                    display: 'flex',
                    flex: 1,
                    mt: `${headerHeight}px`,
                    width: '100%',
                    height: `calc(100dvh - ${headerHeight}px)`,
                    minHeight: 0,
                }}
            >
                <Box
                    sx={{
                        position: 'fixed',
                        top: `${headerHeight}px`,
                        left: 0,
                        height: `calc(100dvh - ${headerHeight}px)`,
                        width: SIDEBAR_WIDTH,
                        borderRight: 1,
                        borderColor: 'divider',
                        backgroundColor: 'background.paper',
                        zIndex: 5,
                    }}
                >
                    <Sidebar headerHeight={headerHeight} />
                </Box>

                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
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
                            flex: 1,
                            minHeight: 0,
                            overflow: 'auto',
                            pr: { xs: 0, md: 1 },
                            mb: 1.5,
                        }}
                    >
                        <Box
                            sx={{
                                mx: isDocsPage ? 0 : 'auto',
                                width: '100%',
                                maxWidth: isDocsPage ? 'none' : 980,
                            }}
                        >
                            <Outlet />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default function Layout() {
    return (
        <ActiveSectionProvider>
            <LayoutInner />
        </ActiveSectionProvider>
    );
}
