import { Helmet } from 'react-helmet-async';
import HeaderConfig from 'src/layouts/dashboard/header-config';

import { AddOrder } from 'src/sections/orders';

// ----------------------------------------------------------------------

export default function AddOrderPage() {
    return (
        <>
            <Helmet>
                <title> Add Order | Minimal UI </title>
            </Helmet>
            <HeaderConfig title="Add Order" backUrl="/orders" />

            <AddOrder />
        </>
    );
}
