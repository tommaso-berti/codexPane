import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";

export default function SearchInput({value, onChange}) {
    return (
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
                value={value}
                onChange={onChange}
            />
        </Box>
    )
}