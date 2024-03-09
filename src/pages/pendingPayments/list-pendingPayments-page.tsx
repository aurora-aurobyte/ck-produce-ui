import { Helmet } from 'react-helmet-async';
import HeaderConfig from 'src/layouts/dashboard/header-config';

import { ListPendingPayments } from 'src/sections/pendingPayments';

// ----------------------------------------------------------------------

export default function ListPendingPaymentsPage() {
    return (
        <>
            <Helmet>
                <title> Pending Payments | Minimal UI </title>
            </Helmet>
            <HeaderConfig title="Pending Payments" backUrl="/" />

            <ListPendingPayments />
        </>
    );
}
