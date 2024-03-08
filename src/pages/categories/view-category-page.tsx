import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import HeaderConfig from 'src/layouts/dashboard/header-config';

import { ViewCategory } from 'src/sections/category';

// ----------------------------------------------------------------------

export default function ViewCategoryPage() {
    const { categoryId } = useParams();
    return (
        <>
            <Helmet>
                <title> View Category | Minimal UI </title>
            </Helmet>
            <HeaderConfig title="View Category" backUrl="/categories" />

            <ViewCategory categoryId={categoryId} />
        </>
    );
}
