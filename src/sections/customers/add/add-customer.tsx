import { ChangeEvent, useState, FormEvent } from 'react';
import Container from 'src/components/container/container';
import Title from 'src/components/title';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { Customer, addCustomer } from 'src/store/features/customerSlice';
import { useAppDispatch } from 'src/store/hooks';

const defaultValues = { customerId: '', name: '', address: '' };

export default function AddCustomer() {
    const [values, setValues] = useState<Customer>(defaultValues);
    const dispatch = useAppDispatch();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        dispatch(addCustomer(values));
        setValues(defaultValues);
    };

    return (
        <Container>
            <Title title="Add Customer" />
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
