import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import HeaderConfig from 'src/layouts/dashboard/header-config';

import { ViewInvoice } from 'src/sections/invoices';

// ----------------------------------------------------------------------

export default function ViewInvoicePage() {
    const { invoiceId } = useParams();
    return (
        <>
            <Helmet>
                <title> View Invoice | Minimal UI </title>
            </Helmet>
            <HeaderConfig title="View Invoice" backUrl="/invoices" />

            <ViewInvoice invoiceId={invoiceId as string} />
        </>
    );
}
