import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import HeaderConfig from 'src/layouts/dashboard/header-config';

import { AddOrder } from 'src/sections/orders';

// ----------------------------------------------------------------------

export default function EditOrderPage() {
    const { orderId } = useParams();
    return (
        <>
            <Helmet>
                <title> Edit Order | Minimal UI </title>
            </Helmet>
            <HeaderConfig title="Edit Order" backUrl="/orders" />

            <AddOrder edit orderId={orderId} />
        </>
    );
}
