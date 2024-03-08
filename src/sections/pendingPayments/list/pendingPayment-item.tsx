import { MouseEvent } from 'react';

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Iconify from 'src/components/iconify';

import { PendingPayment } from 'src/store/features/pendingPaymentSlice';
import { fCurrency } from 'src/utils/format-number';
import { fDate } from 'src/utils/format-time';

type PendingPaymentItemProps = {
    row: PendingPayment;
};

export default function PendingPaymentItem({ row }: PendingPaymentItemProps) {
    return (
        <>
            <Stack direction="row" justifyContent="space-between">
                <Stack>
                    <Typography variant="h5" component="div">
                        {row.customer?.name || 'No Customer Name'}
                    </Typography>
                    <Typography color="text.secondary">{row.customer?.phone}</Typography>
                </Stack>
                <Stack>
                    <Typography color="text.secondary">
                        Invoice: {fCurrency(row.invoiceBalance)}
                    </Typography>
                    <Typography color="text.secondary">
                        Previous: {fCurrency(row.previousBalance)}
                    </Typography>
                </Stack>
            </Stack>
            <Typography variant="body1">{row.customer?.email}</Typography>
            <Typography variant="body2">{row.customer?.address}</Typography>
            <Accordion sx={{ mt: 2 }}>
                <AccordionSummary
                    expandIcon={<Iconify icon="eva:arrow-ios-downward-outline" />}
                    aria-controls="panel1-content"
                    id={`panel-${row.customerId}-header`}
                    onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
                >
                    View Invoices
                </AccordionSummary>
                <AccordionDetails>
                    {row.invoices.map((invoice) => (
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            key={`invoice-item-${invoice._id}`}
                        >
                            <Typography variant="subtitle2">
                                <Typography component="span" variant="body1">
                                    Date
                                </Typography>
                                &nbsp;
                                {fDate(invoice.date)}
                            </Typography>
                            <Typography variant="subtitle2">
                                <Typography component="span" variant="body1">
                                    Total
                                </Typography>
                                &nbsp;
                                {fCurrency(invoice.total)}
                            </Typography>
                        </Stack>
                    ))}
                </AccordionDetails>
            </Accordion>
        </>
    );
}
