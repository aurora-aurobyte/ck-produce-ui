import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import HeaderConfig from 'src/layouts/dashboard/header-config';

import { ViewProduct } from 'src/sections/products';

// ----------------------------------------------------------------------

export default function ViewProductPage() {
    const { productId } = useParams();
    return (
        <>
            <Helmet>
                <title> View Product | Minimal UI </title>
            </Helmet>
            <HeaderConfig title="View Product" backUrl="/products" />

            <ViewProduct productId={productId as string} />
        </>
    );
}
