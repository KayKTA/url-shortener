import {
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
    alpha,
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
            <Box
                sx={{
                    p: 8,
                    textAlign: 'center',
                    border: '1px solid',
                    borderColor: 'divider',
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}
            >
                <Typography variant="h6" color="text.secondary" fontWeight={500}>
                    No URLs yet
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Start by shortening your first URL
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                overflow: 'hidden',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Header */}
            <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography variant="h6" fontWeight={600}>
                    Recent URLs
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {history.length} {history.length === 1 ? 'link' : 'links'}
                </Typography>
            </Box>

            {/* Table */}
            <TableContainer sx={{ flex: 1, px: 4 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={{
                                    fontWeight: 600,
                                    color: 'text.secondary',
                                    bgcolor: (theme) => alpha(theme.palette.text.primary, 0.02),
                                }}
                            >
                                Code
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontWeight: 600,
                                    color: 'text.secondary',
                                    bgcolor: (theme) => alpha(theme.palette.text.primary, 0.02),
                                }}
                            >
                                Original URL
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontWeight: 600,
                                    color: 'text.secondary',
                                    bgcolor: (theme) => alpha(theme.palette.text.primary, 0.02),
                                }}
                            >
                                Created
                            </TableCell>
                            <TableCell
                                align="right"
                                sx={{
                                    fontWeight: 600,
                                    color: 'text.secondary',
                                    bgcolor: (theme) => alpha(theme.palette.text.primary, 0.02),
                                }}
                            >
                                Actions
                            </TableCell>
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
                                    <Typography variant="body2" color="text.secondary">
                                        {new Date(url.createdAt).toLocaleDateString()}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Box
                                        sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}
                                    >
                                        <IconButton
                                            size="small"
                                            onClick={() => handleCopy(url.shortUrl, url.code)}
                                            color={copiedCode === url.code ? 'success' : 'default'}
                                        >
                                            <CopyIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            href={url.shortUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <OpenIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            color="error"
                                            onClick={() => removeUrl(url.code)}
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
        </Box>
    );
};
