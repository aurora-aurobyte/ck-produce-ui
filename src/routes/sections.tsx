import { lazy, Suspense, useEffect } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';
import { verifyUser } from 'src/store/features/authSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));

export const CustomersViewPage = lazy(() => import('src/pages/customers'));
export const CustomersAddPage = lazy(() => import('src/pages/customers-add'));
export const CustomersEditPage = lazy(() => import('src/pages/customers-edit'));

export const ListProductsPage = lazy(() => import('src/pages/products/list-products-page'));
export const ViewProductPage = lazy(() => import('src/pages/products/view-product-page'));
export const AddProductPage = lazy(() => import('src/pages/products/add-product-page'));
export const EditProductPage = lazy(() => import('src/pages/products/edit-product-page'));

export const ListOrdersPage = lazy(() => import('src/pages/orders/list-orders-page'));
export const ViewOrderPage = lazy(() => import('src/pages/orders/view-order-page'));
export const AddOrderPage = lazy(() => import('src/pages/orders/add-order-page'));
export const EditOrderPage = lazy(() => import('src/pages/orders/edit-order-page'));

export const InvoicesPage = lazy(() => import('src/pages/invoices'));
export const InvoicesAddPage = lazy(() => import('src/pages/invoices-add'));
export const InvoicesEditPage = lazy(() => import('src/pages/invoices-edit'));

export const PurchasesPage = lazy(() => import('src/pages/purchases'));
export const PurchasesAddPage = lazy(() => import('src/pages/purchases-add'));
export const PurchasesEditPage = lazy(() => import('src/pages/purchases-edit'));

export const ToBuysPage = lazy(() => import('src/pages/toBuys'));

export const PendingPaymentsPage = lazy(() => import('src/pages/pendingPayments'));

export const LoginPage = lazy(() => import('src/pages/login'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

export const ListCategoriesPage = lazy(() => import('src/pages/categories/list-categories-page'));
export const ViewCategoryPage = lazy(() => import('src/pages/categories/view-category-page'));
export const AddCategoryPage = lazy(() => import('src/pages/categories/add-category-page'));
export const EditCategoryPage = lazy(() => import('src/pages/categories/edit-category-page'));

// ----------------------------------------------------------------------

export default function Router() {
    const { isAuthenticated, loading } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(verifyUser());
    }, [dispatch]);

    const loadingComponent = <Suspense />;
    const publicRoutes = [
        {
            path: 'login',
            element: <LoginPage />,
        },
        {
            path: '*',
            element: <Navigate to="/login" />,
        },
    ];
    const privateRoutes = [
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
                        { element: <ListProductsPage />, index: true },
                        { path: 'view/:productId', element: <ViewProductPage /> },
                        { path: 'add', element: <AddProductPage /> },
                        { path: 'edit/:productId', element: <EditProductPage /> },
                    ],
                },
                {
                    path: 'orders',
                    children: [
                        { element: <ListOrdersPage />, index: true },
                        { path: 'view/:orderId', element: <ViewOrderPage /> },
                        { path: 'add', element: <AddOrderPage /> },
                        { path: 'edit/:orderId', element: <EditOrderPage /> },
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
                {
                    path: 'purchases',
                    children: [
                        { element: <PurchasesPage />, index: true },
                        { path: 'add', element: <PurchasesAddPage /> },
                        { path: 'edit/:purchaseId', element: <PurchasesEditPage /> },
                    ],
                },
                {
                    path: 'toBuy',
                    children: [{ element: <ToBuysPage />, index: true }],
                },
                {
                    path: 'pendingPayments',
                    children: [{ element: <PendingPaymentsPage />, index: true }],
                },
                { path: 'blog', element: <BlogPage /> },
                {
                    path: 'categories',
                    children: [
                        { element: <ListCategoriesPage />, index: true },
                        { path: 'view/:categoryId', element: <ViewCategoryPage /> },
                        { path: 'add', element: <AddCategoryPage /> },
                        { path: 'edit/:categoryId', element: <EditCategoryPage /> },
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
    ];
    const routes = useRoutes(isAuthenticated ? privateRoutes : publicRoutes);

    if (loading) {
        return loadingComponent;
    }
    return routes;
}
