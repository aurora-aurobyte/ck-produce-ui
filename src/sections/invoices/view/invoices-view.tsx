import Container from 'src/components/container';
import Title, { TitleMenu } from 'src/components/title';
import Table from 'src/components/table';

import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { Invoice, fetchInvoices, removeInvoice } from 'src/store/features/invoiceSlice';
import { useEffect } from 'react';
import { fDate } from 'src/utils/format-time';
import { Chip } from '@mui/material';

export default function ViewInvoices() {
    const invoices = useAppSelector((state) => state.invoice.invoices);
    const dispatch = useAppDispatch();

    const handleDeleteClick = (product: Invoice) => {
        dispatch(removeInvoice(product.invoiceId));
    };

    useEffect(() => {
        dispatch(fetchInvoices());
    }, [dispatch]);

    return (
        <Container>
            <Title title="Invoices">
                <TitleMenu label="New Invoice" to="/invoices/add" />
            </Title>
            <Table<Invoice>
                data={invoices}
                columns={[
                    { id: 'customerName', label: 'Customer' },
                    { id: 'date', label: 'Date', render: (row: Invoice) => fDate(row.date) },
                    {
                        id: 'paid',
                        label: 'Status',
                        render: (row: Invoice) => (
                            <>
                                {row.paid ? <Chip  label="Pending" color="error" />:
                                <Chip sx={{width:"71.71px"}} label="Paid" color="success" />}
                            </>
                        ),
                    },
                ]}
                editPage={(row: Invoice) => `/invoices/edit/${row.invoiceId}`}
                onRemoveClick={handleDeleteClick}
            />
        </Container>
    );
}
