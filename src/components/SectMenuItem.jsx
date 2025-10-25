import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {useNavigate, useParams} from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";

export default function SectMenuItem({section, subsections, selected, setSelected}) {
    const navigate = useNavigate();
    const { pathname, hash } = useLocation();
    const { section: sectionParam } = useParams();
    const anchor = hash ? decodeURIComponent(hash.slice(1)) : null;

    const isSectionInPath = !!section.slug && pathname.includes(`/${section.slug}`);
    const isSectionParamMatch = sectionParam === section.id;
    const isAnchorInThisSection = anchor && subsections?.some(s => s.id === anchor);
    const shouldBeOpen = isSectionInPath || isSectionParamMatch || isAnchorInThisSection;
    const [open, setOpen] = useState(shouldBeOpen);

    useEffect(() => {
        if (shouldBeOpen) setOpen(true);
    }, [shouldBeOpen]);

    useEffect(() => {
        if (!shouldBeOpen) return;
        if (anchor) {
            const sub = subsections?.find(s => s.id === anchor);
            if (sub && (selected?.type !== "subsection" || selected?.value !== sub.id)) {
                setSelected?.({ type: "subsection", value: sub.id });
            }
            return;
        }
        if ((isSectionInPath || isSectionParamMatch) &&
            (selected?.type !== "section" || selected?.value !== section.id)) {
            setSelected?.({ type: "section", value: section.id });
        }
    }, [
        anchor,
        pathname,
        sectionParam,
        shouldBeOpen,
        subsections,
        section.id,
        selected?.type,
        selected?.value,
        setSelected,
        isSectionInPath,
        isSectionParamMatch
    ]);


    const handleClick = () => {
        setOpen(prev => !prev);
        setSelected?.({ type: "section", value: section.id });
        navigate(`${section.slug}`)
    };

    const handleSelect = (slug, subsection) => {
        setSelected?.({ type: "subsection", value: subsection.id });
        navigate(`${slug}`);
    };

    return (
        <>
            <ListItemButton
                key={section.id}
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
                    {subsections.map((subsection) => (
                        <ListItemButton
                            key={subsection.id}
                            onClick={() => handleSelect(subsection.slug, subsection)}
                            sx={{
                                pl: 4, '& .MuiTypography-root': {
                                    fontWeight: 500,
                                }
                            }}
                            selected={selected?.type === "subsection" && selected?.value === subsection.id}
                        >
                            <ListItemText primary={<Typography noWrap>{subsection.title}</Typography>} />
                        </ListItemButton>
                    ))}
                </List>
            </Collapse>
        </>
    );
}