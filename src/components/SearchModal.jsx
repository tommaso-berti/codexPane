import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

const style = {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '40%',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius: '10px',
    boxShadow: 24,
    p: 2
};

export default function SearchModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [searchString, setSearchString] = useState('');
    const handleBlur = () => {
        setSearchString('');
    };

    return (
        <>
            <Button variant="outlined" startIcon={<SearchIcon />} onClick={handleOpen}>Search...</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="search-bar" variant="h12" component="header">
                        <TextField
                            fullWidth
                            label={
                                <>
                                    <SearchIcon sx={{ fontSize: 20, mr: 0.5, verticalAlign: 'middle' }} />
                                    Search
                                </>
                            }
                            id="search"
                            size="small"
                            variant="filled"
                            autoComplete="off"
                            value={searchString}
                            onChange={(e) => setSearchString(e.target.value)}
                            onBlur={handleBlur}
                        />
                    </Typography>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal>
        </>
    );
}