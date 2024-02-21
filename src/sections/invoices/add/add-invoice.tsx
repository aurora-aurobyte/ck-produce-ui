import { ChangeEvent, useState, FormEvent, useEffect, useMemo } from 'react';
import Container from 'src/components/container/container';
import Title from 'src/components/title';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Iconify from 'src/components/iconify';
import { Invoice, InvoiceItem, addInvoice, updateInvoice } from 'src/store/features/invoiceSlice';
import { Product, fetchProducts } from 'src/store/features/productSlice';
import { Customer, fetchCustomers } from 'src/store/features/customerSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { useRouter } from 'src/routes/hooks';
import { fDate } from 'src/utils/format-time';
import { v4 as uuidv4 } from 'uuid';

const defaultValues: Invoice = {
    orderId: '',
    invoiceId: '',
    customerId: '',
    customerName: '',
    date: new Date().toString(),
    subTotal: 0,
    discount: 0,
    total: 0,
    paid: false,
    invoiceItems: [],
};

const defaultInvoiceItem: InvoiceItem = {
    productId: '',
    productName: '',
    purchasePrice: 0,
    unitPrice: 0,
    tax: 0,
    category: '',
    quantity: 1,
};

// ----------------------------------------------------------------

type AddInvoiceProps = {
    invoiceId?: string;
    edit?: boolean;
};

