import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import HeaderConfig from 'src/layouts/dashboard/header-config';

import { AddProduct } from 'src/sections/products';

// ----------------------------------------------------------------------

export default function EditProductPage() {
    const { productId } = useParams();
    return (
        <>
            <Helmet>
                <title> edit Product | Minimal UI </title>
            </Helmet>
            <HeaderConfig title="Edit Product" backUrl="/products" />

            <AddProduct edit productId={productId} />
        </>
    );
}
