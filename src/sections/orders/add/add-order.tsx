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

import Iconify from 'src/components/iconify';
import { Product, fetchProducts } from 'src/store/features/productSlice';
import { Customer, fetchCustomers } from 'src/store/features/customerSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { useRouter } from 'src/routes/hooks';
import { fDate } from 'src/utils/format-time';
import { useSearchParams } from 'react-router-dom';

import { Order, OrderItem, addOrder, updateOrder } from 'src/store/features/orderSlice';
import { addInvoice } from 'src/store/features/invoiceSlice';
import { v4 as uuidv4 } from 'uuid';
import CreateInvoice from './create-invoice';

const defaultValues: Order = {
    _id: '',
    customerId: '',
    date: new Date().toString(),
    orderItems: [],
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
};

const defaultOrderItem: OrderItem = {
    productId: '',
    quantity: 1,
    delivered: false,
};

// ----------------------------------------------------------------

type AddOrderProps = {
    orderId?: string;
    edit?: boolean;
};

export default function AddOrder({ orderId, edit }: AddOrderProps) {
    const orders = useAppSelector((state) => state.order.orders);
    const products = useAppSelector((state) => state.product.products);
    const customers = useAppSelector((state) => state.customer.customers);

    const [orderValues, setOrderValues] = useState<Order>(defaultValues);
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
    const [orderItemsValues, setOrderItemsValues] = useState<OrderItem>(defaultOrderItem);

    const [searchParams, setSearchParams] = useSearchParams();

    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleOrderChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === 'customerId') {
            setOrderValues({
                ...orderValues,
                [event.target.name]: event.target.value,
                // customerName:
                //     customers.find((customer) => customer.customerId === event.target.value)
                //         ?.name || '',
            });
        } else {
            setOrderValues({ ...orderValues, [event.target.name]: event.target.value });
        }
    };

    const handleOrderItemChange = (event: ChangeEvent<HTMLInputElement>) => {
        setOrderItemsValues((_orderItemsValues: OrderItem) => {
            const { name, value } = event.target;
            const duplicatedOrderItems = { ..._orderItemsValues, [name]: value };
            // if (name === 'productId') {
            //     duplicatedOrderItems.unitPrice =
            //         products.find((product) => product.productId === value)?.unitPrice || 0;
            // }
            return duplicatedOrderItems;
        });
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (edit) {
            dispatch(updateOrder({ ...orderValues, orderItems, _id: orderId as string }));
        } else {
            dispatch(addOrder({ ...orderValues, orderItems }));
        }
        router.back();
    };

    const handleRemoveItem = (productId: string) => {
        setOrderItems((_orderItems: OrderItem[]) =>
            _orderItems.filter((item: OrderItem) => item.productId !== productId)
        );
    };

    const handleAddOrderItem = () => {
        if (orderItemsValues.productId && orderItemsValues.quantity) {
            setOrderItems((_orderItems: OrderItem[]) => [
                ..._orderItems,
                {
                    productId: orderItemsValues.productId,
                    productName: products.find(
                        (product) => product._id === orderItemsValues.productId
                    )?.name as string,
                    // unitPrice: orderItemsValues.unitPrice,
                    // category: orderItemsValues.category,
                    quantity: orderItemsValues.quantity,
                    delivered: false,
                },
            ]);
            setOrderItemsValues(defaultOrderItem);
        }
    };

    const handleCreateInvoiceClick = () => {
        setSearchParams({ invoice: '1' });
    };

    const handleInvoiceClose = () => {
        setSearchParams({ invoice: '0' });
    };

    const handleCreateClick = (selected: number[]) => {
        handleInvoiceClose();
        const newInvoiceId = uuidv4();
        dispatch(
            addInvoice({
                orderId: orderValues._id,
                customerId: orderValues.customerId,
                customerName: '',
                invoiceId: newInvoiceId,
                paid: false,
                subTotal: 0,
                discount: 0,
                total: 0,
                date: new Date().toString(),
                invoiceItems: orderItems
                    .filter((_, index: number) => selected.includes(index))
                    .map((orderItem) => ({
                        productId: orderItem.productId,
                        productName: orderItem.product?.name || '',
                        purchasePrice: orderItem.product?.purchasePrice ?? 0,
                        unitPrice: orderItem.product?.unitPrice ?? 0,
                        tax:
                            products.find((product) => product._id === orderItem.productId)?.tax ||
                            0,
                        category: '',
                        quantity: orderItem.quantity,
                    })),
            })
        );

        const items = orderItems.map((orderItem, index) => ({
            ...orderItem,
            delivered: selected.includes(index),
        }));

        dispatch(
            updateOrder({
                ...orderValues,
                orderItems: items,
                _id: orderId as string,
            })
        );

        router.push(`/invoices/edit/${newInvoiceId}`);
    };

    useEffect(() => {
        if (edit && orderId && orders) {
            const order = orders.find((_order) => _order._id === orderId) as Order;
            if (order) {
                setOrderValues(order);
                setOrderItems(order.orderItems);
            }
        }
    }, [edit, orderId, orders]);

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCustomers());
    }, [dispatch]);

    // useEffect(() => {
    //     setOrderValues((_orderItems) => ({
    //         ..._orderItems,
    //     }));
    // }, [orderValues.discount]);

    // useEffect(() => {
    //     setOrderValues((_orderValues) => {
    //         const subTotal = orderItems.reduce(
    //             (acc, item) => acc + item.unitPrice * item.quantity,
    //             0
    //         );
    //         return {
    //             ..._orderValues,
    //             subTotal,
    //             total: subTotal - _orderValues.discount,
    //         };
    //     });
    // }, [orderItems]);

    const filteredProducts = useMemo(
        () =>
            products.filter(
                (product: Product) =>
                    orderItems.findIndex(
                        (orderItem: OrderItem) => product._id === orderItem.productId
                    ) === -1
            ),
        [orderItems, products]
    );
    const invoiceOpened = useMemo(() => searchParams.get('invoice') === '1', [searchParams]);

    return (
        <>
            <Container>
                <Title title={edit ? 'Edit Order' : 'Add Order'} />
                <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="date"
                                name="date"
                                label="Order Date"
                                variant="standard"
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                defaultValue={fDate(orderValues.date)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="customerId"
                                name="customerId"
                                label="Customer"
                                variant="standard"
                                select
                                fullWidth
                                value={orderValues.customerId}
                                onChange={handleOrderChange}
                            >
                                {customers.map((customer: Customer) => (
                                    <MenuItem key={customer.customerId} value={customer.customerId}>
                                        {customer.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                    <TableContainer sx={{ mt: 2 }}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ pl: 0 }}>Product Name</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right">Qty</TableCell>
                                    <TableCell align="right">Total</TableCell>
                                    <TableCell sx={{ px: 0 }} />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orderItems.map((orderItem: OrderItem) => (
                                    <TableRow key={orderItem.productId} hover>
                                        <TableCell sx={{ pl: 0 }}>
                                            {orderItem.product?.name}
                                        </TableCell>
                                        <TableCell align="right">
                                            {orderItem.product?.unitPrice ?? 0}
                                        </TableCell>
                                        <TableCell align="right">{orderItem.quantity}</TableCell>
                                        <TableCell align="right">
                                            {(orderItem.product?.unitPrice ?? 0) *
                                                orderItem.quantity}
                                        </TableCell>
                                        <TableCell align="right" sx={{ px: 0 }}>
                                            <IconButton
                                                onClick={() =>
                                                    handleRemoveItem(orderItem.productId)
                                                }
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
                                            value={orderItemsValues.productId}
                                            onChange={handleOrderItemChange}
                                        >
                                            {filteredProducts.map((product: Product) => (
                                                <MenuItem key={product._id} value={product._id}>
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
                                            value={orderItemsValues.product?.unitPrice ?? 0}
                                            onChange={handleOrderItemChange}
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
                                            value={orderItemsValues.quantity}
                                            onChange={handleOrderItemChange}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        {(orderItemsValues.product?.unitPrice ?? 0) *
                                            orderItemsValues.quantity}
                                    </TableCell>
                                    <TableCell align="right" sx={{ px: 0 }}>
                                        <IconButton onClick={handleAddOrderItem}>
                                            <Iconify icon="eva:plus-circle-outline" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                                {/* <TableRow>
                                    <TableCell align="right" colSpan={3}>
                                        Sub total
                                    </TableCell>
                                    <TableCell align="right">{orderValues.subTotal}</TableCell>
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
                                            value={orderValues.discount}
                                            onChange={handleOrderChange}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="right" colSpan={3}>
                                        Total
                                    </TableCell>
                                    <TableCell align="right">{orderValues.total}</TableCell>
                                    <TableCell sx={{ px: 0 }} />
                                </TableRow> */}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                        <Button variant="contained" color="inherit" type="submit">
                            Save
                        </Button>
                        {orderId && (
                            <Button
                                variant="contained"
                                color="inherit"
                                type="button"
                                onClick={handleCreateInvoiceClick}
                            >
                                Create Invoice
                            </Button>
                        )}
                    </Stack>
                </Box>
            </Container>
            <CreateInvoice
                open={invoiceOpened}
                handleClose={handleInvoiceClose}
                orderItems={orderItems}
                handleCreateClick={handleCreateClick}
            />
        </>
    );
}
