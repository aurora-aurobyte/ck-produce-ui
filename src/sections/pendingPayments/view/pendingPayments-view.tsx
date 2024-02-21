import Container from 'src/components/container';
import Title from 'src/components/title';
import Table from 'src/components/table';

import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { PendingPayment, fetchPendingPayments } from 'src/store/features/pendingPaymentSlice';
import { useEffect } from 'react';

export default function ViewPendingPayments() {
    const pendingPayments = useAppSelector((state) => state.pendingPayment.pendingPayments);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchPendingPayments());
    }, [dispatch]);

    return (
        <Container>
            <Title title="Pending Payments" />
            <Table<PendingPayment>
                data={pendingPayments}
                columns={[
                    { id: 'customerName', label: 'Name' },
                    { id: 'previousBalance', label: 'Previous Balance' },
                    { id: 'invoiceBalance', label: 'Invoice Balance' },
                ]}
            />
        </Container>
    );
}
