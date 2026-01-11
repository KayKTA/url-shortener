import { Box, Grid } from '@mui/material';
import { UrlShortenerForm } from './components/UrlShortenerForm';
import { useUrlShortener } from './hooks/useUrlShortener';
import { UrlHistory } from './components/UrlHistory';
import { useUrlHistory } from './hooks/useUrlHistory';
import { useEffect } from 'react';

function App() {
    const { result, loading, error, shorten, reset } = useUrlShortener();
    const { history, addUrlToHistory, removeUrlFromHistory } = useUrlHistory();

    useEffect(() => {
        if (result) {
            addUrlToHistory(result);
        }
    }, [result]);

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
            <Grid container sx={{ flex: 1 }}>
                {/* Form Section - Left (Dark) */}
                <Grid
                    size={{ xs:12, md:5 }}
                    sx={{
                        bgcolor: 'secondary.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: { xs: 3, sm: 4, md: 6 },
                    }}
                >
                    <Box sx={{ width: '100%', maxWidth: 480 }}>
                        <UrlShortenerForm
                            onSubmit={shorten}
                            loading={loading}
                            error={error}
                            result={result}
                            onClose={reset}
                        />
                    </Box>
                </Grid>

                {/* History Section - Right (Light) */}
                <Grid
                    size={{ xs:12, md:7 }}
                    sx={{
                        bgcolor: 'background.default',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'auto',
                    }}
                >
                    <Box
                        sx={{
                            flex: 1,
                            // p: { xs: 3, sm: 4, md: 6 },
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <UrlHistory history={history} removeUrl={removeUrlFromHistory} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default App;
