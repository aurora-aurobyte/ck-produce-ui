import { useEffect } from 'react';
import Container from 'src/components/container/container';
import Title from 'src/components/title';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { Category, updateCategory, addCategory } from 'src/store/features/categorySlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { useRouter } from 'src/routes/hooks';
import { v4 as uuidv4 } from 'uuid';
import { useForm, SubmitHandler } from 'react-hook-form';

interface IFormInput {
    name: string;
    categoryId: string;
}

// ----------------------------------------------------------------

type AddCategoryProps = {
    categoryId?: string;
    edit?: boolean;
};

export default function AddCategory({ categoryId, edit }: Readonly<AddCategoryProps>) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IFormInput>({ mode: 'onChange' });

    const dispatch = useAppDispatch();
    const router = useRouter();

    const categories = useAppSelector((state) => state.category.categories);

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        if (edit) {
            dispatch(updateCategory({ ...data, categoryId: categoryId as string }));
        } else {
            dispatch(addCategory({ ...data, categoryId: uuidv4() }));
        }
        router.back();
    };

    useEffect(() => {
        if (!edit) return;
        const val = categories.find(
            (category) => category.categoryId === categoryId || ''
        ) as Category;

        setValue('name', val.name);
        setValue('categoryId', val.categoryId);
    }, [categoryId, categories, edit, setValue]);

    return (
        <Container>
            <Title title={edit ? 'Edit Category' : 'Add Category'} />
            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <TextField
                            id="name"
                            {...register('name', {
                                required: 'This is required',
                                maxLength: {
                                    value: 100,
                                    message: 'Category name exceed maximum length.',
                                },
                            })}
                            label="Category Name"
                            variant="standard"
                            fullWidth
                            error={!!errors.name}
                            helperText={errors.name?.message}
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
