import { Container, Box } from '@mui/material';
import { UrlShortenerForm } from './components/UrlShortenerForm';
import { UrlShortenerResult } from './components/UrlShortenerResult';
import { useUrlShortener } from './hooks/useUrlShortener';

function App() {
    const { result, loading, error, shorten } = useUrlShortener();

    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    py: 4,
                }}
            >
                <UrlShortenerForm
                    onSubmit={shorten}
                    loading={loading}
                    error={error}
                />

                {result && <UrlShortenerResult result={result} />}
            </Box>
        </Container>
    );
}

export default App;
