import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { useMiniSearchFromDocs } from './useMiniSearchFromDocs';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";

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
    const { search } = useMiniSearchFromDocs();
    const navigate = useNavigate();

    console.log(results);

    useEffect(() => {
            setResults(search(searchString));
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
                    <Box
                        sx={{
                            position: 'sticky',
                            bgcolor: 'background.paper',
                            zIndex: 1,
                            mb: 2,
                        }}
                    >
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
                            variant="outlined"
                            autoComplete="off"
                            value={searchString}
                            onChange={(e) => setSearchString(e.target.value)}
                        />
                    </Box>
                    <Box>
                        <List dense={true} component="div" disablePadding>
                        {
                           results.length > 0 ? (
                                 results.map((result) => (
                                     <ListItemButton
                                        key={result.id}
                                        onClick={() => handleClick(result.path)}
                                        sx={{
                                            border: '1px solid #ccc',
                                            borderRadius: '5px',
                                            p: 1,
                                            mb: 1,
                                            cursor: 'pointer',
                                            flexDirection: 'column',
                                            alignItems: 'flex-start',
                                            width: '100%'
                                        }}
                                     >
                                         <ListItemText primary={<Typography variant="h6" >{result.breadcrumb[0]}</Typography>} />
                                         <ListItemText primary={<Typography variant="subtitle1" >{result.breadcrumb[1]}</Typography>} />
                                         <ListItemText primary={<Typography variant="subtitle2" >{result.breadcrumb[2]}</Typography>} />
                                     </ListItemButton>
                                 ))
                           ) : (
                                 <Typography variant="subtitle1" color="text.secondary">
                                     {searchString ? 'No results found.' : 'Type to search documentation.' }
                                 </Typography>
                           )
                        }
                        </List>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}