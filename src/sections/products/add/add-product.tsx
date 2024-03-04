import { useEffect } from 'react';
import Container from 'src/components/container/container';
import Title from 'src/components/title';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { Product, addProduct, updateProduct } from 'src/store/features/productSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { useRouter } from 'src/routes/hooks';
import { FormControl, MenuItem } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Category } from 'src/store/features/categorySlice';

interface IFormInput {
    _id: string;
    name: string;
    purchasePrice: number;
    unitPrice: number;
    tax: number;
    categoryId: string;
    category: Category;
    description: string;
}

// ----------------------------------------------------------------

type AddProductProps = {
    productId?: string;
    edit?: boolean;
};

export default function AddProduct({ productId, edit }: AddProductProps) {
    const products = useAppSelector((state) => state.product.products);
    const categories = useAppSelector((state) => state.category.categories);
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        watch,
        formState: { errors },
    } = useForm<IFormInput>({
        mode: 'onChange',
    });

    const dispatch = useAppDispatch();
    const router = useRouter();

    const onSubmit: SubmitHandler<IFormInput> = (values) => {
        if (edit) {
            dispatch(
                updateProduct({ ...values, createdAt: '', updatedAt: '', _id: productId as string })
            );
        } else {
            dispatch(addProduct({ ...values, createdAt: '', updatedAt: '' }));
        }
        router.back();
    };

    useEffect(() => {
        if (!edit) return;

        const val = products.find((product) => product._id === productId || '') as Product;

        setValue('name', val.name);
        setValue('_id', val._id);
        setValue('purchasePrice', val.purchasePrice);
        setValue('unitPrice', val.unitPrice);
        // setValue('categoryName', val.categoryName);
        setValue('categoryId', val.categoryId);
        setValue('description', val.description);
        setValue('tax', val.tax);
    }, [productId, products, edit, setValue, categories]);

    if (!watch('categoryId') && edit) return 'Loading...';
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
                            <TextField
                                id="label-categoryId-select"
                                select
                                label="Category"
                                variant="standard"
                                fullWidth
                                {...register('categoryId', {
                                    onChange: (e) => {
                                        const categoryId = e.target.value;
                                        setValue('categoryId', categoryId);
                                        // setValue(
                                        //     'categoryName',
                                        //     categories.find((c) => c._id === categoryId)?.name || ''
                                        // );
                                        return categoryId;
                                    },
                                    required: 'This is required',
                                })}
                                error={!!errors.categoryId}
                                helperText={errors.categoryId?.message}
                                defaultValue={getValues('categoryId')}
                            >
                                {categories.map((item) => (
                                    <MenuItem key={item.name + item._id} value={item._id}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </TextField>
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
                        <Button variant="contained" color="inherit" type="submit">
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}
