import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';

type TitleProps = {
    title: string;
    children?: React.ReactNode;
};

export default function Title({ title, children }: TitleProps) {
    return (
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4">{title}</Typography>

            {children}
        </Stack>
    );
}
