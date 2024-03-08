import { Helmet } from 'react-helmet-async';
import HeaderConfig from 'src/layouts/dashboard/header-config';

import { ListProducts } from 'src/sections/products';

// ----------------------------------------------------------------------

export default function ListProductsPage() {
    return (
        <>
            <Helmet>
                <title> Products | Minimal UI </title>
            </Helmet>
            <HeaderConfig title="Products" backUrl="/products" />

            <ListProducts />
        </>
    );
}
