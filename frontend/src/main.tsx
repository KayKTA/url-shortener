import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import App from './App';

const theme = createTheme({
    palette: {
        primary: {
            main: '#007AFF',
            light: '#4DA2FF',
            dark: '#0051D5',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#1D1D1F',
            light: '#2C2C2E',
            dark: '#000000',
            contrastText: '#FFFFFF',
        },
        background: {
            default: '#F5F5F7',
            paper: '#FFFFFF',
        },
        text: {
            primary: '#1D1D1F',
            secondary: '#86868B',
            disabled: '#C7C7CC',
        },
        divider: '#E5E5EA',
        success: {
            main: '#34C759',
        },
        warning: {
            main: '#FF9500',
        },
        error: {
            main: '#FF3B30',
        },
        info: {
            main: '#5AC8FA',
        },
    },
    typography: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        h5: {
            fontWeight: 600,
        },
        h6: {
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 500,
                },
            },
        },
    },
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </StrictMode>
);
