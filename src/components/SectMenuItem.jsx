import { useNavigate } from 'react-router-dom';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";

export default function SectMenuItem({ section, subsections, selected, open, onToggle }) {
    const navigate = useNavigate();

    const handleClick = () => {
        onToggle?.();
    };

    const handleSelect = (slug) => {
        navigate(`${slug}`);
    };

    return (
        <>
            <ListItemButton
                onClick={handleClick}
                selected={selected?.type === "section" && selected?.value === section.id}
                sx={{
                    '& .MuiTypography-root': {
                        fontWeight: 700,
                    }
                }}
            >
                <ListItemText primary={<Typography noWrap>{section.title}</Typography>} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List dense={true} component="div" disablePadding>
                    {subsections?.map((subsection) => (
                        <ListItemButton
                            key={subsection.id}
                            onClick={() => handleSelect(subsection.slug)}
                            sx={{
                                pl: 4, '& .MuiTypography-root': {
                                    fontWeight: 500,
                                }
                            }}
                            selected={selected?.type === 'subsection' && selected?.value === subsection.id}
                        >
                            <ListItemText primary={<Typography noWrap>{subsection.title}</Typography>} />
                        </ListItemButton>
                    ))}
                </List>
            </Collapse>
        </>
    );
}