export default function AddInvoice({ invoiceId, edit }: AddInvoiceProps) {
    const invoices = useAppSelector((state) => state.invoice.invoices);
    const products = useAppSelector((state) => state.product.products);
    const customers = useAppSelector((state) => state.customer.customers);

    const [invoiceValues, setInvoiceValues] = useState<Invoice>(defaultValues);
    const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);
    const [invoiceItemsValues, setInvoiceItemsValues] = useState<InvoiceItem>(defaultInvoiceItem);

    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleInvoiceChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInvoiceValues({ ...invoiceValues, [event.target.name]: event.target.value });
    };

    const handlePaidChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInvoiceValues({ ...invoiceValues, paid: event.target.checked });
    };

    const handleInvoiceItemChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInvoiceItemsValues((_invoiceItemsValues: InvoiceItem) => {
            const { name, value } = event.target;
            const duplicatedInvoiceItems = { ..._invoiceItemsValues, [name]: value };
            if (name === 'productId') {
                const addedProduct = products.find((product) => product.productId === value);
                duplicatedInvoiceItems.unitPrice = addedProduct?.unitPrice || 0;
                duplicatedInvoiceItems.tax = addedProduct?.tax || 0;
            }
            return duplicatedInvoiceItems;
        });
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (edit) {
            dispatch(
                updateInvoice({ ...invoiceValues, invoiceItems, invoiceId: invoiceId as string })
            );
        } else {
            dispatch(addInvoice({ ...invoiceValues, invoiceId: uuidv4(), invoiceItems }));
        }
        router.back();
    };

    const handleRemoveItem = (productId: string) => {
        setInvoiceItems((_invoiceItems: InvoiceItem[]) =>
            _invoiceItems.filter((item: InvoiceItem) => item.productId !== productId)
        );
    };

    const handleAddInvoiceItem = () => {
        if (invoiceItemsValues.productId && invoiceItemsValues.quantity) {
            setInvoiceItems((_invoiceItems: InvoiceItem[]) => [
                ..._invoiceItems,
                {
                    productId: invoiceItemsValues.productId,
                    productName: products.find(
                        (product) => product.productId === invoiceItemsValues.productId
                    )?.name as string,
                    purchasePrice: invoiceItemsValues.purchasePrice,
                    unitPrice: invoiceItemsValues.unitPrice,
                    tax: invoiceItemsValues.tax,
                    category: invoiceItemsValues.category,
                    quantity: invoiceItemsValues.quantity,
                },
            ]);
            setInvoiceItemsValues(defaultInvoiceItem);
        }
    };

    useEffect(() => {
        if (edit && invoiceId && invoices) {
            const invoice = invoices.find(
                (_invoice) => _invoice.invoiceId === invoiceId
            ) as Invoice;
            if (invoice) {
                setInvoiceValues(invoice);
                setInvoiceItems(invoice.invoiceItems);
            }
        }
    }, [edit, invoiceId, invoices]);

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCustomers());
    }, [dispatch]);

    useEffect(() => {
        setInvoiceValues((_invoiceItems) => ({
            ..._invoiceItems,
            total: _invoiceItems.subTotal - _invoiceItems.discount,
        }));
    }, [invoiceValues.discount]);

    useEffect(() => {
        setInvoiceValues((_invoiceValues) => {
            const subTotal = invoiceItems.reduce(
                (acc, item) => acc + item.unitPrice * item.quantity * (1 + item.tax/100),
                0
            );
            return {
                ..._invoiceValues,
                subTotal,
                total: subTotal - _invoiceValues.discount,
            };
        });
    }, [invoiceItems]);

    const filteredProducts = useMemo(
        () =>
            products.filter(
                (product: Product) =>
                    invoiceItems.findIndex(
                        (invoiceItem: InvoiceItem) => product.productId === invoiceItem.productId
                    ) === -1
            ),
        [invoiceItems, products]
    );

    return (
        <Container>
            <Title title={edit ? 'Edit Invoice' : 'Add Invoice'} />
            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={6}>
                        <TextField
                            id="orderId"
                            name="orderId"
                            label="Order ID"
                            variant="standard"
                            fullWidth
                            size="small"
                            InputProps={{
                                readOnly: true,
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            defaultValue={invoiceValues.orderId}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <TextField
                            id="date"
                            name="date"
                            label="Invoice Date"
                            variant="standard"
                            fullWidth
                            size="small"
                            InputProps={{
                                readOnly: true,
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            defaultValue={fDate(invoiceValues.date)}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <TextField
                            id="customerName"
                            name="customerName"
                            label="Customer"
                            variant="standard"
                            select
                            fullWidth
                            size="small"
                            value={invoiceValues.customerName}
                            onChange={handleInvoiceChange}
                        >
                            {customers.map((customer: Customer) => (
                                <MenuItem key={customer.customerId} value={customer.name}>
                                    {customer.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="paid"
                                    checked={invoiceValues.paid}
                                    onChange={handlePaidChange}
                                />
                            }
                            label="Paid"
                        />
                    </Grid>
                </Grid>
                <TableContainer sx={{ mt: 2 }}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ pl: 0 }}>Product Name</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Tax</TableCell>
                                <TableCell align="right">Qty</TableCell>
                                <TableCell align="right">Total</TableCell>
                                <TableCell sx={{ px: 0 }} />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {invoiceItems.map((invoiceItem: InvoiceItem) => (
                                <TableRow key={invoiceItem.productId} hover>
                                    <TableCell sx={{ pl: 0 }}>{invoiceItem.productName}</TableCell>
                                    <TableCell align="right">{invoiceItem.unitPrice}</TableCell>
                                    <TableCell align="right">{invoiceItem.tax}</TableCell>
                                    <TableCell align="right">{invoiceItem.quantity}</TableCell>
                                    <TableCell align="right">
                                        {invoiceItem.unitPrice * invoiceItem.quantity * (1 + invoiceItem.tax/100)}
                                    </TableCell>
                                    <TableCell align="right" sx={{ px: 0 }}>
                                        <IconButton
                                            onClick={() => handleRemoveItem(invoiceItem.productId)}
                                        >
                                            <Iconify icon="eva:trash-2-fill" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow
                                sx={(theme) => ({
                                    backgroundColor: theme.palette.action.hover,
                                })}
                            >
                                <TableCell sx={{ pl: 0 }}>
                                    <TextField
                                        id="productId"
                                        name="productId"
                                        label="Product"
                                        variant="standard"
                                        select
                                        fullWidth
                                        value={invoiceItemsValues.productId}
                                        onChange={handleInvoiceItemChange}
                                    >
                                        {filteredProducts.map((product: Product) => (
                                            <MenuItem
                                                key={product.productId}
                                                value={product.productId}
                                            >
                                                {product.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        id="unitPrice"
                                        name="unitPrice"
                                        label="Price"
                                        variant="standard"
                                        type="number"
                                        fullWidth
                                        value={invoiceItemsValues.unitPrice}
                                        onChange={handleInvoiceItemChange}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        id="tax"
                                        name="tax"
                                        label="Tax"
                                        variant="standard"
                                        type="number"
                                        fullWidth
                                        value={invoiceItemsValues.tax}
                                        onChange={handleInvoiceItemChange}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        id="quantity"
                                        name="quantity"
                                        label="Quantity"
                                        variant="standard"
                                        type="number"
                                        fullWidth
                                        value={invoiceItemsValues.quantity}
                                        onChange={handleInvoiceItemChange}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    {invoiceItemsValues.unitPrice * invoiceItemsValues.quantity * (1 + invoiceItemsValues.tax/100)}
                                </TableCell>
                                <TableCell align="right" sx={{ px: 0 }}>
                                    <IconButton onClick={handleAddInvoiceItem}>
                                        <Iconify icon="eva:plus-circle-outline" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="right" colSpan={3}>
                                    Sub total
                                </TableCell>
                                <TableCell align="right">{invoiceValues.subTotal}</TableCell>
                                <TableCell sx={{ px: 0 }} />
                            </TableRow>
                            <TableRow>
                                <TableCell align="right" colSpan={3}>
                                    Discount
                                </TableCell>
                                <TableCell align="right" colSpan={2} sx={{ pr: 0 }}>
                                    <TextField
                                        id="discount"
                                        name="discount"
                                        label="Discount"
                                        variant="standard"
                                        type="number"
                                        fullWidth
                                        size="small"
                                        value={invoiceValues.discount}
                                        onChange={handleInvoiceChange}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="right" colSpan={3}>
                                    Total
                                </TableCell>
                                <TableCell align="right">{invoiceValues.total}</TableCell>
                                <TableCell sx={{ px: 0 }} />
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    <Button variant="contained" color="inherit" type="submit">
                        Save
                    </Button>
                    <Button variant="contained" color="inherit" type="button">
                        Print
                    </Button>
                </Stack>
            </Box>
        </Container>
    );
}
