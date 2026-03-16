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
                    py: 0.8,
                    px: 1,
                    minWidth: 0,
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'transparent',
                    position: 'relative',
                    '& .MuiTypography-root': {
                        fontWeight: 650,
                        color: 'text.primary',
                    },
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: 7,
                        bottom: 7,
                        width: 3,
                        borderRadius: 4,
                        backgroundColor: selected?.type === "section" && selected?.value === section.id ? 'primary.main' : 'transparent',
                    },
                    '&:hover': {
                        backgroundColor: 'action.hover',
                        borderColor: 'divider',
                    },
                    '&.Mui-selected': {
                        backgroundColor: 'action.selected',
                        borderColor: 'primary.light',
                    },
                }}
            >
                <ListItemText
                    sx={{ minWidth: 0, pr: 0.6 }}
                    primary={<Typography noWrap>{section.title}</Typography>}
                />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List dense={true} component="div" disablePadding>
                    {subsections?.map((subsection) => (
                        <ListItemButton
                            key={subsection.id}
                            onClick={() => handleSelect(subsection.slug)}
                            sx={{
                                pl: 4.5,
                                ml: 0.5,
                                minWidth: 0,
                                minHeight: 34,
                                borderRadius: 1.6,
                                '& .MuiTypography-root': {
                                    fontWeight: 500,
                                    color: 'text.secondary',
                                },
                                '&:hover': {
                                    backgroundColor: 'action.hover',
                                    '& .MuiTypography-root': {
                                        color: 'text.primary',
                                    },
                                },
                                '&.Mui-selected': {
                                    backgroundColor: 'action.selected',
                                    '& .MuiTypography-root': {
                                        color: 'text.primary',
                                        fontWeight: 600,
                                    },
                                },
                            }}
                            selected={selected?.type === 'subsection' && selected?.value === subsection.id}
                        >
                            <ListItemText
                                sx={{ minWidth: 0, pr: 0.5 }}
                                primary={<Typography noWrap>{subsection.title}</Typography>}
                            />
                        </ListItemButton>
                    ))}
                </List>
            </Collapse>
        </>
    );
}
