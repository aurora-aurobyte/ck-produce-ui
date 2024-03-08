import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import HeaderConfig from 'src/layouts/dashboard/header-config';

import { AddCustomer } from 'src/sections/customers';

// ----------------------------------------------------------------------

export default function EditCustomerPage() {
    const { customerId } = useParams();
    return (
        <>
            <Helmet>
                <title> Edit Customer | Minimal UI </title>
            </Helmet>
            <HeaderConfig title="Edit Customer" backUrl="/customers" />

            <AddCustomer edit customerId={customerId} />
        </>
    );
}
