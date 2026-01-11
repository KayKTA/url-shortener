import { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Paper,
    CircularProgress,
} from '@mui/material';
import { Link as LinkIcon } from '@mui/icons-material';
import type { UrlResponse } from '../types/shortener';
import { UrlShortenerResult } from './UrlShortenerResult';

interface UrlShortenerFormProps {
    onSubmit: (url: string) => void;
    loading: boolean;
    error: string | null;
    result: UrlResponse | null;
}

export const UrlShortenerForm = ({
    onSubmit,
    loading,
    error,
    result,
}: UrlShortenerFormProps) => {
    const [url, setUrl] = useState('');
    const [validationError, setValidationError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if(!url.trim()) {
            setValidationError('Please enter a URL.');
            return;
        }

        if(!url.startsWith('http://') && !url.startsWith('https://')) {
            setValidationError('URL must start with http:// or https://');
            return;
        }
        setValidationError('');
        onSubmit(url);
    };

    return (
        <Paper elevation={3} sx={{ p: 4, mx: 'auto' }}>
            <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                    fullWidth
                    label="Enter your long URL"
                    placeholder="https://example.com/very-very-long-url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    error={!!validationError || !!error}
                    helperText={validationError || error}
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
            {result && (
                <UrlShortenerResult result={result} />
            )}
        </Paper>
    );
};
