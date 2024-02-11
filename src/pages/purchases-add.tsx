import { Helmet } from 'react-helmet-async';

import { AddPurchase } from 'src/sections/purchases';

// ----------------------------------------------------------------------

export default function PurchaseAddPage() {
    return (
        <>
            <Helmet>
                <title> Add Purchase | Minimal UI </title>
            </Helmet>

            <AddPurchase />
        </>
    );
}
