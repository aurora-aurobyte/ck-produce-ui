import { useEffect, useState } from 'react';
import Container from 'src/components/container/container';
import Title from 'src/components/title';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';

import Iconify from 'src/components/iconify';
import { useRouter } from 'src/routes/hooks';
import { fetchCustomers } from 'src/store/features/customerSlice';
import { fetchProducts } from 'src/store/features/productSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

import { Controller, FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import Loader from 'src/components/loader/loader';
import invoiceService from 'src/http/services/invoiceService';
import FormDialog from 'src/sections/products/add/add-product-dialog';
import { addInvoice, updateInvoice } from 'src/store/features/invoiceSlice';
import { fDate } from 'src/utils/format-time';

// ----------------------------------------------------------------

interface IFormInput {
    orderId: string;
    date: string;
    customerId: string;
    discount: number;
    paid: boolean;
    paymentDate: string;
    invoiceItems: IFormItemInput[];
}

interface IFormItemInput {
    _id?: string;
    productId: string;
    quantity: number;
    unitPrice?: number;
    tax?: number;
    amount?: number;
}

const initialInvoiceItem: IFormItemInput = {
    productId: '',
    quantity: 0,
};

type AddInvoiceProps = {
    invoiceId?: string;
    edit?: boolean;
};

export default function AddInvoice({ invoiceId, edit }: AddInvoiceProps) {
    const products = useAppSelector((state) => state.product.products);
    const customers = useAppSelector((state) => state.customer.customers);
    const [totalState, setTotalState] = useState({ subTotal: 0, total: 0 });
    const [ids, setId] = useState<number>(0);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const methods = useForm<IFormInput>({
        mode: 'onChange',
        defaultValues: async () => {
            if (edit && invoiceId) {
                const invoice = await invoiceService.getInvoice(invoiceId);
                return {
                    orderId: invoice.orderId,
                    date: fDate(invoice.date, 'yyyy-MM-dd'),
                    customerId: invoice.customerId,
                    discount: invoice.discount,
                    paid: invoice.paid,
                    paymentDate: fDate(invoice.paymentDate, 'yyyy-MM-dd'),
                    invoiceItems: invoice.invoiceItems.map((invoiceItem) => {
                        const amount =
                            (invoiceItem.unitPrice || 0) *
                            (invoiceItem.quantity || 0) *
                            (1 + (invoiceItem.tax || 0) / 100);
                        return {
                            ...invoiceItem,
                            amount: Number(amount.toFixed(2)),
                        };
                    }),
                };
            }
            return {
                orderId: '',
                date: fDate(new Date().toString(), 'yyyy-MM-dd'),
                customerId: '',
                discount: 0,
                paid: false,
                paymentDate: fDate(new Date().toString(), 'yyyy-MM-dd'),
                invoiceItems: [initialInvoiceItem],
            };
        },
    });
    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors, isLoading, isSubmitting },
    } = methods;
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'invoiceItems',
    });

    const dispatch = useAppDispatch();
    const router = useRouter();

    const onSubmit: SubmitHandler<IFormInput> = async (values) => {
        if (edit) {
            const { updated } = await invoiceService.updateInvoice(invoiceId as string, values);
            if (updated) {
                dispatch(updateInvoice(updated));
            }
        } else {
            const addedInvoice = await invoiceService.createNewInvoice(values);
            dispatch(addInvoice(addedInvoice));
        }
        router.push('/invoices');
    };

    const handleRemoveItem = (index: number) => {
        remove(index);
    };

    const handleAddInvoiceItem = () => {
        append(initialInvoiceItem);
    };

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCustomers());
    }, [dispatch]);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'invoiceItems' && !value.invoiceItems?.length) {
                append(initialInvoiceItem);
            }
            const itemName = name?.split('.')?.[2];
            if (itemName && itemName === 'productId') {
                const id = Number(name?.split('.')?.[1]);
                const product = products.find(
                    (_product) => _product._id === value.invoiceItems?.[id]?.productId
                );
                if (product) {
                    const { unitPrice, tax } = product;
                    setValue(`invoiceItems.${id}.unitPrice`, unitPrice);
                    setValue(`invoiceItems.${id}.tax`, tax);
                    setValue(`invoiceItems.${id}.quantity`, 0);
                    setValue(`invoiceItems.${id}.amount`, 0);
                }
            }
            if (itemName === 'quantity') {
                const id = Number(name?.split('.')?.[1]);
                const amount =
                    (value.invoiceItems?.[id]?.unitPrice || 0) *
                    (value.invoiceItems?.[id]?.quantity || 0) *
                    (1 + (value.invoiceItems?.[id]?.tax || 0) / 100);
                setValue(`invoiceItems.${id}.amount`, Number(amount.toFixed(2)));
            }
            const subTotal =
                value.invoiceItems?.reduce((acc, item) => acc + (item?.amount || 0), 0) || 0;
            const total = subTotal - (value.discount || 0);
            setTotalState({
                subTotal: Number(subTotal.toFixed(2)),
                total: Number(total.toFixed(2)),
            });
        });
        return () => subscription.unsubscribe();
    }, [watch, append, products, setValue]);

    const renderForm = (
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextField
                        id="date"
                        label="Invoice Date"
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
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Tax</TableCell>
                            <TableCell align="right">Qty</TableCell>
                            <TableCell align="right">Amt</TableCell>
                            <TableCell sx={{ px: 0 }} />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {fields.map((_: IFormItemInput, index: number) => (
                            <TableRow key={index} hover>
                                <TableCell sx={{ pl: 0 }}>
                                    <Controller
                                        name={`invoiceItems.${index}.productId`}
                                        control={control}
                                        defaultValue=""
                                        render={({ field: { onChange, onBlur, value, ref } }) => (
                                            <TextField
                                                ref={ref}
                                                id={`invoiceItems.${index}.productId`}
                                                select
                                                label="Product"
                                                variant="standard"
                                                fullWidth
                                                value={value}
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                error={!!errors.invoiceItems?.[index]?.productId}
                                                helperText={
                                                    errors.invoiceItems?.[index]?.productId?.message
                                                }
                                                defaultValue=""
                                            >
                                                {products.map((item) => (
                                                    <MenuItem
                                                        key={item._id}
                                                        value={item._id}
                                                        onClick={() => {
                                                            setIsEdit(true);
                                                            setId(index + 1);
                                                        }}
                                                    >
                                                        {item.name}
                                                    </MenuItem>
                                                ))}
                                                <MenuItem
                                                    key={fields.length}
                                                    onClick={() => {
                                                        if (edit) {
                                                            handleAddInvoiceItem();
                                                        }
                                                        setIsEdit(false);
                                                        setId(fields.length);
                                                    }}
                                                >
                                                    Create New Product
                                                </MenuItem>
                                            </TextField>
                                        )}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    {watch(`invoiceItems.${index}.unitPrice`, 0)}
                                </TableCell>
                                <TableCell align="right">
                                    {watch(`invoiceItems.${index}.tax`, 0)}
                                </TableCell>
                                <TableCell align="right">
                                    <TextField
                                        id={`invoiceItems.${index}.quantity`}
                                        label="Qty"
                                        variant="standard"
                                        type="number"
                                        onFocus={(event) => {
                                            event.target.select();
                                        }}
                                        {...register(`invoiceItems.${index}.quantity`, {
                                            required: 'This is required',
                                            min: {
                                                value: 1,
                                                message: 'Qty minimum is 1.',
                                            },
                                        })}
                                        error={!!errors.invoiceItems?.[index]?.quantity}
                                        helperText={errors.invoiceItems?.[index]?.quantity?.message}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    {watch(`invoiceItems.${index}.amount`, 0)}
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
                            <TableCell align="right" sx={{ px: 0 }} colSpan={6}>
                                <Button
                                    onClick={handleAddInvoiceItem}
                                    endIcon={<Iconify icon="eva:plus-circle-outline" />}
                                >
                                    Add
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="right" colSpan={3}>
                                Sub total
                            </TableCell>
                            <TableCell align="right">{totalState.subTotal}</TableCell>
                            <TableCell sx={{ px: 0 }} />
                        </TableRow>
                        <TableRow>
                            <TableCell align="right" colSpan={3}>
                                Discount
                            </TableCell>
                            <TableCell align="right" colSpan={2} sx={{ pr: 0 }}>
                                <TextField
                                    id="discount"
                                    label="Discount"
                                    variant="standard"
                                    type="discount"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    {...register('discount', {
                                        required: 'This is required',
                                    })}
                                    error={!!errors.discount}
                                    helperText={errors.discount?.message}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="right" colSpan={3}>
                                Total
                            </TableCell>
                            <TableCell align="right">{totalState.total}</TableCell>
                            <TableCell sx={{ px: 0 }} />
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
            <Title title={edit ? 'Edit Invoice' : 'Add Invoice'} />
            {isLoading ? (
                <Loader />
            ) : (
                <FormProvider {...methods}>
                    {renderForm}
                    <FormDialog open={ids} setOpen={setId} edit={isEdit} />
                </FormProvider>
            )}
        </Container>
    );
}
