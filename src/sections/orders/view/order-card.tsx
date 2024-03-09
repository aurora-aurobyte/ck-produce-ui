import { useMemo } from 'react';
import { Order, OrderItem } from 'src/store/features/orderSlice';
import { useSearchParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Loader from 'src/components/loader/loader';
import Label from 'src/components/label';
import { fDate } from 'src/utils/format-time';
import CreateInvoice from './create-invoice';

// ----------------------------------------------------------------

type OrderCardType = {
    order: Order;
    loading: boolean;
};

export default function OrderCard({ order, loading }: OrderCardType) {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleCreateInvoiceClick = () => {
        setSearchParams({ invoice: '1' });
    };

    const handleInvoiceClose = () => {
        setSearchParams({ invoice: '0' });
    };

    const handlePrintClick = () => {
        window.print();
    };

    const invoiceOpened = useMemo(() => searchParams.get('invoice') === '1', [searchParams]);

    if (loading) return <Loader />;

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={6} md={6}>
                    <Typography variant="subtitle1">
                        <Typography component="span" variant="body1">
                            Date
                        </Typography>
                        &nbsp;
                        {fDate(order.date, 'yyyy-MM-dd')}
                    </Typography>
                </Grid>
                <Grid item xs={6} md={6}>
                    <Typography variant="subtitle1">
                        <Typography component="span" variant="body1">
                            Customer
                        </Typography>
                        &nbsp;
                        {order.customer?.name}
                    </Typography>
                </Grid>
                <Grid item xs={6} md={6}>
                    <Typography variant="subtitle1">
                        <Typography component="span" variant="body1">
                            Business Name
                        </Typography>
                        &nbsp;
                        {order.customer?.businessName}
                    </Typography>
                </Grid>
                <Grid item xs={6} md={6}>
                    <Typography variant="subtitle1">
                        <Typography component="span" variant="body1">
                            Address
                        </Typography>
                        &nbsp;
                        {order.customer?.address}
                    </Typography>
                </Grid>
            </Grid>
            <TableContainer sx={{ mt: 2 }}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ pl: 0 }}>
                                <Typography variant="subtitle1">Product Name</Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle1">Qty</Typography>
                            </TableCell>
                            <TableCell sx={{ px: 0 }}>
                                <Typography variant="subtitle1">Status</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {order.orderItems.map((orderItem: OrderItem) => (
                            <TableRow key={orderItem._id} hover>
                                <TableCell sx={{ pl: 0 }}>
                                    <Typography variant="body1">
                                        {orderItem.product?.name}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="body1">{orderItem.quantity}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Label color={orderItem.delivered ? 'success' : 'error'}>
                                        {orderItem.delivered ? 'delivered' : 'not delivered'}
                                    </Label>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button
                    variant="contained"
                    color="inherit"
                    type="button"
                    onClick={handleCreateInvoiceClick}
                >
                    Create Invoice
                </Button>
                <Button
                    variant="contained"
                    color="inherit"
                    type="button"
                    onClick={handlePrintClick}
                >
                    Print
                </Button>
            </Stack>
            <CreateInvoice open={invoiceOpened} handleClose={handleInvoiceClose} order={order} />
        </Box>
    );
}
