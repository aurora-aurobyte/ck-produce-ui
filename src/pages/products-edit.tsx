import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { AddProduct } from 'src/sections/products';

// ----------------------------------------------------------------------

export default function CustomersEditPage() {
    const { productId } = useParams();
    return (
        <>
            <Helmet>
                <title> edit Product | Minimal UI </title>
            </Helmet>

            <AddProduct edit productId={productId} />
        </>
    );
}
