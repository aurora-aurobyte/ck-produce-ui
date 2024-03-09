import { Helmet } from 'react-helmet-async';
import HeaderConfig from 'src/layouts/dashboard/header-config';

import { AddProduct } from 'src/sections/products';

// ----------------------------------------------------------------------

export default function AddProductPage() {
    return (
        <>
            <Helmet>
                <title> Add Product | Minimal UI </title>
            </Helmet>
            <HeaderConfig title="Add Product" backUrl="/products" />

            <AddProduct />
        </>
    );
}
