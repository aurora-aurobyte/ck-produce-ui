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

export const OrdersPage = lazy(() => import('src/pages/orders'));
export const OrdersAddPage = lazy(() => import('src/pages/orders-add'));
export const OrdersEditPage = lazy(() => import('src/pages/orders-edit'));

export const InvoicesPage = lazy(() => import('src/pages/invoices'));
export const InvoicesAddPage = lazy(() => import('src/pages/invoices-add'));
export const InvoicesEditPage = lazy(() => import('src/pages/invoices-edit'));

export const LoginPage = lazy(() => import('src/pages/login'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

export const CategoryPage = lazy(() => import('src/pages/categories'));
export const CategoriesAddPage = lazy(() => import('src/pages/categories-add'));
export const CategoriesEditPage = lazy(() => import('src/pages/categories-edit'));

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
                {
                    path: 'orders',
                    children: [
                        { element: <OrdersPage />, index: true },
                        { path: 'add', element: <OrdersAddPage /> },
                        { path: 'edit/:orderId', element: <OrdersEditPage /> },
                    ],
                },
                {
                    path: 'invoices',
                    children: [
                        { element: <InvoicesPage />, index: true },
                        { path: 'add', element: <InvoicesAddPage /> },
                        { path: 'edit/:invoiceId', element: <InvoicesEditPage /> },
                    ],
                },
                { path: 'blog', element: <BlogPage /> },
                {
                    path: 'categories',
                    children: [
                        { element: <CategoryPage />, index: true },
                        { path: 'add', element: <CategoriesAddPage /> },
                        { path: 'edit/:categoryId', element: <CategoriesEditPage /> },
                    ],
                },
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
