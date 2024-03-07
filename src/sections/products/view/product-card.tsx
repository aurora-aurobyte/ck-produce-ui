import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fCurrency } from 'src/utils/format-number';

import Label from 'src/components/label';
import { Product } from 'src/store/features/productSlice';
import Loader from 'src/components/loader/loader';
import { fToNow } from 'src/utils/format-time';

// ----------------------------------------------------------------------

type Props = {
    product: Product;
    loading: boolean;
};

export default function ShopProductCard({ product, loading }: Props) {
    if (loading) return <Loader />;
    const renderStatus = (
        <Label
            variant="filled"
            color={(product.tax > 0 && 'error') || 'info'}
            sx={{
                zIndex: 9,
                top: 16,
                right: 16,
                position: 'absolute',
                textTransform: 'uppercase',
            }}
        >
            {product.tax} %
        </Label>
    );

    const renderPrice = (
        <Typography variant="subtitle1">
            <Typography component="span" variant="body1">
                Unit Price
            </Typography>
            &nbsp;
            {fCurrency(product.unitPrice)}
        </Typography>
    );

    return (
        <Card>
            <Box sx={{ pt: '50%', position: 'relative' }}>
                {product.tax && renderStatus}

                <Box
                    component="img"
                    alt={product.name}
                    src="/assets/images/view-item/product.jpg"
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
                    {product.name}
                </Typography>

                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    {renderPrice}
                </Stack>

                <Typography color="caption">Created {fToNow(product.createdAt)}</Typography>
                <Typography color="caption" mt={(theme) => `${theme.spacing(0)} !important`}>
                    Updated {fToNow(product.updatedAt)}
                </Typography>
            </Stack>
        </Card>
    );
}

ShopProductCard.propTypes = {
    product: PropTypes.object,
};
