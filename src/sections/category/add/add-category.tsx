import { ChangeEvent, useState, FormEvent, useEffect } from 'react';
import Container from 'src/components/container/container';
import Title from 'src/components/title';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { Category, updateCategory, addCategory } from 'src/store/features/categorySlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { useRouter } from 'src/routes/hooks';

const defaultValues: Category = {
    categoryId: '',
    name: '',
};

// ----------------------------------------------------------------

type AddCategoryProps = {
    categoryId?: string;
    edit?: boolean;
};

export default function AddCategory({ categoryId, edit }: Readonly<AddCategoryProps>) {
    const categories = useAppSelector((state) => state.category.categories);

    const [values, setValues] = useState<Category>(defaultValues);

    useEffect(() => {
        if (!edit) return;
        setValues(
            categories.find((category) => category.categoryId === categoryId || '') as Category
        );
    }, [categoryId, categories, edit]);

    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (edit) {
            dispatch(updateCategory({ ...values, categoryId: categoryId as string }));
        } else {
            dispatch(addCategory(values));
        }
        router.back();
    };

    return (
        <Container>
            <Title title={edit ? 'Edit Category' : 'Add Category'} />
            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <TextField
                            id="name"
                            name="name"
                            label="Category Name"
                            variant="standard"
                            fullWidth
                            value={values?.name}
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
