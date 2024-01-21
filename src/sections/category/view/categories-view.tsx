import Container from 'src/components/container';
import Title, { TitleMenu } from 'src/components/title';
import Table from 'src/components/table';

import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { Category, fetchCategories, removeCategory } from 'src/store/features/categorySlice';
import { useEffect } from 'react';

export default function ViewCategories() {
    const categories = useAppSelector((state) => state.category.categories);
    const dispatch = useAppDispatch();

    const handleDeleteClick = (category: Category) => {
        dispatch(removeCategory(category.categoryId));
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
                editPage={(row: Category) => `/categories/edit/${row.categoryId}`}
                onRemoveClick={handleDeleteClick}
            />
        </Container>
    );
}
