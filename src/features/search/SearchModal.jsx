import { useDeferredValue, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import SearchIcon from "@mui/icons-material/Search";
import KeyboardCommandKeyIcon from '@mui/icons-material/KeyboardCommandKey';
import { useMiniSearchFromDocs } from './useMiniSearchFromDocs';
import SearchInput from "./SearchInput.jsx";
import SearchResults from "./SearchResults.jsx";
import CloseIcon from '@mui/icons-material/Close';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const style = {
    position: 'absolute',
    top: '8%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: { xs: '94%', md: '72%', lg: '58%' },
    maxWidth: 860,
    height: { xs: '82%', md: '70%' },
    overflow: 'auto',
    backgroundColor: 'background.paper',
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: 3,
    boxShadow: 4,
    p: 3
};

function isTypingContext(target) {
    if (!target) return false;
    const tag = target.tagName?.toLowerCase();
    return tag === 'input' || tag === 'textarea' || target.isContentEditable || tag === 'select';
}

export default function SearchModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setSearchString('');
    }
    const [searchString, setSearchString] = useState('');

    const { search, isLoadingIndex } = useMiniSearchFromDocs(open);
    const navigate = useNavigate();
    const deferredQuery = useDeferredValue(searchString);
    const results = useMemo(() => search(deferredQuery), [search, deferredQuery]);
    const isMac = /mac|iphone|ipad/i.test(navigator.platform);

    useEffect(() => {
        const onKeyDown = (event) => {
            if (isTypingContext(event.target)) return;
            const key = event.key.toLowerCase();
            if ((event.metaKey || event.ctrlKey) && key === 'k') {
                event.preventDefault();
                handleOpen();
                return;
            }
            if (!event.metaKey && !event.ctrlKey && !event.altKey && event.key === '/') {
                event.preventDefault();
                handleOpen();
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);

    const handleClick = (path) => {
        handleClose()
        navigate(path)
    }

    return (
        <>
            <Button
                variant="outlined"
                onClick={handleOpen}
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 1.2,
                    minWidth: { xs: 120, md: 250 },
                    px: 1.2,
                    py: 0.7,
                    borderRadius: 2,
                    borderColor: 'divider',
                    backgroundColor: 'background.paper',
                    color: 'text.secondary',
                    textTransform: 'none',
                    '&:hover': {
                        borderColor: 'primary.light',
                        backgroundColor: 'action.hover',
                        color: 'text.primary',
                    },
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                    <SearchIcon fontSize="small" />
                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 500 }}>Search docs</Typography>
                </Box>
                <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.4, opacity: 0.85 }}>
                    {isMac ? <KeyboardCommandKeyIcon sx={{ fontSize: 14 }} /> : <Typography sx={{ fontSize: '0.72rem' }}>Ctrl</Typography>}
                    <Typography sx={{ fontSize: '0.72rem' }}>{isMac ? 'K' : '+ K'}</Typography>
                    <Typography sx={{ fontSize: '0.72rem', ml: 0.3 }}>/</Typography>
                </Box>
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                slotProps={{
                    backdrop: {
                        sx: (theme) => ({
                            backgroundColor: alpha(theme.palette.background.default, 0.6),
                            backdropFilter: 'blur(2px)',
                            WebkitBackdropFilter: 'blur(2px)'
                        })
                    }
                }}
            >
                <Box sx={style}>
                    <Box sx={{ display: 'flex', gap:2, mb: 0.5 }}>
                        <SearchInput value={searchString} onChange={(e) => setSearchString(e.target.value)} />
                        <IconButton aria-label="delete" color="primary" onClick={() => handleClose()}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    {isLoadingIndex ? (
                        <Typography variant="body2" color="text.secondary" sx={{ px: 0.5, py: 1 }}>
                            Loading search index...
                        </Typography>
                    ) : null}
                    <SearchResults results={results} onItemClick={handleClick} />
                </Box>
            </Modal>
        </>
    );
}
