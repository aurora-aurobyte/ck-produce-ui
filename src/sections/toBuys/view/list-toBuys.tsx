import { useState, useEffect, ChangeEvent } from 'react';

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';

import Container from 'src/components/container';
import Title from 'src/components/title';
import Table from 'src/components/table';

import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { ToBuy, fetchToBuys } from 'src/store/features/toBuySlice';
import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

export default function ListToBuys() {
    const [date, setDate] = useState(fDate(new Date().toString(), 'yyyy-MM-dd'));
    const { loading, toBuys } = useAppSelector((state) => state.toBuy);
    const dispatch = useAppDispatch();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
    };

    useEffect(() => {
        dispatch(fetchToBuys(date));
    }, [dispatch, date]);

    return (
        <Container>
            <Title title="Items to buy" />
            <Card sx={{ mb: 2, p: 2 }}>
                <TextField
                    id="date"
                    name="date"
                    label="Order Date"
                    variant="standard"
                    type="date"
                    value={date}
                    onChange={handleChange}
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    helperText="Select the date to display"
                />
            </Card>
            <Table<ToBuy>
                data={toBuys}
                loading={loading}
                columns={[
                    { id: 'productName', label: 'Name' },
                    { id: 'quantity', label: 'Quantity' },
                ]}
                renderRow={(row) => (
                    <>
                        <Stack direction="row" justifyContent="space-between">
                            <Stack>
                                <Typography variant="h5" component="div">
                                    {row.product?.name}
                                </Typography>
                                <Typography variant="body2">
                                    {row.product?.category?.name}
                                </Typography>
                            </Stack>
                            <Stack>
                                <Typography color="text.secondary">
                                    Quantity: {row.quantity}
                                </Typography>
                                <Typography color="text.secondary">Orders: {row.orders}</Typography>
                            </Stack>
                        </Stack>
                        <Typography color="text.secondary" fontSize={12} mt={1}>
                            Price: {fCurrency(row.product?.unitPrice || 0)}
                        </Typography>
                    </>
                )}
            />
        </Container>
    );
}
