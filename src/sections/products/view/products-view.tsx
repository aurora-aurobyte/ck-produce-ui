import Container from 'src/components/container';
import Title, { TitleMenu } from 'src/components/title';
import Table from 'src/components/table';

import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { Product, fetchProducts } from 'src/store/features/productSlice';
import { useEffect } from 'react';

export default function ViewProducts() {
    const products = useAppSelector((state) => state.product.products);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <Container>
            <Title title="Products">
                <TitleMenu label="New product" to="/products/add" />
            </Title>
            <Table<Product>
                data={products}
                columns={[
                    { id: 'name', label: 'Name' },
                    { id: 'unitPrice', label: 'Unit Price' },
                    { id: 'category', label: 'Category' },
                    { id: 'description', label: 'Description' },
                ]}
            />
        </Container>
    );
}
