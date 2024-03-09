import { Helmet } from 'react-helmet-async';
import HeaderConfig from 'src/layouts/dashboard/header-config';

import { AddCustomer } from 'src/sections/customers';

// ----------------------------------------------------------------------

export default function AddCustomerPage() {
    return (
        <>
            <Helmet>
                <title> Add Customer | Minimal UI </title>
            </Helmet>
            <HeaderConfig title="Add Customer" backUrl="/customers" />

            <AddCustomer />
        </>
    );
}
