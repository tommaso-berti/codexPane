import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar() {
    return (
        <Box sx={{ width: "100%", maxHeight: "70%" }}>
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
            />
        </Box>
    );
}
