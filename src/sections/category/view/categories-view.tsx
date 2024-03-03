import { useEffect } from 'react';
import axios from 'axios';
import Container from 'src/components/container';
import Title, { TitleMenu } from 'src/components/title';
import Table from 'src/components/table';

import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { Category, fetchCategories, removeCategory } from 'src/store/features/categorySlice';

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
            />
        </Container>
    );
}
