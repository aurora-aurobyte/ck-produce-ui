import { Helmet } from 'react-helmet-async';

import { AddInvoice } from 'src/sections/invoices';

// ----------------------------------------------------------------------

export default function AddInvoicePage() {
    return (
        <>
            <Helmet>
                <title> Add Invoice | Minimal UI </title>
            </Helmet>

            <AddInvoice />
        </>
    );
}
