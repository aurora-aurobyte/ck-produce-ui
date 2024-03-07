import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { ViewCategory } from 'src/sections/category';

// ----------------------------------------------------------------------

export default function ViewCategoryPage() {
    const { categoryId } = useParams();
    return (
        <>
            <Helmet>
                <title> View Category | Minimal UI </title>
            </Helmet>

            <ViewCategory categoryId={categoryId} />
        </>
    );
}
