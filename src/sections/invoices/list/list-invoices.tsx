import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

import Container from 'src/components/container';
import Title, { TitleMenu } from 'src/components/title';
import Table from 'src/components/table';

import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { Invoice, fetchInvoices, removeInvoice } from 'src/store/features/invoiceSlice';
import { useEffect } from 'react';
import { fDate, fToNow } from 'src/utils/format-time';
import invoiceService from 'src/http/services/invoiceService';

export default function ListInvoices() {
    const { loading, invoices } = useAppSelector((state) => state.invoice);
    const dispatch = useAppDispatch();

    const handleDeleteClick = async (invoice: Invoice) => {
        await invoiceService.deleteInvoice(invoice._id);
        dispatch(removeInvoice(invoice._id));
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
                loading={loading}
                columns={[
                    { id: 'customerName', label: 'Customer' },
                    { id: 'date', label: 'Date', render: (row: Invoice) => fDate(row.date) },
                    {
                        id: 'paid',
                        label: 'Status',
                        render: (row: Invoice) => (
                            <>
                                {row.paid ? (
                                    <Chip sx={{ width: '71.71px' }} label="Paid" color="success" />
                                ) : (
                                    <Chip label="Pending" color="error" />
                                )}
                            </>
                        ),
                    },
                    { id: 'total', label: 'Total ($)' },
                ]}
                editPage={(row: Invoice) => `/invoices/edit/${row._id}`}
                onRemoveClick={handleDeleteClick}
                renderRow={(row) => (
                    <>
                        <Stack direction="row" justifyContent="space-between">
                            <Stack>
                                <Typography variant="h5" component="div">
                                    {row.customer?.name || 'No Customer Name'}
                                </Typography>
                                <Typography variant="body2">{fDate(row.date)}</Typography>
                                <Typography variant="body2">Total: ${row.total}</Typography>
                            </Stack>
                            <Stack>
                                <Typography color="text.secondary">
                                    {row.invoiceItems.length} Items
                                </Typography>
                                {row.paid ? (
                                    <Chip sx={{ width: '71.71px' }} label="Paid" color="success" />
                                ) : (
                                    <Chip label="Not Paid" color="error" />
                                )}
                            </Stack>
                        </Stack>
                        <Typography color="text.secondary" fontSize={12} mt={1}>
                            Created {fToNow(row.createdAt)}
                        </Typography>
                    </>
                )}
            />
        </Container>
    );
}
