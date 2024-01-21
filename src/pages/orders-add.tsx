import { Helmet } from 'react-helmet-async';

import { AddOrder } from 'src/sections/orders';

// ----------------------------------------------------------------------

export default function OrderAddPage() {
    return (
        <>
            <Helmet>
                <title> Add Order | Minimal UI </title>
            </Helmet>

            <AddOrder />
        </>
    );
}
