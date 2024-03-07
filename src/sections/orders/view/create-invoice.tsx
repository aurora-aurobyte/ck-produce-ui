import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import { Order, OrderItem, updateOrder } from 'src/store/features/orderSlice';
import { useAppDispatch } from 'src/store/hooks';
import { useRouter } from 'src/routes/hooks';
import { addInvoice } from 'src/store/features/invoiceSlice';
import invoiceService from 'src/http/services/invoiceService';

const Transition = React.forwardRef(
    (
        props: TransitionProps & {
            children: React.ReactElement<any, any>;
        },
        ref: React.Ref<unknown>
    ) => <Slide direction="up" ref={ref} {...props} />
);

// ----------------------------------------------------------------

interface EnhancedTableProps {
    numSelected: number;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, numSelected, rowCount } = props;

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Quantity</TableCell>
            </TableRow>
        </TableHead>
    );
}

// ----------------------------------------------------------------

type CreateInvoiceProps = {
    open: boolean;
    handleClose: () => void;
    order: Order;
};

export default function CreateInvoice({ open, handleClose, order }: CreateInvoiceProps) {
    const [selected, setSelected] = useState<readonly number[]>([]);
    const [loading, setLoading] = useState(false);

    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = order.orderItems.map((_, id) => id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (_: React.MouseEvent<unknown>, id: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };

    const handleCreateClick = async () => {
        setLoading(true);
        // handleClose();
        const createdInvoice = await invoiceService.createOrderInvoice({
            orderId: order._id,
            orderItemIds: order.orderItems.map((orderItem) => orderItem._id),
        });
        dispatch(addInvoice(createdInvoice));

        const items: OrderItem[] = order.orderItems.map((orderItem: OrderItem, index) => ({
            ...orderItem,
            delivered: selected.includes(index),
        }));

        dispatch(
            updateOrder({
                ...order,
                orderItems: items,
            })
        );

        router.push(`/invoices/edit/${createdInvoice._id}`);
    };

    useEffect(() => {
        const newSelected = order.orderItems.map((_, id) => id);
        setSelected(newSelected);
    }, [order]);

    const isSelected = (id: number) => selected.indexOf(id) !== -1;

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>Select Items</DialogTitle>
            <DialogContent>
                <TableContainer>
                    <Table aria-labelledby="tableTitle" size="medium">
                        <EnhancedTableHead
                            numSelected={selected.length}
                            onSelectAllClick={handleSelectAllClick}
                            rowCount={order.orderItems.length}
                        />
                        <TableBody>
                            {order.orderItems.map((row, index) => {
                                const isItemSelected = isSelected(index);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, index)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={index}
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                        >
                                            {row.product?.name}
                                        </TableCell>
                                        <TableCell align="right">{row.quantity}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={() => handleCreateClick()} disabled={loading} key={`${loading}`}>
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
}
