import { ChangeEvent, MouseEvent, useState } from 'react';
import PropTypes from 'prop-types';

import Popover from '@mui/material/Popover';
import MuiTableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';

import { TableColumn } from './tableColumn';

// ----------------------------------------------------------------------

type TableRowProps<T> = {
    row: T;
    handleClick: (event: ChangeEvent<HTMLInputElement>) => any;
    selected: boolean;
    columns: TableColumn[];
};

export default function TableRow<T>({ row, selected, handleClick, columns }: TableRowProps<T>) {
    const [open, setOpen] = useState<HTMLButtonElement | null>(null);

    const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
        setOpen(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };

    return (
        <>
            <MuiTableRow hover tabIndex={-1} role="checkbox" selected={selected}>
                <TableCell padding="checkbox">
                    <Checkbox disableRipple checked={selected} onChange={handleClick} />
                </TableCell>

                {columns.map((column: TableColumn, index: number) => (
                    <TableCell key={index}>{row[column.id as keyof T] as string}</TableCell>
                ))}

                <TableCell align="right">
                    <IconButton onClick={handleOpenMenu}>
                        <Iconify icon="eva:more-vertical-fill" />
                    </IconButton>
                </TableCell>
            </MuiTableRow>

            <Popover
                open={!!open}
                anchorEl={open}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: { width: 140 },
                }}
            >
                <MenuItem onClick={handleCloseMenu}>
                    <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
                    Edit
                </MenuItem>

                <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
                    <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
                    Delete
                </MenuItem>
            </Popover>
        </>
    );
}

TableRow.propTypes = {
    row: PropTypes.any,
    handleClick: PropTypes.func,
    selected: PropTypes.any,
    columns: PropTypes.array,
};
