import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { AddPurchase } from 'src/sections/purchases';

// ----------------------------------------------------------------------

export default function PurchasesEditPage() {
    const { purchaseId } = useParams();
    return (
        <>
            <Helmet>
                <title> Edit Purchase | Minimal UI </title>
            </Helmet>

            <AddPurchase edit purchaseId={purchaseId} />
        </>
    );
}
