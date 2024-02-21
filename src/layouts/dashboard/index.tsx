import PropTypes from 'prop-types';
import { useState, ReactNode } from 'react';

import Box from '@mui/material/Box';

import Nav from './nav';
import Main from './main';
import Header from './header';
import BottomNavigationBar from './bottom-navigation';

// ----------------------------------------------------------------------

type prop = {
    children: ReactNode;
};

export default function DashboardLayout({ children }: prop) {
    const [openNav, setOpenNav] = useState(false);

    return (
        <>
            <Header onOpenNav={() => setOpenNav(true)} />

            <Box
                sx={{
                    minHeight: 1,
                    display: 'flex',
                    flexDirection: { xs: 'column', lg: 'row' },
                }}
            >
                <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

                <Main sx={{ mb: '72px' }}>{children}</Main>
            </Box>
            <BottomNavigationBar toggleNav={() => setOpenNav((open: boolean) => !open)} />
        </>
    );
}

DashboardLayout.propTypes = {
    children: PropTypes.node,
};
