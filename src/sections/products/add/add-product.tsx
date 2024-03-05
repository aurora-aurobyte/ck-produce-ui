import Container from 'src/components/container/container';
import Title from 'src/components/title';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { addProduct, updateProduct } from 'src/store/features/productSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { useRouter } from 'src/routes/hooks';
import { FormControl, MenuItem } from '@mui/material';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import productService from 'src/http/services/productService';
import { useEffect } from 'react';
import { fetchCategories } from 'src/store/features/categorySlice';

interface IFormInput {
    name: string;
    purchasePrice: number;
    unitPrice: number;
    tax: number;
    categoryId: string;
    description: string;
}

// ----------------------------------------------------------------

type AddProductProps = {
    productId?: string;
    edit?: boolean;
};

export default function AddProduct({ productId, edit }: AddProductProps) {
    const categories = useAppSelector((state) => state.category.categories);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isLoading, isSubmitting },
    } = useForm<IFormInput>({
        mode: 'onChange',
        defaultValues: async () => {
            if (edit) {
                const product = await productService.getProduct(productId as string);
                return {
                    name: product.name,
                    purchasePrice: product.purchasePrice,
                    unitPrice: product.unitPrice,
                    tax: product.tax,
                    categoryId: product.categoryId,
                    description: product.description,
                };
            }
            return {
                name: '',
                purchasePrice: 0,
                unitPrice: 0,
                tax: 0,
                categoryId: '',
                description: '',
            };
        },
    });

    const dispatch = useAppDispatch();
    const router = useRouter();

    const onSubmit: SubmitHandler<IFormInput> = async (values) => {
        if (edit) {
            await productService.updateProduct(productId as string, values);
            dispatch(updateProduct({ ...values, _id: productId as string }));
        } else {
            const addedProduct = await productService.createProduct(values);
            dispatch(addProduct(addedProduct));
        }
        router.push('/products');
    };

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    if (isLoading) return 'Loading...';

    return (
        <Container>
            <Title title={edit ? 'Edit Product' : 'Add Product'} />
            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            id="name"
                            label="Product Name"
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
                            id="unitPrice"
                            label="Unit Price"
                            variant="standard"
                            type="number"
                            fullWidth
                            {...register('unitPrice', {
                                required: 'This is required',
                                min: {
                                    value: 0,
                                    message: 'Unit price minimum is 0.',
                                },
                            })}
                            error={!!errors.unitPrice}
                            helperText={errors.unitPrice?.message}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            id="purchasePrice"
                            label="Purchase Price"
                            variant="standard"
                            type="number"
                            fullWidth
                            {...register('purchasePrice', {
                                required: 'This is required',
                                min: {
                                    value: 0,
                                    message: 'Purchase price minimum is 0.',
                                },
                            })}
                            error={!!errors.purchasePrice}
                            helperText={errors.purchasePrice?.message}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            id="tax"
                            label="Tax (%)"
                            variant="standard"
                            type="number"
                            fullWidth
                            {...register('tax', {
                                required: 'This is required',
                                min: {
                                    value: 0,
                                    message: 'Tax minimum is 0.',
                                },
                            })}
                            error={!!errors.tax}
                            helperText={errors.tax?.message}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <Controller
                                name="categoryId"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <TextField
                                        ref={ref}
                                        id="label-categoryId-select"
                                        select
                                        label="Category"
                                        variant="standard"
                                        fullWidth
                                        value={value}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        error={!!errors.categoryId}
                                        helperText={errors.categoryId?.message}
                                        defaultValue=""
                                    >
                                        {categories.map((item) => (
                                            <MenuItem key={item._id} value={item._id}>
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            id="description"
                            label="Description"
                            variant="standard"
                            fullWidth
                            {...register('description', {
                                required: 'This is required',
                                maxLength: {
                                    value: 100,
                                    message: 'Description maximum limit exceed.',
                                },
                            })}
                            error={!!errors.description}
                            helperText={errors.description?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="inherit"
                            type="submit"
                            key={`${isSubmitting}`}
                            disabled={isSubmitting}
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}
