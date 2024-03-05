import Container from 'src/components/container/container';
import Title from 'src/components/title';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { Category, updateCategory, addCategory } from 'src/store/features/categorySlice';
import { useAppDispatch } from 'src/store/hooks';
import { useRouter } from 'src/routes/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import categoryService from 'src/http/services/categoryService';

interface IFormInput {
    name: string;
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
        formState: { errors, isLoading, isSubmitting },
    } = useForm<IFormInput>({
        mode: 'onChange',
        defaultValues: async () => {
            if (edit) {
                const category = await categoryService.getCategory(categoryId as string);
                return {
                    name: category.name,
                };
            }
            return {
                name: '',
            };
        },
    });

    const dispatch = useAppDispatch();
    const router = useRouter();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        if (edit) {
            await categoryService.updateCategory(categoryId as string, data).then(() => {
                dispatch(updateCategory({ ...data, categoryId: categoryId as string }));
            });
        } else {
            await categoryService.createCategory(data).then((_data: Category) => {
                dispatch(addCategory(_data));
            });
        }
        router.push('/categories');
    };

    if (isLoading) return 'Loading...';

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
                        <Button
                            key={`${isSubmitting}`}
                            variant="contained"
                            color="inherit"
                            type="submit"
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
