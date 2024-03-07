import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import Container from 'src/components/container';
import Title, { TitleMenu } from 'src/components/title';
import Table from 'src/components/table';

import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { Product, fetchProducts, removeProduct } from 'src/store/features/productSlice';
import { useEffect } from 'react';
import { fToNow } from 'src/utils/format-time';
import productService from 'src/http/services/productService';

export default function ListProducts() {
    const { loading, products } = useAppSelector((state) => state.product);
    const dispatch = useAppDispatch();

    const handleDeleteClick = async (product: Product) => {
        await productService.deleteProduct(product._id);
        dispatch(removeProduct(product._id));
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
                loading={loading}
                columns={[
                    { id: 'name', label: 'Name' },
                    { id: 'unitPrice', label: 'Unit Price' },
                    { id: 'purchasePrice', label: 'Purchase Price' },
                    { id: 'categoryName', label: 'Category' },
                    { id: 'tax', label: 'Tax' },
                    { id: 'description', label: 'Description' },
                ]}
                viewPage={(row: Product) => `/products/view/${row._id}`}
                editPage={(row: Product) => `/products/edit/${row._id}`}
                onRemoveClick={handleDeleteClick}
                renderRow={(row) => (
                    <>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="h5" component="div">
                                {row.name}
                            </Typography>
                            <Typography color="text.secondary">$ {row.unitPrice}</Typography>
                        </Stack>
                        <Typography variant="body2">{row.category?.name}</Typography>
                        <Typography color="text.secondary" fontSize={12} mt={1}>
                            Created {fToNow(row.createdAt)}
                        </Typography>
                    </>
                )}
            />
        </Container>
    );
}
