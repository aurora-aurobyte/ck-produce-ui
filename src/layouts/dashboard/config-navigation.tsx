import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
    <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
    {
        title: 'home',
        path: '/',
        icon: icon('ic_analytics'),
    },
    // {
    //     title: 'user',
    //     path: '/user',
    //     icon: icon('ic_user'),
    // },
    {
        title: 'product',
        path: '/products',
        icon: icon('ic_products'),
    },
    {
        title: 'category',
        path: '/categories',
        icon: icon('ic_category'),
    },
    {
        title: 'customer',
        path: '/customers',
        icon: icon('ic_user'),
    },
    {
        title: 'order',
        path: '/orders',
        icon: icon('ic_order'),
    },
    {
        title: 'invoice',
        path: '/invoices',
        icon: icon('ic_invoice'),
    },
    {
        title: 'purchase',
        path: '/purchases',
        icon: icon('ic_purchase'),
    },
    {
        title: 'to buy',
        path: '/toBuy',
        icon: icon('ic_buy'),
    },
    {
        title: 'pending payment',
        path: '/pendingPayments',
        icon: icon('ic_payment'),
    },
    // {
    //     title: 'blog',
    //     path: '/blog',
    //     icon: icon('ic_blog'),
    // },
    // {
    //     title: 'login',
    //     path: '/login',
    //     icon: icon('ic_lock'),
    // },
    // {
    //     title: 'Not found',
    //     path: '/404',
    //     icon: icon('ic_disabled'),
    // },
];

const bottomNavConfig = [
    {
        title: 'home',
        path: '/',
        icon: icon('ic_analytics'),
    },
    {
        title: 'order',
        path: '/orders',
        icon: icon('ic_order'),
    },
    {
        title: 'invoice',
        path: '/invoices',
        icon: icon('ic_invoice'),
    },
    {
        title: 'to buy',
        path: '/toBuy',
        icon: icon('ic_buy'),
    },
];

export default navConfig;
export { bottomNavConfig };
