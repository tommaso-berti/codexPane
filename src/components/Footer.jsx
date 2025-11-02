import { APP_VERSION } from '../lib/version.js';
import {useState} from "react";
import ReleaseNotesModal from "./ReleaseNotesModal.jsx";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';

export default function Footer() {
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    return (
        <Box
            component="footer"
            sx={{
                width: '100%',
                height: 40,
                backgroundColor: 'background.paper',
                borderTop: 1,
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 2,
            }}
        >
            <Typography variant="body2" color="text.secondary">
                ©2025{' '}
                <Link href="https://www.tommasoberti.com" underline="hover" color="inherit">
                    Tommaso Berti
                </Link>
            </Typography>
            <Typography variant="body2" component="div">
                <Button
                    onClick={() => setOpen(true)}
                    color="inherit"
                    variant="text"
                    size="small"
                    sx={{ minWidth: 'auto', px: 0.5, py: 0, lineHeight: 1.2, textTransform: 'none' }}
                >
                    {APP_VERSION}
                </Button>
            </Typography>
            <ReleaseNotesModal open={open} onClose={closeModal} />
        </Box>
    );
}