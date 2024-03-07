import { useEffect } from 'react';
import Container from 'src/components/container/container';
import Title from 'src/components/title';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { Customer, addCustomer, updateCustomer } from 'src/store/features/customerSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { useRouter } from 'src/routes/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import customerService from 'src/http/services/customerService';

interface IFormInput {
    // customerId: string;
    name: string;
    email: string;
    phone: string;
    postalCode: number;
    businessName: string;
    address: string;
    balance: number;
}
// ----------------------------------------------------------------

type AddCustomerProps = {
    customerId?: string;
    edit?: boolean;
};

export default function AddCustomer({ customerId, edit }: AddCustomerProps) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IFormInput>({
        mode: 'onChange',
        defaultValues: async () => {
            if (edit && customerId) {
                const customer = await customerService.getCustomer(customerId);
                return {
                    name: customer.name,
                    email: customer.email,
                    address: customer.address,
                    balance: customer.balance,
                    businessName: customer.businessName,
                    phone: customer.phone,
                    postalCode: customer.postalCode,
                };
            }
            return {
                name: '',
                email: '',
                address: '',
                balance: 0,
                businessName: '',
                phone: '',
                postalCode: 0,
            };
        },
    });

    const customers = useAppSelector((state) => state.customer.customers);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const onSubmit: SubmitHandler<IFormInput> = async (values) => {
        if (!customerId) return;
        if (edit) {
            await customerService.updateCustomer(customerId, values);
            dispatch(updateCustomer({ ...values, _id: customerId as string }));
        } else {
            const _data = await customerService.createCustomer(values);
            dispatch(addCustomer(_data));
        }
        router.back();
    };

    useEffect(() => {
        if (!edit) return;
        const val = customers.find(
            (customer) => customer._id === customerId || ''
        ) as Customer;

        setValue('name', val.name);
        setValue('address', val.address);
        setValue('email', val.email);
        setValue('phone', val.phone);
        setValue('postalCode', val.postalCode);
        setValue('businessName', val.businessName);
        setValue('balance', val.balance);
    }, [customerId, customers, edit, setValue]);

    return (
        <Container>
            <Title title={edit ? 'Edit Customer' : 'Add Customer'} />
            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            id="name"
                            label="Customer Name"
                            variant="standard"
                            fullWidth
                            {...register('name', {
                                required: 'This is required',
                                maxLength: {
                                    value: 100,
                                    message: 'Category name exceed maximum length.',
                                },
                            })}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            id="address"
                            label="Customer Address"
                            variant="standard"
                            fullWidth
                            {...register('address', {
                                required: 'This is required',
                                maxLength: {
                                    value: 100,
                                    message: 'Address exceed maximum length.',
                                },
                            })}
                            error={!!errors.address}
                            helperText={errors.address?.message}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            id="email"
                            label="Customer Email"
                            variant="standard"
                            fullWidth
                            {...register('email', {
                                required: 'This is required',
                                maxLength: {
                                    value: 100,
                                    message: 'Category name exceed maximum length.',
                                },
                            })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            id="phoneNo"
                            label="Customer Phone No"
                            variant="standard"
                            fullWidth
                            {...register('phone', {
                                required: 'This is required',
                                maxLength: {
                                    value: 100,
                                    message: 'Category name exceed maximum length.',
                                },
                            })}
                            error={!!errors.phone}
                            helperText={errors.phone?.message}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            id="postalCode"
                            label="Customer Postal Code"
                            variant="standard"
                            fullWidth
                            {...register('postalCode', {
                                required: 'This is required',
                                maxLength: {
                                    value: 100,
                                    message: 'Category postalCode exceed maximum length.',
                                },
                            })}
                            error={!!errors.postalCode}
                            helperText={errors.postalCode?.message}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            id="businessName"
                            label="Customer Business Name"
                            variant="standard"
                            fullWidth
                            {...register('businessName', {
                                required: 'This is required',
                                maxLength: {
                                    value: 100,
                                    message: 'Category business name exceed maximum length.',
                                },
                            })}
                            error={!!errors.businessName}
                            helperText={errors.businessName?.message}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            id="balance"
                            label="Customer Balance"
                            variant="standard"
                            fullWidth
                            {...register('balance', {
                                required: 'This is required',
                                maxLength: {
                                    value: 100,
                                    message: 'Category balance exceed maximum length.',
                                },
                            })}
                            error={!!errors.balance}
                            helperText={errors.balance?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="inherit" type="submit">
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}
