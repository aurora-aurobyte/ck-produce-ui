import { Helmet } from 'react-helmet-async';

import { ListCustomers } from 'src/sections/customers';

// ----------------------------------------------------------------------

export default function ListCustomersPage() {
    return (
        <>
            <Helmet>
                <title> View Customers | Minimal UI </title>
            </Helmet>

            <ListCustomers />
        </>
    );
}
