import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";

export default function SearchInput({value, onChange}) {
    return (
        <Box
            sx={{
                position: 'sticky',
                backgroundColor: 'background.paper',
                zIndex: 1,
                flexGrow: 1
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
                autoFocus
                value={value}
                onChange={onChange}
            />
        </Box>
    )
}