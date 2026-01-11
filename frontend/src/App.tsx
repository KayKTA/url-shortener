import { Container, Box } from '@mui/material';
import { UrlShortenerForm } from './components/UrlShortenerForm';
import { UrlShortenerResult } from './components/UrlShortenerResult';
import { useUrlShortener } from './hooks/useUrlShortener';
import { UrlHistory } from './components/UrlHistory';
import { useUrlHistory } from './hooks/useUrlHistory';
import { useEffect } from 'react';

function App() {
    const { result, loading, error, shorten } = useUrlShortener();
    const { history, addUrlToHistory } = useUrlHistory();

    useEffect(() => {
        if (result) {
            addUrlToHistory(result);
        }
    }, [result]);

    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    minHeight: '100vh',
                    // display: 'flex',
                    // flexDirection: 'column',
                    // justifyContent: 'center',
                    py: 4,
                    // my: 4,
                    border: "1px solid #e0e0e0",
                }}
            >
                <UrlShortenerForm
                    onSubmit={shorten}
                    loading={loading}
                    error={error}
                />

                {result && <UrlShortenerResult result={result} />}

                <UrlHistory history={history} />
            </Box>
        </Container>
    );
}

export default App;
