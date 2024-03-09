import { Helmet } from 'react-helmet-async';
import HeaderConfig from 'src/layouts/dashboard/header-config';

import { ListToBuys } from 'src/sections/toBuys';

// ----------------------------------------------------------------------

export default function ListToBuysPage() {
    return (
        <>
            <Helmet>
                <title> Items To Buy | Minimal UI </title>
            </Helmet>
            <HeaderConfig title="To Buys" backUrl="/" />

            <ListToBuys />
        </>
    );
}
