import { Helmet } from 'react-helmet-async';

import { PendingPaymentsView } from 'src/sections/pendingPayments';

// ----------------------------------------------------------------------

export default function PendingPaymentsPage() {
    return (
        <>
            <Helmet>
                <title> PendingPayments | Minimal UI </title>
            </Helmet>

            <PendingPaymentsView />
        </>
    );
}
