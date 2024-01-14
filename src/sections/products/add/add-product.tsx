import { ChangeEvent, useState, FormEvent } from 'react';
import Container from 'src/components/container/container';
import Title from 'src/components/title';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { Product, addProduct, updateProduct } from 'src/store/features/productSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { useRouter } from 'src/routes/hooks';

const defaultValues: Product = {
    productId: '',
    name: '',
    unitPrice: 0,
    category: '',
    description: '',
};

// ----------------------------------------------------------------

type AddProductProps = {
    productId?: string;
    edit?: boolean;
};

export default function AddProduct({ productId, edit }: AddProductProps) {
    const products = useAppSelector((state) => state.product.products);
    const [values, setValues] = useState<Product>(
        edit
            ? (products.find((customer) => customer.productId === productId || '') as Product)
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
            dispatch(updateProduct({ ...values, productId: productId as string }));
        } else {
            dispatch(addProduct(values));
        }
        router.back();
    };

    return (
        <Container>
            <Title title={edit ? 'Edit Product' : 'Add Product'} />
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
