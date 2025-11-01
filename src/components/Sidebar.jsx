import SectMenu from './SectMenu.jsx';
import Footer from './Footer';
import Box from '@mui/material/Box';

export default function Sidebar() {
    return (
        <Box component="aside" sx={{ height: 'calc(100dvh - 72px)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <Box sx={{ flex: 1, overflowY: 'auto' }}>
                <SectMenu />
            </Box>
            <Footer />
        </Box>
    );
}