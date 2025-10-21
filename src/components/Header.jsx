import DocMenu from "./DocMenu.jsx";
import Breadcrumb from "./Breadcrumb.jsx";
import SearchModal from "../features/search/SearchModal.jsx";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import SettingsIcon from "@mui/icons-material/Settings";

export default function Header({onOpenDrawer}) {
    return (
        <header className="border-b border-black h-18 top-0 w-full fixed z-10 bg-white flex items-center justify-between pl-5 pr-5">
            <div className="flex items-baseline gap-6 mr-5">
                <h1 className="text-black text-4xl font-bold">CodexPane</h1>
                <DocMenu />
                <Breadcrumb />
            </div>
            <div className="max-w ml-5">
                <SearchModal />
                <IconButton aria-label="github" size="large" href="https://github.com/tommaso-berti/codexPane" target="_blank">
                    <GitHubIcon fontSize="inherit"/>
                </IconButton>
                <Button variant="outlined" onClick={onOpenDrawer}><SettingsIcon /></Button>
            </div>
        </header>
    );
}