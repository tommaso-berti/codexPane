import { createTheme } from '@mui/material/styles';

export const makeTheme = (mode) =>
    createTheme({
        palette: { mode },
        typography: { fontFamily: 'var(--font-family)' },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: { fontFamily: 'var(--font-family)' },
                    'ul, ol': { listStylePosition: 'outside', paddingLeft: '1.5rem', marginBlock: '1em' },
                    ul: { listStyleType: 'disc' },
                    ol: { listStyleType: 'decimal' },
                    li: { display: 'list-item' },
                },
            },
        },
    });

export default makeTheme;