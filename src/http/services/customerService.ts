import { Customer } from 'src/store/features/customerSlice';
import http from '../http-common';

const entityName = 'customers';

function getCustomers(): Promise<Customer[]> {
    return http.get(`/${entityName}`).then((response) => response.data);
}

function getCustomer(id: string): Promise<Customer> {
    return http.get(`/${entityName}/${id}`).then((response) => response.data);
}

function createCustomer(data: any): Promise<Customer> {
    return http.post(`/${entityName}`, data).then((response) => response.data);
}

function updateCustomer(customerId: string, data: any) {
    return http.put(`/${entityName}/${customerId}`, data).then((response) => response.data);
}

function deleteCustomer(id: string) {
    return http.delete(`/${entityName}/${id}`).then((response) => response.data);
}

export default { getCustomer, getCustomers, createCustomer, updateCustomer, deleteCustomer };
