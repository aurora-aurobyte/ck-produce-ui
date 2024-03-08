import { Helmet } from 'react-helmet-async';
import HeaderConfig from 'src/layouts/dashboard/header-config';

import { ListInvoices } from 'src/sections/invoices';

// ----------------------------------------------------------------------

export default function ListInvoicesPage() {
    return (
        <>
            <Helmet>
                <title> Invoices | Minimal UI </title>
            </Helmet>
            <HeaderConfig title="Invoices" backUrl="/" />

            <ListInvoices />
        </>
    );
}
