import { Helmet } from 'react-helmet-async';
import HeaderConfig from 'src/layouts/dashboard/header-config';

import { ListOrders } from 'src/sections/orders';

// ----------------------------------------------------------------------

export default function ListOrdersPage() {
    return (
        <>
            <Helmet>
                <title> Orders | Minimal UI </title>
            </Helmet>
            <HeaderConfig title="Orders" backUrl="/" />

            <ListOrders />
        </>
    );
}
