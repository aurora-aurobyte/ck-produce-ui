import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from 'src/components/container';
import Title, { TitleMenu } from 'src/components/title';
import customerService from 'src/http/services/customerService';
import { Customer } from 'src/store/features/customerSlice';
import CustomerItemCard from './view-item-card';

type ViewCustomerType = {
    customerId?: string;
};

export default function ViewCustomer({ customerId }: ViewCustomerType) {
    const [customer, setCustomer] = useState<Customer | null>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        customerService.getCustomer(customerId as string).then((_customer) => {
            setCustomer(_customer);
            setIsLoading(false);
        });
    }, [customerId]);

    return (
        <Container>
            <Title title="View Customer">
                <TitleMenu label="Edit Customer" edit to={`/customers/edit/${customerId}`} />
            </Title>
            <Box>
                <CustomerItemCard customer={customer as Customer} loading={isLoading} />
            </Box>
        </Container>
    );
}
