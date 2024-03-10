import Box from '@mui/material/Box';
import { ReactNode, useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import { bgBlur } from 'src/theme/css';

import { RouterLink } from 'src/routes/components';

import SvgColor from 'src/components/svg-color';
import { bottomNavConfig } from './config-navigation';

// ----------------------------------------------------------------

function IconContainer({ children }: { children: ReactNode }) {
    return (
        <Box component="span" sx={{ width: 36, height: 36 }}>
            {children}
        </Box>
    );
}

type BottomNavigationBarType = {
    toggleNav: () => void;
};

export default function BottomNavigationBar({ toggleNav }: BottomNavigationBarType) {
    const theme = useTheme();
    const [value, setValue] = useState(0);

    return (
        <Box className="remove-on-print" sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
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
                                minWidth: '60px',
                            }}
                            key={item.title}
                            label={item.title}
                            icon={<IconContainer>{item.icon}</IconContainer>}
                            component={RouterLink}
                            to={item.path}
                        />
                    ))}
                    <BottomNavigationAction
                        sx={{
                            textTransform: 'capitalize',
                        }}
                        label="Menu"
                        icon={
                            <IconContainer>
                                <SvgColor
                                    src="/assets/icons/ic_menu.svg"
                                    sx={{ width: 1, height: 1 }}
                                />
                            </IconContainer>
                        }
                        onClick={toggleNav}
                    />
                </BottomNavigation>
            </Paper>
        </Box>
    );
}

BottomNavigationBar.propTypes = {};
