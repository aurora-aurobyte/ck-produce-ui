import { Helmet } from 'react-helmet-async';

import { InvoicesView } from 'src/sections/invoices';

// ----------------------------------------------------------------------

export default function InvoicesPage() {
    return (
        <>
            <Helmet>
                <title> Invoices | Minimal UI </title>
            </Helmet>

            <InvoicesView />
        </>
    );
}
