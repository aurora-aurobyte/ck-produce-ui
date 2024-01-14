import { Helmet } from 'react-helmet-async';

import { AddCustomer } from 'src/sections/customers';

// ----------------------------------------------------------------------

export default function CustomersAddPage() {
    return (
        <>
            <Helmet>
                <title> Add Customer | Minimal UI </title>
            </Helmet>

            <AddCustomer />
        </>
    );
}
