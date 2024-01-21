import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { AddInvoice } from 'src/sections/invoices';

// ----------------------------------------------------------------------

export default function InvoicesEditPage() {
    const { invoiceId } = useParams();
    return (
        <>
            <Helmet>
                <title> Edit Invoice | Minimal UI </title>
            </Helmet>

            <AddInvoice edit invoiceId={invoiceId} />
        </>
    );
}
