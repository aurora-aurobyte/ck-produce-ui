import { ChangeEvent, useState, FormEvent } from 'react';
import Container from 'src/components/container/container';
import Title from 'src/components/title';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { Customer, addCustomer, updateCustomer } from 'src/store/features/customerSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { useRouter } from 'src/routes/hooks';

const defaultValues = { customerId: '', name: '', address: '' };

// ----------------------------------------------------------------

type AddCustomerProps = {
    customerId?: string;
    edit?: boolean;
};

export default function AddCustomer({ customerId, edit }: AddCustomerProps) {
    const customers = useAppSelector((state) => state.customer.customers);
    const [values, setValues] = useState<Customer>(
        edit
            ? (customers.find((customer) => customer.customerId === customerId || '') as Customer)
            : defaultValues
    );
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (edit) {
            dispatch(updateCustomer({ ...values, customerId: customerId as string }));
        } else {
            dispatch(addCustomer(values));
        }
        router.back();
    };

    return (
        <Container>
            <Title title={edit ? 'Edit Customer' : 'Add Customer'} />
            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            id="name"
                            name="name"
                            label="Customer Name"
                            variant="standard"
                            fullWidth
                            value={values.name}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            id="address"
                            name="address"
                            label="Customer Address"
                            variant="standard"
                            fullWidth
                            value={values.address}
                            onChange={handleChange}
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
