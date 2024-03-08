import { Helmet } from 'react-helmet-async';

import { ListToBuys } from 'src/sections/toBuys';

// ----------------------------------------------------------------------

export default function ListToBuysPage() {
    return (
        <>
            <Helmet>
                <title> Items To Buy | Minimal UI </title>
            </Helmet>

            <ListToBuys />
        </>
    );
}
