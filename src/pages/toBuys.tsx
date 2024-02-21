import { Helmet } from 'react-helmet-async';

import { ToBuysView } from 'src/sections/toBuys';

// ----------------------------------------------------------------------

export default function ToBuysPage() {
    return (
        <>
            <Helmet>
                <title> ToBuys | Minimal UI </title>
            </Helmet>

            <ToBuysView />
        </>
    );
}
