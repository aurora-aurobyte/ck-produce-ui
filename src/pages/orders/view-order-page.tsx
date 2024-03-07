import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { ViewOrder } from 'src/sections/orders';

// ----------------------------------------------------------------------

export default function OrdersEditPage() {
    const { orderId } = useParams();
    return (
        <>
            <Helmet>
                <title> View Order | Minimal UI </title>
            </Helmet>

            <ViewOrder orderId={orderId as string} />
        </>
    );
}
