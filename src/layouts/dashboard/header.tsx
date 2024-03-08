import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import { useResponsive } from 'src/hooks/use-responsive';

import { bgBlur } from 'src/theme/css';

import Iconify from 'src/components/iconify';

import { useMemo } from 'react';
import { useAppSelector } from 'src/store/hooks';
import { matchPath, useLocation } from 'react-router-dom';
// import Searchbar from './common/searchbar';
import { useRouter } from 'src/routes/hooks';
import { NAV, HEADER } from './config-layout';

import navConfig from './config-navigation';

// ----------------------------------------------------------------------

export default function Header() {
    const theme = useTheme();
    const location = useLocation();
    const router = useRouter();

    const lgUp = useResponsive('up', 'lg', null);

    const { title, backUrl } = useAppSelector((state) => state.config);

    const current = useMemo(
        () => navConfig.find((item: any) => matchPath({ path: item.path }, location.pathname)),
        [location]
    );

    const handleBackClick = () => {
        if (backUrl) {
            return router.push(backUrl);
        }
        return router.back();
    };

    const renderContent = (
        <>
            {!lgUp && (
                <IconButton onClick={handleBackClick} sx={{ mr: 1 }}>
                    <Iconify icon="eva:arrow-back-outline" />
                </IconButton>
            )}

            {/* <Searchbar /> */}
            <Typography
                variant="h6"
                component="h2"
                sx={{
                    textTransform: 'capitalize',
                    color: theme.palette.text.secondary,
                }}
            >
                {title || current?.title}
            </Typography>

            <Box sx={{ flexGrow: 1 }} />

            <Stack direction="row" alignItems="center" spacing={1}>
                {/* <LanguagePopover /> */}
                {/* <NotificationsPopover />
                <AccountPopover /> */}
            </Stack>
        </>
    );

    return (
        <AppBar
            // @ts-ignore
            sx={{
                boxShadow: 'none',
                height: HEADER.H_MOBILE,
                zIndex: theme.zIndex.appBar + 1,
                ...bgBlur({
                    color: theme.palette.background.default,
                }),
                transition: theme.transitions.create(['height'], {
                    duration: theme.transitions.duration.shorter,
                }),
                ...(lgUp && {
                    width: `calc(100% - ${NAV.WIDTH + 1}px)`,
                    height: HEADER.H_DESKTOP,
                }),
            }}
        >
            <Toolbar
                sx={{
                    height: 1,
                    px: { lg: 5 },
                }}
            >
                {renderContent}
            </Toolbar>
        </AppBar>
    );
}
