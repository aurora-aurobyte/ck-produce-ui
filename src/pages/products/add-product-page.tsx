import { Helmet } from 'react-helmet-async';

import { AddProduct } from 'src/sections/products';

// ----------------------------------------------------------------------

export default function AddProductPage() {
    return (
        <>
            <Helmet>
                <title> Add Product | Minimal UI </title>
            </Helmet>

            <AddProduct />
        </>
    );
}
