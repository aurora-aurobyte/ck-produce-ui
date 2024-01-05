import Box from '@mui/material/Box';
import { useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import { bgBlur } from 'src/theme/css';

import { RouterLink } from 'src/routes/components';

// import RestoreIcon from '@mui/icons-material/Restore';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import LocationOnIcon from '@mui/icons-material/LocationOn';

import { bottomNavConfig } from './config-navigation';

export default function BottomNavigationBar() {
    const theme = useTheme();
    const [value, setValue] = useState(0);

    return (
        <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
            <Paper
                elevation={3}
                // @ts-ignore
                sx={{
                    pt: 2,
                    ...bgBlur({
                        color: theme.palette.background.default,
                    }),
                    transition: theme.transitions.create(['height'], {
                        duration: theme.transitions.duration.shorter,
                    }),
                }}
            >
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(_: any, newValue: number) => {
                        setValue(newValue);
                    }}
                    sx={{
                        bgcolor: 'transparent',
                    }}
                >
                    {bottomNavConfig.map((item) => (
                        <BottomNavigationAction
                            sx={{
                                textTransform: 'capitalize',
                            }}
                            key={item.title}
                            label={item.title}
                            icon={item.icon}
                            component={RouterLink}
                            to={item.path}
                        />
                    ))}
                </BottomNavigation>
            </Paper>
        </Box>
    );
}

BottomNavigationBar.propTypes = {};
