import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { ViewProduct } from 'src/sections/products';

// ----------------------------------------------------------------------

export default function ViewProductPage() {
    const { productId } = useParams();
    return (
        <>
            <Helmet>
                <title> edit Product | Minimal UI </title>
            </Helmet>

            <ViewProduct productId={productId as string} />
        </>
    );
}
