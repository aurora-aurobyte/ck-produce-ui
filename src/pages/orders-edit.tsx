import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { AddOrder } from 'src/sections/orders';

// ----------------------------------------------------------------------

export default function OrdersEditPage() {
    const { orderId } = useParams();
    return (
        <>
            <Helmet>
                <title> Edit Order | Minimal UI </title>
            </Helmet>

            <AddOrder edit orderId={orderId} />
        </>
    );
}
