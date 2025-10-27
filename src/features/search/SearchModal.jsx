import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import SearchIcon from "@mui/icons-material/Search";
import { useMiniSearchFromDocs } from './useMiniSearchFromDocs';
import SearchInput from "./SearchInput.jsx";
import SearchResults from "./SearchResults.jsx";
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute',
    top: '10%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '50%',
    height: '50%',
    overflow: 'auto',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius: '10px',
    boxShadow: 24,
    p: 2
};

export default function SearchModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setSearchString('');
    }
    const [searchString, setSearchString] = useState('');
    const [results, setResults] = useState([]);
    const [topics, setTopics] = useState([]);

    const { search } = useMiniSearchFromDocs();
    const navigate = useNavigate();

    useEffect(() => {
        const found = search(searchString);
        setResults(found);
        const uniqTopics = [
            ...new Map(
                found.map(r => [r.topic, { topic: r.topic, topictitle: r.topictitle }])
            ).values()
        ];
        setTopics(uniqTopics);
    }, [searchString, search]);

    const handleClick = (path) => {
        handleClose()
        navigate(path)
    }

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
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%'}}>
                        <SearchInput value={searchString} onChange={(e) => setSearchString(e.target.value)} />
                        <IconButton aria-label="delete" color="primary" onClick={() => handleClose()}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <SearchResults topics={topics}  results={results} onItemClick={handleClick} />
                </Box>
            </Modal>
        </>
    );
}