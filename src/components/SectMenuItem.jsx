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
    const isSectionActive = selected?.type === "section" && selected?.value === section.id;

    const handleClick = () => {
        onToggle?.();
    };

    const handleSelect = (slug) => {
        if (!slug) return;
        navigate(slug.startsWith('/') ? slug : `/${slug}`);
    };

    return (
        <>
            <ListItemButton
                onClick={handleClick}
                sx={{
                    py: 0.78,
                    px: 1.2,
                    minWidth: 0,
                    borderRadius: 1.6,
                    position: 'relative',
                    overflow: 'hidden',
                    width: '100%',
                    '& .MuiTypography-root': {
                        fontWeight: isSectionActive ? 650 : 600,
                        color: isSectionActive ? 'text.primary' : 'text.secondary',
                    },
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        left: 4,
                        top: 8,
                        bottom: 8,
                        width: 2,
                        borderRadius: 2,
                        backgroundColor: isSectionActive ? 'primary.main' : 'transparent',
                    },
                    '&:hover': {
                        backgroundColor: 'action.hover',
                        '& .MuiTypography-root': {
                            color: 'text.primary',
                        },
                    },
                }}
            >
                <ListItemText
                    sx={{ minWidth: 0, pr: 0.6, pl: 0.6 }}
                    primary={
                        <Typography
                            sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflowWrap: 'anywhere',
                                lineHeight: 1.25,
                            }}
                        >
                            {section.title}
                        </Typography>
                    }
                />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List dense={true} component="div" disablePadding sx={{ overflowX: 'hidden' }}>
                    {subsections?.map((subsection) => {
                        const isSubsectionActive =
                            selected?.type === 'subsection' && selected?.value === subsection.id;
                        return (
                        <ListItemButton
                            key={subsection.id}
                            onClick={() => handleSelect(subsection.slug)}
                            sx={{
                                pl: 3.85,
                                pr: 1.1,
                                ml: 0,
                                mr: 0,
                                mt: 0.12,
                                minWidth: 0,
                                py: 0.7,
                                alignItems: 'flex-start',
                                borderRadius: 1.2,
                                position: 'relative',
                                overflow: 'hidden',
                                width: '100%',
                                '& .MuiTypography-root': {
                                    fontWeight: isSubsectionActive ? 610 : 500,
                                    color: isSubsectionActive ? 'text.primary' : 'text.secondary',
                                },
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    left: 4,
                                    top: 7,
                                    bottom: 7,
                                    width: 2,
                                    borderRadius: 2,
                                    backgroundColor: isSubsectionActive ? 'primary.main' : 'transparent',
                                },
                                '&:hover': {
                                    backgroundColor: 'action.hover',
                                    '& .MuiTypography-root': {
                                        color: 'text.primary',
                                    },
                                },
                            }}
                            selected={false}
                        >
                            <ListItemText
                                sx={{ minWidth: 0, pr: 0.5, pl: 0.8 }}
                                primary={
                                    <Typography
                                        sx={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflowWrap: 'anywhere',
                                            lineHeight: 1.22,
                                        }}
                                    >
                                        {subsection.title}
                                    </Typography>
                                }
                            />
                        </ListItemButton>
                        );
                    })}
                </List>
            </Collapse>
        </>
    );
}
