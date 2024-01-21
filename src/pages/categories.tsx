import { Helmet } from 'react-helmet-async';

import { CategoriesView } from 'src/sections/category';

// ----------------------------------------------------------------------

export default function ProductsPage() {
    return (
        <>
            <Helmet>
                <title> Categories | Minimal UI </title>
            </Helmet>

            <CategoriesView />
        </>
    );
}
