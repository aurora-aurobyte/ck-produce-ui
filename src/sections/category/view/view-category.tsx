import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from 'src/components/container';
import Title, { TitleMenu } from 'src/components/title';
import { Category } from 'src/store/features/categorySlice';
import categoryService from 'src/http/services/categoryService';
import ShopProductCard from './view-item-card';

type ViewCategoryType = {
    categoryId?: string;
};

export default function ViewCategory({ categoryId }: ViewCategoryType) {
    const [category, setCategory] = useState<Category | null>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        categoryService.getCategory(categoryId as string).then((_category) => {
            setCategory(_category);
            setIsLoading(false);
        });
    }, [categoryId]);

    return (
        <Container>
            <Title title="View Category">
                <TitleMenu label="Edit category" edit to={`/categories/edit/${categoryId}`} />
            </Title>
            <Box>
                <ShopProductCard category={category as Category} loading={isLoading} />
            </Box>
        </Container>
    );
}
