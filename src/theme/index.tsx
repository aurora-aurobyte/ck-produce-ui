import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

import { palette } from './palette';
import { shadows } from './shadows';
import { overrides } from './overrides';
import { typography } from './typography';
import { customShadows } from './custom-shadows';

// ----------------------------------------------------------------------

type prop = {
    children: React.ReactNode;
};

export default function ThemeProvider({ children }: prop) {
    const memoizedValue = useMemo(
        () => ({
            palette: palette(),
            typography,
            shadows: shadows(),
            customShadows: customShadows(),
            shape: { borderRadius: 8 },
        }),
        []
    );

    // @ts-ignore
    const theme: any = createTheme(memoizedValue);

    theme.components = overrides(theme);

    return (
        <MUIThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </MUIThemeProvider>
    );
}

ThemeProvider.propTypes = {
    children: PropTypes.node,
};
