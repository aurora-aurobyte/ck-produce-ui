import PropTypes from 'prop-types';
import React, { memo, forwardRef } from 'react';

import Box from '@mui/material/Box';

import { StyledScrollbar, StyledRootScrollbar } from './styles';

// ----------------------------------------------------------------------

type prop = {
    children: React.ReactNode;
    sx: object;
};

const Scrollbar = forwardRef(({ children, sx, ...other }: prop, ref) => {
    const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;

    const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

    if (mobile) {
        return (
            <Box ref={ref} sx={{ overflow: 'auto', ...sx }} {...other}>
                {children}
            </Box>
        );
    }

    return (
        <StyledRootScrollbar>
            <StyledScrollbar
                scrollableNodeProps={{
                    ref,
                }}
                clickOnTrack={false}
                sx={sx}
                {...other}
            >
                {children}
            </StyledScrollbar>
        </StyledRootScrollbar>
    );
});

Scrollbar.propTypes = {
    // @ts-ignore
    children: PropTypes.node,
    // @ts-ignore
    sx: PropTypes.object,
};

export default memo(Scrollbar);
