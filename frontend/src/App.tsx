import { Container, Box } from '@mui/material';
import { UrlShortenerForm } from './components/UrlShortenerForm';
// import { UrlShortenerResult } from './components/UrlShortenerResult';
import { useUrlShortener } from './hooks/useUrlShortener';
import { UrlHistory } from './components/UrlHistory';
import { useUrlHistory } from './hooks/useUrlHistory';
import { useEffect } from 'react';

function App() {
    const { result, loading, error, shorten } = useUrlShortener();
    const { history, addUrlToHistory, removeUrlFromHistory } = useUrlHistory();

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
                    // border: "1px solid #e0e0e0",
                }}
            >
                <UrlShortenerForm
                    onSubmit={shorten}
                    loading={loading}
                    error={error}
                    result={result}
                />

                {/* {result && <UrlShortenerResult result={result} />} */}
                {/* Moved UrlShortenerResult display inside the form area for better UX */}

                <UrlHistory history={history} removeUrl={removeUrlFromHistory} />
            </Box>
        </Container>
    );
}

export default App;
