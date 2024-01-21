import { Helmet } from 'react-helmet-async';

import { AddCategory } from 'src/sections/category';

// ----------------------------------------------------------------------

export default function CategoriesAddPage() {
    return (
        <>
            <Helmet>
                <title> Add Category | Minimal UI </title>
            </Helmet>

            <AddCategory />
        </>
    );
}
