import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import Container from 'src/components/container';
import Title, { TitleMenu } from 'src/components/title';
import Table from 'src/components/table';

import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { Customer, fetchCustomers, removeCustomer } from 'src/store/features/customerSlice';
import { useEffect } from 'react';
import customerService from 'src/http/services/customerService';
import { fToNow } from 'src/utils/format-time';

export default function ListCustomers() {
    const customers = useAppSelector((state) => state.customer.customers);
    const dispatch = useAppDispatch();

    const handleDeleteClick = async (customer: Customer) => {
        await customerService.deleteCustomer(customer._id);
        dispatch(removeCustomer(customer._id));
    };

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
                editPage={(row: Customer) => `/customers/edit/${row._id}`}
                onRemoveClick={handleDeleteClick}
                renderRow={(row) => (
                    <>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="h5" component="div">
                                {row.name}
                            </Typography>
                            <Typography color="text.secondary">{row.phone}</Typography>
                        </Stack>
                        <Typography variant="body1">{row.email}</Typography>
                        <Typography variant="body2">{row.address}</Typography>
                        <Typography color="text.secondary" fontSize={12} mt={1}>
                            Created {fToNow(row.createdAt)}
                        </Typography>
                    </>
                )}
            />
        </Container>
    );
}
