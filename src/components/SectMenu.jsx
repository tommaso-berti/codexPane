import List from '@mui/material/List';
import SectionMenuItem from './SectMenuItem.jsx';
import { useDocs } from '../contexts/useDocs.js';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { useActiveSection } from '../features/docs/useActiveSection.js';

function normalizeHeadingId(id) {
    if (!id) return '';
    return id.replace(/-\d+$/, '');
}

export default function SectMenu() {
    const { docs = [] } = useDocs();
    const { docs: docsParam, section: sectionParam } = useParams();
    const { pathname, hash } = useLocation();
    const { activeSectionId } = useActiveSection();
    const hashAnchor = hash ? decodeURIComponent(hash.slice(1)) : null;
    const anchor = activeSectionId || hashAnchor || null;
    const normalizedAnchor = normalizeHeadingId(anchor);
    const currentSections = useMemo(() => {
        const currentDoc = docs.find((doc) => doc.id === docsParam);
        return currentDoc ? currentDoc.sections : [];
    }, [docs, docsParam]);
    const [openSections, setOpenSections] = useState([]);

    useEffect(() => {
        setOpenSections([]);
    }, [docsParam]);

    const selected = useMemo(() => {
        const currentSection = currentSections.find((section) => {
            const isInPath = !!section.slug && pathname.includes(`/${section.slug}`);
            const isParamMatch = sectionParam === section.id;
            return isInPath || isParamMatch;
        });

        if (anchor && currentSection) {
            const subsection = currentSection?.subSections?.find(
                (sub) => sub.id === anchor || sub.id === normalizedAnchor
            );
            if (subsection) {
                return { type: 'subsection', value: subsection.id, sectionId: currentSection.id };
            }
        }

        if (anchor) {
            for (const section of currentSections) {
                const subsection = section?.subSections?.find(
                    (sub) => sub.id === anchor || sub.id === normalizedAnchor
                );
                if (subsection) {
                    return { type: 'subsection', value: subsection.id, sectionId: section.id };
                }
            }
        }

        for (const section of currentSections) {
            const isInPath = !!section.slug && pathname.includes(`/${section.slug}`);
            const isParamMatch = sectionParam === section.id;
            if (isInPath || isParamMatch) {
                return { type: 'section', value: section.id, sectionId: section.id };
            }
        }
        return null;
    }, [anchor, normalizedAnchor, currentSections, pathname, sectionParam]);

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
                px: 0,
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
