import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: 'var(--font-family)',
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    fontFamily: 'var(--font-family)',
                },
            },
        },
    },
});

export default theme;