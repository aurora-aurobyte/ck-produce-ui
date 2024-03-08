import { Helmet } from 'react-helmet-async';
import HeaderConfig from 'src/layouts/dashboard/header-config';

import { ListCustomers } from 'src/sections/customers';

// ----------------------------------------------------------------------

export default function ListCustomersPage() {
    return (
        <>
            <Helmet>
                <title> Customers | Minimal UI </title>
            </Helmet>
            <HeaderConfig title="Customers" backUrl="/" />

            <ListCustomers />
        </>
    );
}
