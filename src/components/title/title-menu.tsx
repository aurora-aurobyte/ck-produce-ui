import Button from '@mui/material/Button';

import { RouterLink } from 'src/routes/components';

import Iconify from 'src/components/iconify';

type TitleMenuProps = {
    label: string;
    to?: string;
    edit?: boolean;
};

export default function TitleMenu({ label, to, edit }: TitleMenuProps) {
    return (
        <Button
            component={RouterLink}
            href={to}
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon={edit ? 'eva:edit-outline' : 'eva:plus-fill'} />}
        >
            {label}
        </Button>
    );
}
