import { useEffect, useState } from 'react';

import Container from 'src/components/container';
import Title, { TitleMenu } from 'src/components/title';

import orderService from 'src/http/services/orderService';
import { Order } from 'src/store/features/orderSlice';
import OrderCard from './order-card';

type ViewOrderType = {
    orderId: string;
};

export default function ViewOrder({ orderId }: ViewOrderType) {
    const [order, setOrder] = useState<Order | null>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        orderService.getOrder(orderId).then((_order) => {
            setOrder(_order);
            setLoading(false);
        });
    }, [orderId]);

    return (
        <Container>
            <Title title="View Order" removeOnPrint>
                <TitleMenu label="Edit Order" edit to={`/orders/edit/${orderId}`} />
            </Title>
            <OrderCard order={order as Order} loading={loading} />
        </Container>
    );
}
