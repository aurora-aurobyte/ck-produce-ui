import { useEffect } from 'react';
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
import { fetchProducts } from 'src/store/features/productSlice';
import { fetchCustomers } from 'src/store/features/customerSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { useRouter } from 'src/routes/hooks';

import { addOrder, updateOrder } from 'src/store/features/orderSlice';
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import orderService from 'src/http/services/orderService';
import { fDate } from 'src/utils/format-time';
import Loader from 'src/components/loader/loader';

// ----------------------------------------------------------------

interface IFormInput {
    date: string;
    customerId: string;
    orderItems: IFormItemInput[];
}

interface IFormItemInput {
    _id?: string;
    productId: string;
    quantity: number;
    delivered: boolean;
}

const initialOrderItem: IFormItemInput = {
    productId: '',
    quantity: 0,
    delivered: false,
};

type AddOrderProps = {
    orderId?: string;
    edit?: boolean;
};

export default function AddOrder({ orderId, edit }: AddOrderProps) {
    const products = useAppSelector((state) => state.product.products);
    const customers = useAppSelector((state) => state.customer.customers);

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors, isLoading, isSubmitting },
    } = useForm<IFormInput>({
        mode: 'onChange',
        defaultValues: async () => {
            if (edit && orderId) {
                const order = await orderService.getOrder(orderId);
                return {
                    date: fDate(order.date, 'yyyy-MM-dd'),
                    customerId: order.customerId,
                    orderItems: order.orderItems,
                };
            }
            return {
                date: fDate(new Date().toString(), 'yyyy-MM-dd'),
                customerId: '',
                orderItems: [initialOrderItem],
            };
        },
    });
    const { fields, append, remove } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: 'orderItems', // unique name for your Field Array
    });

    const dispatch = useAppDispatch();
    const router = useRouter();

    const onSubmit: SubmitHandler<IFormInput> = async (values) => {
        if (edit) {
            const { updated } = await orderService.updateOrder(orderId as string, values);
            if (updated) {
                dispatch(updateOrder(updated));
            }
        } else {
            const addedOrder = await orderService.createOrder(values);
            dispatch(addOrder(addedOrder));
        }
        router.push('/orders');
    };

    const handleRemoveItem = (index: number) => {
        remove(index);
    };

    const handleAddOrderItem = () => {
        append(initialOrderItem);
    };

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCustomers());
    }, [dispatch]);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'orderItems' && !value.orderItems?.length) {
                append(initialOrderItem);
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, append]);

    const renderForm = (
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextField
                        id="date"
                        label="Order Date"
                        variant="standard"
                        type="date"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        {...register('date', {
                            required: 'This is required',
                        })}
                        error={!!errors.date}
                        helperText={errors.date?.message}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="customerId"
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                            <TextField
                                ref={ref}
                                id="customerId"
                                select
                                label="Customer"
                                variant="standard"
                                fullWidth
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                error={!!errors.customerId}
                                helperText={errors.customerId?.message}
                                defaultValue=""
                            >
                                {customers.map((item) => (
                                    <MenuItem key={item._id} value={item._id}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                </Grid>
            </Grid>
            <TableContainer sx={{ mt: 2 }}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ pl: 0 }}>Product Name</TableCell>
                            <TableCell align="right">Qty</TableCell>
                            <TableCell sx={{ px: 0 }} />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {fields.map((_: IFormItemInput, index: number) => (
                            <TableRow key={index} hover>
                                <TableCell sx={{ pl: 0 }}>
                                    <Controller
                                        name={`orderItems.${index}.productId`}
                                        control={control}
                                        defaultValue=""
                                        render={({ field: { onChange, onBlur, value, ref } }) => (
                                            <TextField
                                                ref={ref}
                                                id={`orderItems.${index}.productId`}
                                                select
                                                label="Product"
                                                variant="standard"
                                                fullWidth
                                                value={value}
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                error={!!errors.orderItems?.[index]?.productId}
                                                helperText={
                                                    errors.orderItems?.[index]?.productId?.message
                                                }
                                                defaultValue=""
                                            >
                                                {products.map((item) => (
                                                    <MenuItem key={item._id} value={item._id}>
                                                        {item.name}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        )}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <TextField
                                        id={`orderItems.${index}.quantity`}
                                        label="Qty"
                                        variant="standard"
                                        type="number"
                                        onFocus={(event) => {
                                            event.target.select();
                                        }}
                                        {...register(`orderItems.${index}.quantity`, {
                                            required: 'This is required',
                                            min: {
                                                value: 1,
                                                message: 'Qty minimum is 1.',
                                            },
                                        })}
                                        error={!!errors.orderItems?.[index]?.quantity}
                                        helperText={errors.orderItems?.[index]?.quantity?.message}
                                    />
                                </TableCell>
                                <TableCell align="right" sx={{ px: 0 }}>
                                    <IconButton onClick={() => handleRemoveItem(index)}>
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
                            <TableCell align="right" sx={{ px: 0 }} colSpan={3}>
                                <Button
                                    onClick={handleAddOrderItem}
                                    endIcon={<Iconify icon="eva:plus-circle-outline" />}
                                >
                                    Add
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button
                    variant="contained"
                    color="inherit"
                    type="submit"
                    key={`${isSubmitting}`}
                    disabled={isSubmitting}
                >
                    Save
                </Button>
            </Stack>
        </Box>
    );

    return (
        <Container>
            <Title title={edit ? 'Edit Order' : 'Add Order'} />
            {isLoading ? <Loader /> : renderForm}
        </Container>
    );
}
