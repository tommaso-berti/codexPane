import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";

export default function SectMenuItem({section, subsections, selected, setSelected, openSections, setOpenSections}) {
    const navigate = useNavigate();
    const { pathname, hash } = useLocation();
    const { section: sectionParam } = useParams();
    const anchor = hash ? decodeURIComponent(hash.slice(1)) : null;

    const isSectionInPath = !!section.slug && pathname.includes(`/${section.slug}`);
    const isSectionParamMatch = sectionParam === section.id;
    const isAnchorInThisSection = anchor && subsections?.some(s => s.id === anchor);
    const shouldBeOpen = isSectionInPath || isSectionParamMatch || isAnchorInThisSection;

    const isControlled = Array.isArray(openSections) && typeof setOpenSections === "function";
    const [localOpen, setLocalOpen] = useState(shouldBeOpen);
    const open = isControlled ? openSections.includes(section.id) : localOpen;
    const suppressAutoOpen = useRef(false);

    useEffect(() => {
        suppressAutoOpen.current = false;
    }, [pathname, hash, sectionParam]);

    useEffect(() => {
        if (!shouldBeOpen || suppressAutoOpen.current) return;
        if (isControlled) {
            if (!openSections.includes(section.id)) {
                setOpenSections((prev) => [...prev, section.id]);
            }
        } else {
            setLocalOpen(true);
        }
    }, [shouldBeOpen, isControlled, openSections, section.id, setOpenSections]);

    useEffect(() => {
        if (!shouldBeOpen) return;
        if (anchor) {
            const sub = subsections?.find((s) => s.id === anchor);
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
        isSectionParamMatch,
    ]);


    const handleClick = () => {
        if (isControlled) {
            const currentlyOpen = openSections.includes(section.id);
            if (currentlyOpen) {
                suppressAutoOpen.current = true;
                setOpenSections(openSections.filter((id) => id !== section.id));
            } else {
                setOpenSections([...openSections, section.id]);
            }
        } else {
            if (open) {
                suppressAutoOpen.current = true;
            }
            setLocalOpen((prev) => !prev);
        }
        setSelected?.({ type: "section", value: section.id });
        //navigate(`${section.slug}`);
    };

    const handleSelect = (slug, subsection) => {
        setSelected?.({ type: "subsection", value: subsection.id });
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