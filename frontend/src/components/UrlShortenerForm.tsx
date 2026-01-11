import { useState } from 'react';
import {
    Box,
    Button,
    CircularProgress,
    Typography,
    alpha,
    InputAdornment,
    OutlinedInput,
    IconButton,
    FormControl,
    FormHelperText,
} from '@mui/material';
import { Close, Link as LinkIcon } from '@mui/icons-material';
import type { UrlResponse } from '../types/shortener';
import { UrlShortenerResult } from './UrlShortenerResult';

interface UrlShortenerFormProps {
    onSubmit: (url: string) => void;
    loading: boolean;
    error: string | null;
    result: UrlResponse | null;
    onClose: () => void;
}

export const UrlShortenerForm = ({
    onSubmit,
    loading,
    error,
    result,
    onClose,
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

    const handleClear = () => {
        setUrl('');
        setValidationError('');
        onClose();
    };

    return (
        <Box>
            {/* Header */}
            <Box sx={{ mb: 5, textAlign: 'center' }}>
                <LinkIcon
                    sx={{ fontSize: 56, color: 'primary.main', mb: 2 }}
                />
                <Typography
                    variant="h5"
                    sx={{ color: 'secondary.contrastText', fontWeight: 600, mb: 1}}
                >
                    URL Shortener
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.disabled',
                    }}
                >
                    Transform your long URLs into short, shareable links
                </Typography>
            </Box>

            {/* Form */}
            <Box component="form" onSubmit={handleSubmit} noValidate>
                <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                    <OutlinedInput
                        fullWidth
                        placeholder="https://example.com/very-long-url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        error={!!validationError || !!error}
                        // helperText={validationError || error}
                        disabled={loading}
                        endAdornment={
                            <InputAdornment position="end">
                                {url && !loading && (
                                    <IconButton
                                        onClick={handleClear}
                                        size="small"
                                        sx={{ textTransform: 'none' }}
                                    >
                                        <Close fontSize="small" color='primary' />
                                    </IconButton>
                                )}
                            </InputAdornment>
                        }
                        sx={{
                            // '& .MuiOutlinedInput-root': {
                            //     bgcolor: (theme) => alpha(theme.palette.secondary.contrastText, 0.05),
                            //     color: 'secondary.contrastText',
                            // },
                                bgcolor: (theme) => alpha(theme.palette.secondary.contrastText, 0.05),
                                color: 'secondary.contrastText',
                        }}
                    />
                    {validationError || error ? (
                        <FormHelperText error>
                            {validationError || error}
                        </FormHelperText>
                    ) : null}
                </FormControl>
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : <LinkIcon />}
                    sx={{ py: 1.5 }}
                >
                    {loading ? 'Shortening in progress' : 'Shorten URL'}
                </Button>
            </Box>

            {/* Result */}
            {result && (
                <Box sx={{ mt: 4 }}>
                    <UrlShortenerResult result={result} onClose={onClose} />
                </Box>
            )}
        </Box>
    );
};
