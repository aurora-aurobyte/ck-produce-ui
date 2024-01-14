import Container from 'src/components/container';
import Title, { TitleMenu } from 'src/components/title';
import Table from 'src/components/table';

import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { Customer, fetchCustomers } from 'src/store/features/customerSlice';
import { useEffect } from 'react';

export default function ViewCustomers() {
    const customers = useAppSelector((state) => state.customer.customers);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchCustomers());
    }, [dispatch]);

    return (
        <Container>
            <Title title="Customers">
                <TitleMenu label="New customer" to="/customers/add" />
            </Title>
            <Table<Customer>
                data={customers}
                columns={[
                    { id: 'name', label: 'Name' },
                    { id: 'address', label: 'Address' },
                ]}
            />
        </Container>
    );
}