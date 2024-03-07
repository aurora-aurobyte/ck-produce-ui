import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { AddCategory } from 'src/sections/category';

// ----------------------------------------------------------------------

export default function EditCategoryPage() {
    const { categoryId } = useParams();
    return (
        <>
            <Helmet>
                <title> Edit Category | Minimal UI </title>
            </Helmet>

            <AddCategory edit categoryId={categoryId} />
        </>
    );
}
