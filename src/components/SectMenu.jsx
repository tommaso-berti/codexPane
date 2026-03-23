import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import SearchIcon from '@mui/icons-material/Search';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import SectionMenuItem from './SectMenuItem.jsx';
import { useDocs } from '../contexts/useDocs.js';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { useActiveSection } from '../features/docs/useActiveSection.js';

const SIDEBAR_OPTIONS_STORAGE_KEY = 'codexpane.sidebar.options.v1';

function normalizeHeadingId(id) {
    if (!id) return '';
    return id.replace(/-\d+$/, '');
}

function normalizePathname(pathname) {
    if (!pathname) return '/';
    const trimmed = pathname.replace(/\/+$/, '');
    return trimmed || '/';
}

function isSectionPathMatch(pathname, sectionSlug) {
    if (!sectionSlug) return false;
    return normalizePathname(pathname) === normalizePathname(`/${sectionSlug}`);
}

function parseStoredSidebarOptions(rawValue) {
    if (!rawValue) return null;
    try {
        const parsed = JSON.parse(rawValue);
        if (!parsed || typeof parsed !== 'object') return null;

        const searchQuery = typeof parsed.searchQuery === 'string' ? parsed.searchQuery : '';
        const showOnlyPlaygroundPages = Boolean(parsed.showOnlyPlaygroundPages);
        const openSectionsByTopic =
            parsed.openSectionsByTopic &&
            typeof parsed.openSectionsByTopic === 'object' &&
            !Array.isArray(parsed.openSectionsByTopic)
                ? parsed.openSectionsByTopic
                : {};

        return { searchQuery, showOnlyPlaygroundPages, openSectionsByTopic };
    } catch {
        return null;
    }
}

function sectionHasPlayground(section) {
    if (!section) return false;
    const sectionTitle = (section.title || '').toLowerCase();
    if (sectionTitle.includes('interactive playground')) return true;
    return (section.subSections || []).some((subSection) =>
        (subSection.title || '').toLowerCase().includes('interactive playground')
    );
}

