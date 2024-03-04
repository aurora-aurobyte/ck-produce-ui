import { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Container from 'src/components/container';
import Title, { TitleMenu } from 'src/components/title';
import Table from 'src/components/table';

import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { Category, fetchCategories, removeCategory } from 'src/store/features/categorySlice';
import { fToNow } from 'src/utils/format-time';

export default function ViewCategories() {
    const categories = useAppSelector((state) => state.category.categories);
    const accessToken = useAppSelector((state) => state.auth.accessToken);
    const dispatch = useAppDispatch();

    const handleDeleteClick = (category: Category) => {
        axios
            .delete(`${import.meta.env.VITE_BASE_URL}/categories/${category._id}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            })
            .then(() => {
                dispatch(removeCategory(category._id));
            });
    };

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <Container>
            <Title title="Categories">
                <TitleMenu label="New category" to="/categories/add" />
            </Title>
            <Table<Category>
                data={categories}
                columns={[{ id: 'name', label: 'Name' }]}
                editPage={(row: Category) => `/categories/edit/${row._id}`}
                onRemoveClick={handleDeleteClick}
                renderRow={(row) => (
                    <>
                        <Typography variant="h5" component="div">
                            {row.name}
                        </Typography>
                        <Typography color="text.secondary">
                            Created {fToNow(row.createdAt)}
                        </Typography>
                    </>
                )}
            />
        </Container>
    );
}
