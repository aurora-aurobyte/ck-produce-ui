import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { AddCustomer } from 'src/sections/customers';

// ----------------------------------------------------------------------

export default function EditCustomerPage() {
    const { customerId } = useParams();
    return (
        <>
            <Helmet>
                <title> Edit Customer | Minimal UI </title>
            </Helmet>

            <AddCustomer edit customerId={customerId} />
        </>
    );
}
