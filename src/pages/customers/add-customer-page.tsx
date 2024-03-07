import { Helmet } from 'react-helmet-async';

import { AddCustomer } from 'src/sections/customers';

// ----------------------------------------------------------------------

export default function AddCustomerPage() {
    return (
        <>
            <Helmet>
                <title> Add Customer | Minimal UI </title>
            </Helmet>

            <AddCustomer />
        </>
    );
}
