import { Helmet } from 'react-helmet-async';

import { ListCategories } from 'src/sections/category';

// ----------------------------------------------------------------------

export default function ListCategoriesPage() {
    return (
        <>
            <Helmet>
                <title> Categories | Minimal UI </title>
            </Helmet>

            <ListCategories />
        </>
    );
}
