import { Helmet } from 'react-helmet-async';

import { ViewCustomers } from 'src/sections/customers';

// ----------------------------------------------------------------------

export default function CustomersViewPage() {
    return (
        <>
            <Helmet>
                <title> View Customers | Minimal UI </title>
            </Helmet>

            <ViewCustomers />
        </>
    );
}
