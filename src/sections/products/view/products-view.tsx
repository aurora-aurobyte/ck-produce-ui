import Container from 'src/components/container';
import Title, { TitleMenu } from 'src/components/title';
import Table from 'src/components/table';

import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { Product, fetchProducts, removeProduct } from 'src/store/features/productSlice';
import { useEffect } from 'react';

export default function ViewProducts() {
    const products = useAppSelector((state) => state.product.products);
    const dispatch = useAppDispatch();

    const handleDeleteClick = (product: Product) => {
        dispatch(removeProduct(product.productId));
    };

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
                    { id: 'purchasePrice', label: 'Purchase Price' },
                    { id: 'categoryName', label: 'Category' },
                    { id: 'tax', label: 'Tax' },
                    { id: 'description', label: 'Description' },
                ]}
                editPage={(row: Product) => `/products/edit/${row.productId}`}
                onRemoveClick={handleDeleteClick}
            />
        </Container>
    );
}
