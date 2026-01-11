import { Paper, Typography } from "@mui/material";
import type { UrlResponse } from "../types/shortener";

interface UrlHistoryProps {
    history: UrlResponse[];
}
export const UrlHistory = ({ history }: UrlHistoryProps) => {

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
        <Paper sx={{ p: 4, mx: 'auto' }}>
            <Typography variant="h6" gutterBottom>
                URL History
            </Typography>

            {/* History list here */}
            {history.length} items in history.
        </Paper>
    );
}
