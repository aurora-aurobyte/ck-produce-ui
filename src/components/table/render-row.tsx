import { useState, useMemo, ReactNode } from 'react';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';

import Iconify from 'src/components/iconify';

import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

type RenderRowProps<T> = {
    row: T;
    editPage?: (row: T) => string | undefined;
    onRemoveClick?: (row: T) => any;
    renderRow: (row: T) => ReactNode;
};

export default function RenderRow<T>({
    row,
    editPage,
    onRemoveClick,
    renderRow,
}: RenderRowProps<T>) {
    const [open, setOpen] = useState<boolean>(false);
    const editPageUrl = useMemo(() => (editPage ? editPage(row) : '#'), [editPage, row]);

    const handleOpenMenu = () => {
        setOpen(true);
    };

    const handleCloseMenu = () => {
        setOpen(false);
    };

    const handleRemoveClick = () => {
        if (onRemoveClick) onRemoveClick(row);
        handleCloseMenu();
    };

    return (
        <>
            <Card onClick={handleOpenMenu}>
                <CardContent sx={{ '&:last-child': { pb: 2 } }}>{renderRow(row)}</CardContent>
            </Card>
            <Dialog open={!!open} onClose={handleCloseMenu}>
                <Box>
                    {editPage && (
                        <MenuItem onClick={handleCloseMenu} component={RouterLink} to={editPageUrl}>
                            <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
                            Edit
                        </MenuItem>
                    )}

                    {onRemoveClick && (
                        <MenuItem onClick={handleRemoveClick} sx={{ color: 'error.main' }}>
                            <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
                            Delete
                        </MenuItem>
                    )}
                </Box>
            </Dialog>
        </>
    );
}

RenderRow.propTypes = {
    row: PropTypes.any,
    editPage: PropTypes.func,
    onRemoveClick: PropTypes.func,
    renderRow: PropTypes.func,
};
