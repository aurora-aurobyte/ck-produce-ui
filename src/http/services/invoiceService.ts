import { Invoice } from 'src/store/features/invoiceSlice';
import http from '../http-common';

const entityName = 'invoices';

function getInvoices(): Promise<Invoice[]> {
    return http.get(`/${entityName}`).then((response) => response.data);
}

function getInvoice(id: string): Promise<Invoice> {
    return http.get(`/${entityName}/${id}`).then((response) => response.data);
}

function createNewInvoice(data: {
    orderId: string;
    date: string;
    customerId: string;
    discount: number;
    paid: boolean;
    paymentDate: string;
    invoiceItems: [{ productId: string; quantity: number }];
}): Promise<Invoice> {
    return http.post(`/${entityName}/new`, data).then((response) => response.data);
}

function createOrderInvoice(data: { orderId: string; orderItemIds: string[] }): Promise<Invoice> {
    return http.post(`/${entityName}/order`, data).then((response) => response.data);
}

function updateInvoice(invoiceId: string, data: any) {
    return http.put(`/${entityName}/${invoiceId}`, data).then((response) => response.data);
}

function deleteInvoice(id: string) {
    return http.delete(`/${entityName}/${id}`).then((response) => response.data);
}

export default {
    getInvoice,
    getInvoices,
    createNewInvoice,
    createOrderInvoice,
    updateInvoice,
    deleteInvoice,
};
