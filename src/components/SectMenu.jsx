import List from '@mui/material/List';
import SectionMenuItem from './SectMenuItem.jsx';
import { useDocs } from '../contexts/useDocs.js';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';


export default function SectMenu() {
    const { docs = [] } = useDocs();
    const { docs: docsParam, section: sectionParam } = useParams();
    const { pathname, hash } = useLocation();
    const anchor = hash ? decodeURIComponent(hash.slice(1)) : null;
    const currentSections = useMemo(() => {
        const currentDoc = docs.find((doc) => doc.id === docsParam);
        return currentDoc ? currentDoc.sections : [];
    }, [docs, docsParam]);
    const [openSections, setOpenSections] = useState([]);

    useEffect(() => {
        setOpenSections([]);
    }, [docsParam]);

    const selected = useMemo(() => {
        for (const section of currentSections) {
            if (anchor) {
                const subsection = section?.subSections?.find((sub) => sub.id === anchor);
                if (subsection) {
                    return { type: 'subsection', value: subsection.id, sectionId: section.id };
                }
            }
            const isInPath = !!section.slug && pathname.includes(`/${section.slug}`);
            const isParamMatch = sectionParam === section.id;
            if (isInPath || isParamMatch) {
                return { type: 'section', value: section.id, sectionId: section.id };
            }
        }
        return null;
    }, [anchor, currentSections, pathname, sectionParam]);

    useEffect(() => {
        if (!selected?.sectionId) return;
        setOpenSections((previous) =>
            previous.includes(selected.sectionId) ? previous : [...previous, selected.sectionId]
        );
    }, [selected?.sectionId]);

    const handleToggle = (sectionId) => {
        setOpenSections((previous) =>
            previous.includes(sectionId)
                ? previous.filter((id) => id !== sectionId)
                : [...previous, sectionId]
        );
    };

    return (
        <List
            dense
            disablePadding
            sx={{
                flex: 1,
                minHeight: 0,
                overflowY: 'auto',
                overflowX: 'hidden',
                px: 1.2,
                py: 1.4,
                display: 'grid',
                gap: 0.65,
            }}
        >
            {currentSections.map((section) => {
                const currentSubsections = section?.subSections ?? [];
                return (
                    <SectionMenuItem
                        key={section.id}
                        section={section}
                        subsections={currentSubsections}
                        selected={selected}
                        open={openSections.includes(section.id)}
                        onToggle={() => handleToggle(section.id)}
                    />
                );
            })}
        </List>
    );
}
