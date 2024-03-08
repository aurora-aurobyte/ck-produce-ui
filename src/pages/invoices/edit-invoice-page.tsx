import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import HeaderConfig from 'src/layouts/dashboard/header-config';

import { AddInvoice } from 'src/sections/invoices';

// ----------------------------------------------------------------------

export default function EditInvoicePage() {
    const { invoiceId } = useParams();
    return (
        <>
            <Helmet>
                <title> Edit Invoice | Minimal UI </title>
            </Helmet>
            <HeaderConfig title="Edit Invoice" backUrl="/invoices" />

            <AddInvoice edit invoiceId={invoiceId} />
        </>
    );
}
