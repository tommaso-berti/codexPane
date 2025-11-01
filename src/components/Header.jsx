import DocMenu from "./DocMenu.jsx";
import Breadcrumb from "./Breadcrumb.jsx";
import SearchModal from "../features/search/SearchModal.jsx";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import SettingsIcon from "@mui/icons-material/Settings";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Header({onOpenDrawer}) {
    return (
        <Box
            component="header"
            sx={{
                position: 'fixed',
                top: 0,
                width: '100%',
                zIndex: 10,
                backgroundColor: 'background.paper',
                color: 'text.primary',
                borderBottom: 1,
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 2.5,
                height: 72
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mr: 2.5 }}>
                <Typography
                    variant="h4"
                    component="h1"
                    fontWeight={700}
                    color="primary"
                    noWrap
                >
                    CodexPane
                </Typography>
                <DocMenu />
                <Breadcrumb />
            </Box>
            <Box sx={{ ml: 2.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                <SearchModal />
                <IconButton aria-label="github" size="large" href="https://github.com/tommaso-berti/codexPane" target="_blank" sx={{color: 'inherit'}}>
                    <GitHubIcon fontSize="inherit"/>
                </IconButton>
                <Button variant="outlined" onClick={onOpenDrawer}><SettingsIcon /></Button>
            </Box>
        </Box>
    );
}