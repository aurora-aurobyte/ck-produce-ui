import { Helmet } from 'react-helmet-async';
import HeaderConfig from 'src/layouts/dashboard/header-config';

import { AddInvoice } from 'src/sections/invoices';

// ----------------------------------------------------------------------

export default function AddInvoicePage() {
    return (
        <>
            <Helmet>
                <title> Add Invoice | Minimal UI </title>
            </Helmet>
            <HeaderConfig title="Add Invoice" backUrl="/invoices" />

            <AddInvoice />
        </>
    );
}
