import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import StarBorder from "@mui/icons-material/StarBorder";

export default function SectMenuItem({section, subsections}) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        setOpen(!open);
        navigate(`${section.slug}`)
    };

    const handleSelect = (slug) => {
        navigate(`${slug}`);
    };

    return (
        <>
            <ListItemButton key={section.id} onClick={handleClick}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={<Typography noWrap>{section.title}</Typography>} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {subsections.map((subsection) => (
                        <ListItemButton key={subsection.id} onClick={() => handleSelect(subsection.slug)} sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary={<Typography noWrap>{subsection.title}</Typography>} />
                        </ListItemButton>
                    ))}
                </List>
            </Collapse>
        </>
    );
}