import { Helmet } from 'react-helmet-async';
import HeaderConfig from 'src/layouts/dashboard/header-config';

import { AddCategory } from 'src/sections/category';

// ----------------------------------------------------------------------

export default function CategoriesAddPage() {
    return (
        <>
            <Helmet>
                <title> Add Category | Minimal UI </title>
            </Helmet>
            <HeaderConfig title="Add Category" backUrl="/categories" />

            <AddCategory />
        </>
    );
}
