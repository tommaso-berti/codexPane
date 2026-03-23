import { useEffect, useState } from 'react';
import { Outlet, useMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './Header';
import Sidebar from './Sidebar';
import SettingsDrawer from './SettingsDrawer.jsx';
import Box from '@mui/material/Box';
import { HEADER_HEIGHT_DEFAULT, HEADER_HEIGHT_DOCS } from '../lib/layout.js';
import { ActiveSectionProvider } from '../features/docs/ActiveSectionContext.jsx';
import { useActiveSection } from '../features/docs/useActiveSection.js';

const SIDEBAR_WIDTH = 312;

function LayoutInner() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const openDrawer = () => setDrawerOpen(true);
    const closeDrawer = () => setDrawerOpen(false);
    const docsRouteMatch = useMatch('/:docs');
    const sectionRouteMatch = useMatch('/:docs/:section');
    const isDocsPage = Boolean(docsRouteMatch || sectionRouteMatch);
    const uiPrefs = useSelector((state) => state.uiPrefs);
    const advancedMode = uiPrefs?.advancedMode || 'default';
    const showDocsBreadcrumb = isDocsPage && advancedMode === 'default';
    const headerHeight = isDocsPage
        ? (showDocsBreadcrumb ? HEADER_HEIGHT_DOCS : HEADER_HEIGHT_DEFAULT)
        : HEADER_HEIGHT_DEFAULT;
    const isZenMode = isDocsPage && advancedMode === 'zen';
    const isFocusMode = isDocsPage && advancedMode === 'focus';
    const isPresentationMode = isDocsPage && advancedMode === 'presentation';
    const showSidebar = !isZenMode;
    const contentWidth = uiPrefs?.contentWidth || 'wide';
    const baseFontScale = uiPrefs?.fontSize === 'small' ? 0.94 : uiPrefs?.fontSize === 'large' ? 1.08 : 1;
    const fontScale = isPresentationMode ? baseFontScale * 1.08 : baseFontScale;
    const lineHeight = isPresentationMode ? 1.9 : (uiPrefs?.lineSpacing === 'compact' ? 1.62 : 1.84);
    const codeBlockPaddingY = uiPrefs?.codeBlockStyle === 'spacious' ? '1.22rem' : '0.94rem';
    const codeBlockPaddingX = uiPrefs?.codeBlockStyle === 'spacious' ? '1.18rem' : '1.02rem';
    const docsMaxWidth =
        contentWidth === 'narrow'
            ? (isPresentationMode ? 980 : 900)
            : (isPresentationMode ? 1200 : 1160);
    const { setActiveSectionId } = useActiveSection();

    useEffect(() => {
        if (!isDocsPage) {
            setActiveSectionId('');
        }
    }, [isDocsPage, setActiveSectionId]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100dvh',
                width: '100%',
                '--header-h': `${headerHeight}px`,
            }}
        >
            <Header
                onOpenDrawer={openDrawer}
                showDocsBreadcrumb={showDocsBreadcrumb}
                advancedMode={advancedMode}
            />
            <SettingsDrawer open={drawerOpen} onClose={closeDrawer} />

            <Box
                sx={{
                    display: 'flex',
                    flex: 1,
                    mt: `${headerHeight}px`,
                    width: '100%',
                    height: `calc(100dvh - ${headerHeight}px)`,
                    minHeight: 0,
                }}
            >
                {showSidebar ? (
                    <Box
                        sx={{
                            position: 'fixed',
                            top: `${headerHeight}px`,
                            left: 0,
                            height: `calc(100dvh - ${headerHeight}px)`,
                            width: SIDEBAR_WIDTH,
                            borderRight: 1,
                            borderColor: 'divider',
                            backgroundColor: 'background.paper',
                            zIndex: 5,
                        }}
                    >
                        <Sidebar headerHeight={headerHeight} hideFooter={isFocusMode || isPresentationMode} />
                    </Box>
                ) : null}

                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: 0,
                        ml: showSidebar ? `${SIDEBAR_WIDTH}px` : 0,
                        px: {
                            xs: isZenMode ? 1.25 : 2,
                            md: isZenMode ? 2.2 : isPresentationMode ? 3.6 : 3,
                        },
                        py: 2,
                    }}
                >
                    <Box
                        component="main"
                        data-scroller="content"
                        sx={{
                            '--docs-font-scale': fontScale,
                            '--docs-line-height': lineHeight,
                            '--docs-code-padding-y': codeBlockPaddingY,
                            '--docs-code-padding-x': codeBlockPaddingX,
                            flex: 1,
                            minHeight: 0,
                            overflow: 'auto',
                            pr: { xs: 0, md: 1 },
                            mb: 1.5,
                        }}
                    >
                        <Box
                            sx={{
                                mx: isDocsPage ? 0 : 'auto',
                                width: '100%',
                                maxWidth: isDocsPage ? docsMaxWidth : 980,
                            }}
                        >
                            <Outlet />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default function Layout() {
    return (
        <ActiveSectionProvider>
            <LayoutInner />
        </ActiveSectionProvider>
    );
}
