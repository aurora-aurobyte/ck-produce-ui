import Container from 'src/components/container';
import Title from 'src/components/title';
import Table from 'src/components/table';

import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { ToBuy, fetchToBuys } from 'src/store/features/toBuySlice';
import { useEffect } from 'react';

export default function ViewToBuys() {
    const toBuys = useAppSelector((state) => state.toBuy.toBuys);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchToBuys());
    }, [dispatch]);

    return (
        <Container>
            <Title title="Items to buy" />
            <Table<ToBuy>
                data={toBuys}
                columns={[
                    { id: 'productName', label: 'Name' },
                    { id: 'quantity', label: 'Quantity' },
                ]}
            />
        </Container>
    );
}
