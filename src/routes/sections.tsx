import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));

export const CustomersViewPage = lazy(() => import('src/pages/customers'));
export const CustomersAddPage = lazy(() => import('src/pages/customers-add'));
export const CustomersEditPage = lazy(() => import('src/pages/customers-edit'));

export const ProductsPage = lazy(() => import('src/pages/products'));
export const ProductsAddPage = lazy(() => import('src/pages/products-add'));
export const ProductsEditPage = lazy(() => import('src/pages/products-edit'));

export const LoginPage = lazy(() => import('src/pages/login'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
    const routes = useRoutes([
        {
            element: (
                <DashboardLayout>
                    <Suspense>
                        <Outlet />
                    </Suspense>
                </DashboardLayout>
            ),
            children: [
                { element: <IndexPage />, index: true },
                {
                    path: 'customers',
                    children: [
                        { element: <CustomersViewPage />, index: true },
                        { path: 'add', element: <CustomersAddPage /> },
                        { path: 'edit/:customerId', element: <CustomersEditPage /> },
                    ],
                },
                { path: 'user', element: <UserPage /> },
                {
                    path: 'products',
                    children: [
                        { element: <ProductsPage />, index: true },
                        { path: 'add', element: <ProductsAddPage /> },
                        { path: 'edit/:productId', element: <ProductsEditPage /> },
                    ],
                },
                { path: 'blog', element: <BlogPage /> },
            ],
        },
        {
            path: 'login',
            element: <LoginPage />,
        },
        {
            path: '404',
            element: <Page404 />,
        },
        {
            path: '*',
            element: <Navigate to="/404" replace />,
        },
    ]);

    return routes;
}
