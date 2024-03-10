import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';

type TitleProps = {
    title: string;
    removeOnPrint?: boolean;
    children?: React.ReactNode;
};

export default function Title({ title, children, removeOnPrint }: TitleProps) {
    return (
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} className={removeOnPrint ? 'remove-on-print' : undefined}>
            <Typography variant="h4">{title}</Typography>

            {children}
        </Stack>
    );
}
