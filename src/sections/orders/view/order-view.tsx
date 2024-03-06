import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import Container from 'src/components/container';
import Title, { TitleMenu } from 'src/components/title';
import Table from 'src/components/table';

import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { Order, fetchOrders, removeOrder } from 'src/store/features/orderSlice';
import { useEffect } from 'react';
import { fDate, fToNow } from 'src/utils/format-time';
import orderService from 'src/http/services/orderService';

export default function ViewOrders() {
    const orders = useAppSelector((state) => state.order.orders);
    const dispatch = useAppDispatch();

    const handleDeleteClick = async (order: Order) => {
        await orderService.deleteOrder(order._id);
        dispatch(removeOrder(order._id));
    };

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    return (
        <Container>
            <Title title="Orders">
                <TitleMenu label="New Order" to="/orders/add" />
            </Title>
            <Table<Order>
                data={orders}
                columns={[
                    { id: 'customerName', label: 'Customer' },
                    { id: 'date', label: 'Date', render: (row: Order) => fDate(row.date) },
                ]}
                editPage={(row: Order) => `/orders/edit/${row._id}`}
                onRemoveClick={handleDeleteClick}
                renderRow={(row) => (
                    <>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="h5" component="div">
                                {row.customer?.name || 'No Customer Name'}
                            </Typography>
                            <Typography color="text.secondary">
                                {row.orderItems.length} Items
                            </Typography>
                        </Stack>
                        <Typography variant="body2">{fDate(row.date)}</Typography>
                        <Typography color="text.secondary" fontSize={12} mt={1}>
                            Created {fToNow(row.createdAt)}
                        </Typography>
                    </>
                )}
            />
        </Container>
    );
}
