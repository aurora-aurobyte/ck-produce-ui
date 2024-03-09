import { Helmet } from 'react-helmet-async';
import HeaderConfig from 'src/layouts/dashboard/header-config';

import { Profile } from 'src/sections/account';

// ----------------------------------------------------------------------

export default function ProfilePage() {
    return (
        <>
            <Helmet>
                <title> Profile | Minimal UI </title>
            </Helmet>
            <HeaderConfig title="Profile" backUrl="/" />

            <Profile />
        </>
    );
}
