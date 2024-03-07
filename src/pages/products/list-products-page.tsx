import { Helmet } from 'react-helmet-async';

import { ListProducts } from 'src/sections/products';

// ----------------------------------------------------------------------

export default function ListProductsPage() {
    return (
        <>
            <Helmet>
                <title> Products | Minimal UI </title>
            </Helmet>

            <ListProducts />
        </>
    );
}
