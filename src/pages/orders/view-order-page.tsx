import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import HeaderConfig from 'src/layouts/dashboard/header-config';

import { ViewOrder } from 'src/sections/orders';

// ----------------------------------------------------------------------

export default function OrdersEditPage() {
    const { orderId } = useParams();
    return (
        <>
            <Helmet>
                <title> View Order | Minimal UI </title>
            </Helmet>
            <HeaderConfig title="View Order" backUrl="/orders" />

            <ViewOrder orderId={orderId as string} />
        </>
    );
}
