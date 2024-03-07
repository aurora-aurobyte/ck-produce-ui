import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

// ----------------------------------------------------------------------

export default function Loader() {
    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
                height: '60vh',
                alignItems: 'center',
            }}
        >
            <CircularProgress />
        </Box>
    );
}
