import { Helmet } from 'react-helmet-async';

import { PurchasesView } from 'src/sections/purchases';

// ----------------------------------------------------------------------

export default function PurchasesPage() {
    return (
        <>
            <Helmet>
                <title> Purchases | Minimal UI </title>
            </Helmet>

            <PurchasesView />
        </>
    );
}
