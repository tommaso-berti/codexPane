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

const accentVariants = {
    blue: {
        light: { primary: '#2563EB', primaryHover: '#1D4ED8', primarySoft: '#DBEAFE', accent: '#38BDF8' },
        dark: { primary: '#60A5FA', primaryHover: '#3B82F6', primarySoft: '#1E3A5F', accent: '#38BDF8' },
    },
    teal: {
        light: { primary: '#0F766E', primaryHover: '#0E5F59', primarySoft: '#CCFBF1', accent: '#14B8A6' },
        dark: { primary: '#2DD4BF', primaryHover: '#14B8A6', primarySoft: '#134E4A', accent: '#5EEAD4' },
    },
    indigo: {
        light: { primary: '#4F46E5', primaryHover: '#4338CA', primarySoft: '#E0E7FF', accent: '#6366F1' },
        dark: { primary: '#818CF8', primaryHover: '#6366F1', primarySoft: '#312E81', accent: '#A5B4FC' },
    },
    slate: {
        light: { primary: '#334155', primaryHover: '#1F2937', primarySoft: '#E2E8F0', accent: '#64748B' },
        dark: { primary: '#94A3B8', primaryHover: '#CBD5E1', primarySoft: '#1E293B', accent: '#CBD5E1' },
    },
};

export const makeTheme = (mode, accentPalette = 'blue') => {
    const base = mode === 'dark' ? tokens.dark : tokens.light;
    const variant = accentVariants[accentPalette]?.[mode] || accentVariants.blue[mode];
    const t = {
        ...base,
        primary: variant.primary,
        primaryHover: variant.primaryHover,
        primarySoft: variant.primarySoft,
        accent: variant.accent,
    };
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
                        '--link-color': t.primary,
                        '--callout-code-bg': mode === 'dark' ? '#334155' : '#1e293b',
                        '--callout-code-fg': '#ffffff',
                        '--callout-code-border': mode === 'dark' ? '#94a3b8' : '#475569',
                        '--callout-muted-fg': mode === 'dark' ? '#e2e8f0' : '#334155',
                        '--blockquote-bg': mode === 'dark' ? '#1f2f47' : '#dbeafe',
                        '--blockquote-fg': mode === 'dark' ? '#e2e8f0' : '#334155',
                        '--blockquote-border': mode === 'dark' ? '#60a5fa' : '#93c5fd',
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
