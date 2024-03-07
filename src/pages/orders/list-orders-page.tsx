import { Helmet } from 'react-helmet-async';

import { ListOrders } from 'src/sections/orders';

// ----------------------------------------------------------------------

export default function ListOrdersPage() {
    return (
        <>
            <Helmet>
                <title> Orders | Minimal UI </title>
            </Helmet>

            <ListOrders />
        </>
    );
}
