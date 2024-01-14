import React from 'react';
import MuiContainer from '@mui/material/Container';

type ContainerProps = {
    children: React.ReactNode;
};

function Container({ children }: ContainerProps) {
    return <MuiContainer>{children}</MuiContainer>;
}

export default Container;
