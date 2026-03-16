import SectMenu from './SectMenu.jsx';
import Footer from './Footer';
import Box from '@mui/material/Box';

export default function Sidebar() {
    return (
        <Box
            component="aside"
            sx={{
                height: 'calc(100dvh - 72px)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                overflowX: 'hidden',
                background: 'linear-gradient(180deg, color-mix(in srgb, var(--surface-soft) 48%, transparent), transparent)',
            }}
        >
            <Box sx={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
                <SectMenu />
            </Box>
            <Footer />
        </Box>
    );
}
