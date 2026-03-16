import { createTheme } from '@mui/material/styles';

const tokens = {
    light: {
        primary: '#2563EB',
        primaryHover: '#1D4ED8',
        primarySoft: '#DBEAFE',
        accent: '#38BDF8',
        pageBg: '#F8FAFC',
        surface: '#FFFFFF',
        surfaceSoft: '#F1F5F9',
        border: '#E2E8F0',
        textMain: '#0F172A',
        textMuted: '#475569',
        codeBg: '#0F172A',
        codeText: '#E2E8F0',
    },
    dark: {
        primary: '#60A5FA',
        primaryHover: '#3B82F6',
        primarySoft: '#1E3A5F',
        accent: '#38BDF8',
        pageBg: '#0B1220',
        surface: '#111C2E',
        surfaceSoft: '#18263D',
        border: '#23324A',
        textMain: '#E2E8F0',
        textMuted: '#94A3B8',
        codeBg: '#0A0F1A',
        codeText: '#E2E8F0',
    },
};

export const makeTheme = (mode) => {
    const t = mode === 'dark' ? tokens.dark : tokens.light;
    return createTheme({
        palette: {
            mode,
            primary: { main: t.primary, dark: t.primaryHover, light: t.primarySoft },
            secondary: { main: t.accent },
            background: {
                default: t.pageBg,
                paper: t.surface,
            },
            text: {
                primary: t.textMain,
                secondary: t.textMuted,
            },
            divider: t.border,
            action: {
                hover: t.surfaceSoft,
                selected: t.primarySoft,
            },
            code: {
                bg: t.codeBg,
                text: t.codeText,
            },
        },
        shape: {
            borderRadius: 8,
        },
        typography: {
            fontFamily: 'var(--font-family)',
            h1: { fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em' },
            h2: { fontWeight: 700, lineHeight: 1.25, letterSpacing: '-0.015em' },
            h3: { fontWeight: 650, lineHeight: 1.3 },
            body1: { lineHeight: 1.75 },
            body2: { lineHeight: 1.65 },
        },
        shadows: [
            'none',
            '0 1px 2px rgba(15,23,42,0.06)',
            '0 2px 6px rgba(15,23,42,0.08)',
            '0 8px 20px rgba(15,23,42,0.08)',
            '0 12px 28px rgba(15,23,42,0.1)',
            ...Array(20).fill('0 12px 28px rgba(15,23,42,0.1)'),
        ],
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    ':root': {
                        '--code-bg': t.codeBg,
                        '--code-fg': t.codeText,
                        '--surface-soft': t.surfaceSoft,
                        '--focus-ring': t.accent,
                    },
                    body: {
                        fontFamily: 'var(--font-family)',
                        backgroundColor: t.pageBg,
                        color: t.textMain,
                    },
                    'ul, ol': { listStylePosition: 'outside', paddingLeft: '1.5rem', marginBlock: '1em' },
                    ul: { listStyleType: 'disc' },
                    ol: { listStyleType: 'decimal' },
                    li: { display: 'list-item' },
                    '::selection': {
                        backgroundColor: t.primarySoft,
                        color: t.textMain,
                    },
                    '*': {
                        transition: 'background-color 160ms ease, border-color 160ms ease, color 160ms ease, box-shadow 160ms ease',
                    },
                    '*:focus-visible': {
                        outline: `2px solid ${t.accent}`,
                        outlineOffset: '2px',
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        border: `1px solid ${t.border}`,
                        boxShadow: '0 1px 2px rgba(15,23,42,0.06)',
                        backgroundImage: 'none',
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 8,
                        textTransform: 'none',
                        fontWeight: 600,
                    },
                    containedPrimary: {
                        boxShadow: 'none',
                        '&:hover': {
                            boxShadow: '0 6px 18px rgba(37,99,235,0.25)',
                        },
                    },
                },
            },
            MuiTextField: {
                defaultProps: {
                    size: 'small',
                },
            },
            MuiTooltip: {
                styleOverrides: {
                    tooltip: {
                        borderRadius: 8,
                        border: `1px solid ${t.border}`,
                        backgroundColor: t.surface,
                        color: t.textMain,
                    },
                },
            },
            MuiChip: {
                styleOverrides: {
                    root: {
                        borderRadius: 999,
                        backgroundColor: t.surfaceSoft,
                        border: `1px solid ${t.border}`,
                    },
                },
            },
            MuiListItemButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 8,
                        '&.Mui-selected': {
                            backgroundColor: t.primarySoft,
                        },
                    },
                },
            },
        },
    });
};

export default makeTheme;
