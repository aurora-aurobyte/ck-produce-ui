import Container from 'src/components/container';
import Title from 'src/components/title';
import Table from 'src/components/table';

import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { PendingPayment, fetchPendingPayments } from 'src/store/features/pendingPaymentSlice';
import { useEffect } from 'react';
import PendingPaymentItem from './pendingPayment-item';

export default function ListPendingPayments() {
    const { pendingPayments, loading } = useAppSelector((state) => state.pendingPayment);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchPendingPayments());
    }, [dispatch]);

    return (
        <Container>
            <Title title="Pending Payments" />
            <Table<PendingPayment>
                data={pendingPayments}
                loading={loading}
                columns={[
                    { id: 'customerName', label: 'Name' },
                    { id: 'previousBalance', label: 'Previous Balance' },
                    { id: 'invoiceBalance', label: 'Invoice Balance' },
                ]}
                renderRow={(row) => <PendingPaymentItem row={row} />}
            />
        </Container>
    );
}
