import { Helmet } from 'react-helmet-async';

import { ListPendingPayments } from 'src/sections/pendingPayments';

// ----------------------------------------------------------------------

export default function ListPendingPaymentsPage() {
    return (
        <>
            <Helmet>
                <title> Pending Payments | Minimal UI </title>
            </Helmet>

            <ListPendingPayments />
        </>
    );
}
