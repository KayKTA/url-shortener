import { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Paper,
    CircularProgress,
} from '@mui/material';
import { Link as LinkIcon } from '@mui/icons-material';

interface UrlShortenerFormProps {
    onSubmit: (url: string) => void;
    loading: boolean;
    error: string | null;
}

export const UrlShortenerForm = ({
    onSubmit,
    loading,
    error,
}: UrlShortenerFormProps) => {
    const [url, setUrl] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(url);
    };

    return (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
            <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                    fullWidth
                    label="Enter your long URL"
                    placeholder="https://example.com/very-very-long-url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    error={!!error}
                    helperText={error}
                    disabled={loading}
                    sx={{ mb: 3 }}
                />

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : <LinkIcon />}
                >
                    {loading ? 'Shortening in progress' : 'Shorten URL'}
                </Button>
            </Box>
        </Paper>
    );
};
