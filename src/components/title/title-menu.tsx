import Button from '@mui/material/Button';

import { RouterLink } from 'src/routes/components';

import Iconify from 'src/components/iconify';

type TitleMenuProps = {
    label: string;
    to?: string;
};

export default function TitleMenu({ label, to }: TitleMenuProps) {
    return (
        <Button
            component={RouterLink}
            href={to}
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
        >
            {label}
        </Button>
    );
}
