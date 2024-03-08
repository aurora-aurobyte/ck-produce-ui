import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import HeaderConfig from 'src/layouts/dashboard/header-config';

import { AddCategory } from 'src/sections/category';

// ----------------------------------------------------------------------

export default function EditCategoryPage() {
    const { categoryId } = useParams();
    return (
        <>
            <Helmet>
                <title> Edit Category | Minimal UI </title>
            </Helmet>
            <HeaderConfig title="Edit Category" backUrl="/categories" />

            <AddCategory edit categoryId={categoryId} />
        </>
    );
}