export default function SectMenu() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
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
    const hasSelectedTopic = Boolean(docsParam);
    const [searchQuery, setSearchQuery] = useState('');
    const [showOnlyPlaygroundPages, setShowOnlyPlaygroundPages] = useState(false);
    const [openSectionsByTopic, setOpenSectionsByTopic] = useState({});

    useEffect(() => {
        try {
            const parsed = parseStoredSidebarOptions(localStorage.getItem(SIDEBAR_OPTIONS_STORAGE_KEY));
            if (!parsed) return;
            setSearchQuery(parsed.searchQuery);
            setShowOnlyPlaygroundPages(parsed.showOnlyPlaygroundPages);
            setOpenSectionsByTopic(parsed.openSectionsByTopic);
        } catch {
            // Ignore storage read errors and keep defaults.
        }
    }, []);

    useEffect(() => {
        const data = {
            searchQuery,
            showOnlyPlaygroundPages,
            openSectionsByTopic,
        };
        try {
            localStorage.setItem(SIDEBAR_OPTIONS_STORAGE_KEY, JSON.stringify(data));
        } catch {
            // Ignore storage write errors.
        }
    }, [searchQuery, showOnlyPlaygroundPages, openSectionsByTopic]);

    const openSections = useMemo(() => {
        if (!docsParam) return [];
        const topicOpenSections = openSectionsByTopic[docsParam];
        return Array.isArray(topicOpenSections) ? topicOpenSections : [];
    }, [openSectionsByTopic, docsParam]);

    const setOpenSections = (updater) => {
        if (!docsParam) return;
        setOpenSectionsByTopic((previous) => {
            const currentValue = Array.isArray(previous[docsParam]) ? previous[docsParam] : [];
            const nextValue = typeof updater === 'function' ? updater(currentValue) : updater;
            return {
                ...previous,
                [docsParam]: nextValue,
            };
        });
    };

    const selected = useMemo(() => {
        const currentSection = currentSections.find((section) => {
            const isInPath = isSectionPathMatch(pathname, section.slug);
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
            const isInPath = isSectionPathMatch(pathname, section.slug);
            const isParamMatch = sectionParam === section.id;
            if (isInPath || isParamMatch) {
                return { type: 'section', value: section.id, sectionId: section.id };
            }
        }
        return null;
    }, [anchor, normalizedAnchor, currentSections, pathname, sectionParam]);

    const normalizedSearchQuery = searchQuery.trim().toLowerCase();
    const isPlaygroundFilterEnabled = !isMobile && showOnlyPlaygroundPages;
    const visibleSections = useMemo(() => {
        return currentSections.reduce((accumulator, section) => {
            if (isPlaygroundFilterEnabled && !sectionHasPlayground(section)) {
                return accumulator;
            }

            const allSubsections = section?.subSections ?? [];
            if (!normalizedSearchQuery) {
                accumulator.push({
                    ...section,
                    filteredSubSections: allSubsections,
                    forceOpen: false,
                });
                return accumulator;
            }

            const sectionMatches = (section.title || '').toLowerCase().includes(normalizedSearchQuery);
            const matchingSubsections = allSubsections.filter((subsection) =>
                (subsection.title || '').toLowerCase().includes(normalizedSearchQuery)
            );

            if (!sectionMatches && matchingSubsections.length === 0) {
                return accumulator;
            }

            accumulator.push({
                ...section,
                filteredSubSections: sectionMatches ? allSubsections : matchingSubsections,
                forceOpen: matchingSubsections.length > 0,
            });
            return accumulator;
        }, []);
    }, [currentSections, normalizedSearchQuery, isPlaygroundFilterEnabled]);

    useEffect(() => {
        if (!selected?.sectionId) return;
        const selectedSection = currentSections.find((section) => section.id === selected.sectionId);
        const hasSubsections = (selectedSection?.subSections?.length ?? 0) > 0;
        if (!hasSubsections) return;
        setOpenSections((previous) =>
            previous.includes(selected.sectionId) ? previous : [...previous, selected.sectionId]
        );
    }, [selected?.sectionId, currentSections]);

    const handleToggle = (sectionId, hasSubsections) => {
        if (!hasSubsections) return;
        setOpenSections((previous) =>
            previous.includes(sectionId)
                ? previous.filter((id) => id !== sectionId)
                : [...previous, sectionId]
        );
    };

    const handleExpandAll = () => {
        const sectionIdsWithChildren = visibleSections
            .filter((section) => (section?.filteredSubSections?.length ?? 0) > 0)
            .map((section) => section.id);
        setOpenSections(sectionIdsWithChildren);
    };

    const handleCollapseAll = () => {
        setOpenSections([]);
    };

    const handleReset = () => {
        setSearchQuery('');
        setShowOnlyPlaygroundPages(false);
        setOpenSections([]);
    };

    return (
        <Box
            sx={{
                flex: 1,
                minHeight: 0,
                overflow: 'hidden',
                overflowX: 'hidden',
                px: 0.8,
                pt: 1.2,
                pb: 1.4,
                display: 'grid',
                gap: 0.9,
            }}
        >
            {hasSelectedTopic ? (
                <Stack spacing={1} sx={{ px: 0.3 }}>
                    <TextField
                        size="small"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        placeholder="Search sections..."
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon fontSize="small" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Stack direction="row" spacing={1}>
                        <Button size="small" variant="outlined" fullWidth onClick={handleExpandAll}>
                            Expand all
                        </Button>
                        <Button size="small" variant="outlined" fullWidth onClick={handleCollapseAll}>
                            Collapse all
                        </Button>
                    </Stack>
                    {!isMobile ? (
                        <>
                            <FormControlLabel
                                sx={{ ml: 0.25, mr: 0.25 }}
                                control={
                                    <Switch
                                        size="small"
                                        checked={showOnlyPlaygroundPages}
                                        onChange={(event) => setShowOnlyPlaygroundPages(event.target.checked)}
                                    />
                                }
                                label="Only pages with playground"
                            />
                            <Button size="small" variant="text" onClick={handleReset}>
                                Reset
                            </Button>
                        </>
                    ) : null}
                </Stack>
            ) : null}

            <List
                dense
                disablePadding
                sx={{
                    minHeight: 0,
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    px: 0,
                    py: 0.1,
                    display: 'grid',
                    gap: 0.65,
                }}
            >
            {visibleSections.map((section) => {
                const currentSubsections = section?.filteredSubSections ?? [];
                const hasSubsections = currentSubsections.length > 0;
                const isOpen = openSections.includes(section.id) || section.forceOpen;
                return (
                    <SectionMenuItem
                        key={section.id}
                        section={section}
                        subsections={currentSubsections}
                        selected={selected}
                        open={isOpen}
                        onToggle={() => handleToggle(section.id, hasSubsections)}
                    />
                );
            })}
            </List>
        </Box>
    );
}
