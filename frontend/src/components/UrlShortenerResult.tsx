import {
    Box,
    Paper,
    Typography,
    TextField,
    Alert,
} from '@mui/material';
import type { UrlResponse } from '../types/shortener';

interface UrlShortenerResultProps {
    result: UrlResponse;
}

export const UrlShortenerResult = ({
    result,
}: UrlShortenerResultProps) => {

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
