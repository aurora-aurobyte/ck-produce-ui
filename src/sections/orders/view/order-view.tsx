import Container from 'src/components/container';
import Title, { TitleMenu } from 'src/components/title';
import Table from 'src/components/table';

import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { Order, fetchOrders, removeOrder } from 'src/store/features/orderSlice';
import { useEffect } from 'react';
import { fDate } from 'src/utils/format-time';

export default function ViewOrders() {
    const orders = useAppSelector((state) => state.order.orders);
    const dispatch = useAppDispatch();

    const handleDeleteClick = (product: Order) => {
        dispatch(removeOrder(product.orderId));
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
                editPage={(row: Order) => `/orders/edit/${row.orderId}`}
                onRemoveClick={handleDeleteClick}
            />
        </Container>
    );
}
