import {
    Box,
    Paper,
    Typography,
    TextField,
    Alert,
    Button,
} from '@mui/material';
import type { UrlResponse } from '../types/shortener';
import { useState } from 'react';
import { Check, ContentCopy } from '@mui/icons-material';

interface UrlShortenerResultProps {
    result: UrlResponse;
}

export const UrlShortenerResult = ({
    result,
}: UrlShortenerResultProps) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(result.shortUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);

        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    return (
        <Paper
            elevation={3}
            sx={{
                p: 4,
                maxWidth: 600,
                mx: 'auto',
                mt: 3,
                position: 'relative',
            }}
        >
            <Alert severity="success" sx={{ mb: 3 }}>
                Your URL has been shortened successfully!
            </Alert>

            <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Short URL
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                        fullWidth
                        value={result.shortUrl}
                        size="small"
                    />
                    <Button
                        variant="contained"
                        onClick={handleCopy}
                        title='Copy URL'
                        disabled={copied}
                    >
                        {copied ? <Check /> : <ContentCopy />}
                    </Button>
                </Box>
            </Box>

            <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Original URL
                </Typography>
                <Typography variant="body2" >
                    {result.originalUrl}
                </Typography>
            </Box>
        </Paper>
    );
};
