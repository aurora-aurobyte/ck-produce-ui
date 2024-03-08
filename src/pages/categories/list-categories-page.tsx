import { Helmet } from 'react-helmet-async';
import HeaderConfig from 'src/layouts/dashboard/header-config';

import { ListCategories } from 'src/sections/category';

// ----------------------------------------------------------------------

export default function ListCategoriesPage() {
    return (
        <>
            <Helmet>
                <title> Categories | Minimal UI </title>
            </Helmet>
            <HeaderConfig title="Categories" />

            <ListCategories />
        </>
    );
}
