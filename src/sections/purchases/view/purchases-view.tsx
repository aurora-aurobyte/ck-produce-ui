import Container from 'src/components/container';
import Title, { TitleMenu } from 'src/components/title';
import Table from 'src/components/table';

import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { Purchase, fetchPurchases, removePurchase } from 'src/store/features/purchaseSlice';
import { useEffect } from 'react';
import { fDate } from 'src/utils/format-time';

export default function ViewPurchases() {
    const purchases = useAppSelector((state) => state.purchase.purchases);
    const dispatch = useAppDispatch();

    const handleDeleteClick = (product: Purchase) => {
        dispatch(removePurchase(product.purchaseId));
    };

    useEffect(() => {
        dispatch(fetchPurchases());
    }, [dispatch]);

    return (
        <Container>
            <Title title="Purchases">
                <TitleMenu label="New Purchase" to="/purchases/add" />
            </Title>
            <Table<Purchase>
                data={purchases}
                columns={[
                    { id: 'sellerName', label: 'Seller' },
                    { id: 'date', label: 'Date', render: (row: Purchase) => fDate(row.date) },
                ]}
                editPage={(row: Purchase) => `/purchases/edit/${row.purchaseId}`}
                onRemoveClick={handleDeleteClick}
            />
        </Container>
    );
}
