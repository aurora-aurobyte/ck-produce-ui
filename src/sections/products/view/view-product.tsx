import { useEffect, useState } from 'react';
import Box from '@mui/material/Typography';

import Container from 'src/components/container';
import Title, { TitleMenu } from 'src/components/title';
import { Product } from 'src/store/features/productSlice';
import productService from 'src/http/services/productService';
import ShopProductCard from './product-card';

type ViewProductViewType = {
    productId: string;
};

export default function ViewProduct({ productId }: ViewProductViewType) {
    const [product, setProduct] = useState<Product | null>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        productService.getProduct(productId).then((_product) => {
            setProduct(_product);
            setIsLoading(false);
        });
    }, [productId]);

    return (
        <Container>
            <Title title="View Product">
                <TitleMenu label="Edit product" edit to={`/products/edit/${productId}`} />
            </Title>
            <Box>
                <ShopProductCard product={product as Product} loading={isLoading} />
            </Box>
        </Container>
    );
}
