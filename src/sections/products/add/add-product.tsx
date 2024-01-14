import { ChangeEvent, useState, FormEvent } from 'react';
import Container from 'src/components/container/container';
import Title from 'src/components/title';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { Product, addProduct } from 'src/store/features/productSlice';
import { useAppDispatch } from 'src/store/hooks';

const defaultValues: Product = {
    productId: '',
    name: '',
    unitPrice: 0,
    category: '',
    description: '',
};

export default function AddProduct() {
    const [values, setValues] = useState<Product>(defaultValues);
    const dispatch = useAppDispatch();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        dispatch(addProduct(values));
        setValues(defaultValues);
    };

    return (
        <Container>
            <Title title="Add Product" />
            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            id="name"
                            name="name"
                            label="Product Name"
                            variant="standard"
                            fullWidth
                            value={values.name}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            id="unitPrice"
                            name="unitPrice"
                            label="Product Price"
                            variant="standard"
                            type="number"
                            fullWidth
                            value={values.unitPrice}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            id="category"
                            name="category"
                            label="Category"
                            variant="standard"
                            fullWidth
                            value={values.category}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            id="description"
                            name="description"
                            label="Description"
                            variant="standard"
                            fullWidth
                            value={values.description}
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
