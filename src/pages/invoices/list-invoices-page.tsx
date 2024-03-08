import { Helmet } from 'react-helmet-async';

import { ListInvoices } from 'src/sections/invoices';

// ----------------------------------------------------------------------

export default function ListInvoicesPage() {
    return (
        <>
            <Helmet>
                <title> Invoices | Minimal UI </title>
            </Helmet>

            <ListInvoices />
        </>
    );
}
