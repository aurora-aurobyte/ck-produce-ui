import { useEffect, useState } from 'react';

import Container from 'src/components/container';
import Title, { TitleMenu } from 'src/components/title';

import invoiceService from 'src/http/services/invoiceService';
import { Invoice } from 'src/store/features/invoiceSlice';
import InvoiceCard from './invoice-card';

type ViewInvoiceType = {
    invoiceId: string;
};

export default function ViewInvoice({ invoiceId }: ViewInvoiceType) {
    const [invoice, setInvoice] = useState<Invoice | null>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        invoiceService.getInvoice(invoiceId).then((_invoice) => {
            setInvoice(_invoice);
            setLoading(false);
        });
    }, [invoiceId]);

    return (
        <Container>
            <Title title="View Invoice">
                <TitleMenu label="Edit Invoice" edit to={`/invoices/edit/${invoiceId}`} />
            </Title>
            <InvoiceCard invoice={invoice as Invoice} loading={loading} />
        </Container>
    );
}
