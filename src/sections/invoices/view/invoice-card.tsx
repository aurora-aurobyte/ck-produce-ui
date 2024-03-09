import { Invoice, InvoiceItem } from 'src/store/features/invoiceSlice';

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

// ----------------------------------------------------------------

type InvoiceCardType = {
    invoice: Invoice;
    loading: boolean;
};

export default function InvoiceCard({ invoice, loading }: InvoiceCardType) {
    const handlePrintClick = () => {
        window.print();
    };

    if (loading) return <Loader />;

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1">
                        <Typography component="span" variant="body1">
                            Invoice ID
                        </Typography>
                        &nbsp;
                        {invoice._id}
                    </Typography>
                </Grid>
                <Grid item xs={6} md={6}>
                    <Typography variant="subtitle1">
                        <Typography component="span" variant="body1">
                            Date
                        </Typography>
                        &nbsp;
                        {fDate(invoice.date, 'yyyy-MM-dd')}
                    </Typography>
                </Grid>
                <Grid item xs={6} md={6}>
                    <Typography variant="subtitle1">
                        <Typography component="span" variant="body1">
                            Customer
                        </Typography>
                        &nbsp;
                        {invoice.customer?.name}
                    </Typography>
                </Grid>
                <Grid item xs={6} md={6}>
                    <Typography variant="subtitle1">
                        <Typography component="span" variant="body1">
                            Business Name
                        </Typography>
                        &nbsp;
                        {invoice.customer?.businessName}
                    </Typography>
                </Grid>
                <Grid item xs={6} md={6}>
                    <Typography variant="subtitle1">
                        <Typography component="span" variant="body1">
                            Business Name
                        </Typography>
                        &nbsp;
                        {invoice.customer?.businessName}
                    </Typography>
                </Grid>
                <Grid item xs={6} md={6}>
                    <Label color={invoice.paid ? 'success' : 'error'}>
                        {invoice.paid ? 'paid' : 'not paid'}
                    </Label>
                </Grid>
            </Grid>
            <TableContainer sx={{ mt: 2 }}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ pl: 0 }}>
                                <Typography variant="subtitle1">Product Name</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle1">Price</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle1">Tax</Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle1">Qty</Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle1">Amt</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {invoice.invoiceItems.map((invoiceItem: InvoiceItem) => {
                            const amount =
                                invoiceItem.unitPrice *
                                invoiceItem.quantity *
                                (1 + invoiceItem.tax / 100);
                            return (
                                <TableRow key={invoiceItem._id} hover>
                                    <TableCell sx={{ pl: 0 }}>
                                        <Typography variant="body1">
                                            {invoiceItem.product?.name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body1">
                                            {invoiceItem.unitPrice.toFixed(2)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body1">{invoiceItem.tax}</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography variant="body1">
                                            {invoiceItem.quantity}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body1">{amount.toFixed(2)}</Typography>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                        <TableRow>
                            <TableCell align="right" colSpan={4}>
                                <Typography variant="subtitle2">Sub total</Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle2">
                                    {invoice.subTotal.toFixed(2)}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="right" colSpan={4}>
                                <Typography variant="subtitle2">Discount</Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle2">
                                    {invoice.discount.toFixed(2)}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="right" colSpan={4}>
                                <Typography variant="subtitle1">Total</Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle1">
                                    {invoice.total.toFixed(2)}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button
                    variant="contained"
                    color="inherit"
                    type="button"
                    onClick={handlePrintClick}
                >
                    Print
                </Button>
            </Stack>
        </Box>
    );
}
