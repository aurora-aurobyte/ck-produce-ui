import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Icon, IconifyIcon } from '@iconify/react';

import Box from '@mui/material/Box';

// ----------------------------------------------------------------------

type prop = {
    icon: string | IconifyIcon;
    width?: number;
    sx?: object;
};

const Iconify = forwardRef(({ icon, width = 20, sx, ...other }: prop, ref) => (
    <Box
        ref={ref}
        component={Icon}
        className="component-iconify"
        icon={icon}
        sx={{ width, height: width, ...sx }}
        {...other}
    />
));

Iconify.propTypes = {
    // @ts-ignore
    icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    sx: PropTypes.object,
    width: PropTypes.number,
};

export default Iconify;
