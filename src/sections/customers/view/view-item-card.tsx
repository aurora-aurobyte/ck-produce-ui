import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fToNow } from 'src/utils/format-time';
import Loader from 'src/components/loader/loader';
import { Customer } from 'src/store/features/customerSlice';

// ----------------------------------------------------------------------

type Props = {
    customer: Customer;
    loading: boolean;
};

export default function ViewItemCard({ customer, loading }: Props) {
    if (loading) return <Loader />;
    return (
        <Card>
            <Box sx={{ pt: '50%', position: 'relative' }}>
                <Box
                    component="img"
                    alt={customer.name}
                    src="/assets/images/view-item/customer.jpg"
                    sx={{
                        top: 0,
                        width: 1,
                        height: 1,
                        objectFit: 'cover',
                        position: 'absolute',
                    }}
                />
            </Box>

            <Stack spacing={2} sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    {customer.name}
                </Typography>
                <Typography mt={(theme) => `${theme.spacing(0)} !important`}>
                    {customer.businessName}
                </Typography>
                <Typography>Email: {customer.email}</Typography>
                <Typography>Phone: {customer.phone}</Typography>
                <Typography>Balance: {customer.balance}</Typography>
                <Typography color="caption">Created {fToNow(customer.createdAt)}</Typography>
                <Typography color="caption" mt={(theme) => `${theme.spacing(0)} !important`}>
                    Updated {fToNow(customer.updatedAt)}
                </Typography>
            </Stack>
        </Card>
    );
}

ViewItemCard.propTypes = {
    customer: PropTypes.object,
};
