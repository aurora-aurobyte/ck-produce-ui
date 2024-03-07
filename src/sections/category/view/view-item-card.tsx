import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fToNow } from 'src/utils/format-time';
import { Category } from 'src/store/features/categorySlice';
import Loader from 'src/components/loader/loader';

// ----------------------------------------------------------------------

type Props = {
    category: Category;
    loading: boolean;
};

export default function ViewItemCard({ category, loading }: Props) {
    if (loading) return <Loader />;
    return (
        <Card>
            <Box sx={{ pt: '50%', position: 'relative' }}>
                <Box
                    component="img"
                    alt={category.name}
                    src="/assets/images/view-item/category.jpg"
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
                    {category.name}
                </Typography>
                <Typography color="caption">Created {fToNow(category.createdAt)}</Typography>
                <Typography color="caption">Updated {fToNow(category.updatedAt)}</Typography>
            </Stack>
        </Card>
    );
}

ViewItemCard.propTypes = {
    category: PropTypes.object,
};
