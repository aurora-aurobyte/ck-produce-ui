import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import HeaderConfig from 'src/layouts/dashboard/header-config';

import { ViewCustomer } from 'src/sections/customers';

// ----------------------------------------------------------------------

export default function ViewCustomerPage() {
    const { customerId } = useParams();
    return (
        <>
            <Helmet>
                <title> View Customer | Minimal UI </title>
            </Helmet>
            <HeaderConfig title="View Customer" backUrl="/customers" />

            <ViewCustomer customerId={customerId} />
        </>
    );
}
