import { Order } from 'src/store/features/orderSlice';
import http from '../http-common';

const entityName = 'orders';

function getOrders(): Promise<Order[]> {
    return http.get(`/${entityName}`).then((response) => response.data);
}

function getOrder(id: string): Promise<Order> {
    return http.get(`/${entityName}/${id}`).then((response) => response.data);
}

function createOrder(data: any): Promise<Order> {
    return http.post(`/${entityName}`, data).then((response) => response.data);
}

type UpdateOrderResponse = {
    updated: Order | null;
};

function updateOrder(orderId: string, data: any): Promise<UpdateOrderResponse> {
    return http.put(`/${entityName}/${orderId}`, data).then((response) => response.data);
}

function deleteOrder(id: string) {
    return http.delete(`/${entityName}/${id}`).then((response) => response.data);
}

export default { getOrder, getOrders, createOrder, updateOrder, deleteOrder };
