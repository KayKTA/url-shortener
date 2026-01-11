import {
    Box,
    Typography,
    TextField,
    Button,
    alpha,
    IconButton
} from '@mui/material';
import type { UrlResponse } from '../types/shortener';
import { useState } from 'react';
import { Check, Close, ContentCopy } from '@mui/icons-material';

interface UrlShortenerResultProps {
    result: UrlResponse;
    onClose: () => void;
}

export const UrlShortenerResult = ({
    result,
    onClose,
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
        <Box
            sx={{
                p: 3,
                borderRadius: 2,
                bgcolor: (theme) => alpha(theme.palette.secondary.contrastText, 0.05),
                border: '1px solid',
                borderColor: (theme) => alpha(theme.palette.secondary.contrastText, 0.1),
                position: 'relative',
            }}
        >
             {/* Close button */}
            <IconButton
                onClick={onClose}
                size="small"
                sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    color: 'red',
                    '&:hover': {
                        color: 'secondary.contrastText',
                    },
                }}
            >
                <Close fontSize="small" />
            </IconButton>
            <Typography
                variant="caption"
                sx={{
                    color: 'text.disabled',
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    mb: 1,
                    display: 'block',
                }}
            >
                Your Short URL
            </Typography>

            <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                    fullWidth
                    value={result.shortUrl}
                    size="small"
                    InputProps={{
                        readOnly: true,
                        sx: {
                            bgcolor: (theme) => alpha(theme.palette.secondary.contrastText, 0.08),
                            color: 'primary.main',
                            fontWeight: 500,
                            '& fieldset': { borderColor: 'transparent' },
                        },
                    }}
                />
                <Button
                    variant="contained"
                    onClick={handleCopy}
                    disabled={copied}
                    color={copied ? 'success' : 'primary'}
                    sx={{
                        minWidth: 44,
                        width: 44,
                        height: 40,
                        p: 0,
                    }}
                >
                    {copied ? <Check fontSize="small" /> : <ContentCopy fontSize="small" />}
                </Button>
            </Box>
        </Box>
    );
};
