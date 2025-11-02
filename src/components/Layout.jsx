import { useState } from 'react'
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import SettingsDrawer from './SettingsDrawer.jsx';
import Box from '@mui/material/Box';
const SIDEBAR_WIDTH = 304;

export default function Layout() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const openDrawer = () => setDrawerOpen(true);
    const closeDrawer = () => setDrawerOpen(false);

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
                    }}
                >
                    <Sidebar />
                </Box>

                <Box
                    component="main"
                    data-scroller="content"
                    sx={{
                        flex: 1,
                        pl: 2.5,
                        pr: 2.5,
                        pt: 1.5,
                        minHeight: 0,
                        overflow: 'auto',
                        ml: `${SIDEBAR_WIDTH}px`,
                        mb: 1.5,
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}