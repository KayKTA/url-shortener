import {
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Chip,
    Box,
} from '@mui/material';
import {
    Delete as DeleteIcon,
    OpenInNew as OpenIcon,
    ContentCopy as CopyIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import type { UrlResponse } from '../types/shortener';

interface UrlHistoryProps {
    history: UrlResponse[];
    removeUrl: (code: string) => void;
}

export const UrlHistory = ({ history, removeUrl }: UrlHistoryProps) => {
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    const handleCopy = async (shortUrl: string, code: string) => {
        try {
            await navigator.clipboard.writeText(shortUrl);
            setCopiedCode(code);
            setTimeout(() => setCopiedCode(null), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    if (history.length === 0) {
        return (
            <Paper sx={{ p: 4, mx: 'auto', textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                    No URL history available.
                </Typography>
            </Paper>
        );
    }
    return (
        <Paper sx={{ mt: 3 }}>
            <Box sx={{ p: 3, pb: 2 }}>
                <Typography variant="h6">
                    Your Recent URLs ({history.length})
                </Typography>
            </Box>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Short URL</TableCell>
                            <TableCell>Original URL</TableCell>
                            <TableCell>Created</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {history.map((url) => (
                            <TableRow
                                key={url.code}
                            >
                                <TableCell>
                                    <Chip
                                        label={url.code}
                                        size="small"
                                        color="primary"
                                    />
                                </TableCell>
                                <TableCell sx={{ maxWidth: 300 }}>
                                    <Typography
                                        variant="body2"
                                        noWrap
                                        sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
                                        title={url.originalUrl}
                                    >
                                        {url.originalUrl}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="caption" color="text.secondary">
                                        {new Date(url.createdAt).toLocaleDateString()}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleCopy(url.shortUrl, url.code)}
                                            color={copiedCode === url.code ? 'success' : 'default'}
                                            title="Copy short URL"
                                        >
                                            <CopyIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            href={url.shortUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title="Open short URL"
                                        >
                                            <OpenIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            color="error"
                                            onClick={() => removeUrl(url.code)}
                                            title="Remove from history"
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};
