import { Product } from 'src/store/features/productSlice';
import http from '../http-common';

const entityName = 'products';

function getProducts(): Promise<Product[]> {
    return http.get(`/${entityName}`).then((response) => response.data);
}

function getProduct(id: string): Promise<Product> {
    return http.get(`/${entityName}/${id}`).then((response) => response.data);
}

function createProduct(data: any): Promise<Product> {
    return http.post(`/${entityName}`, data).then((response) => response.data);
}

function updateProduct(productId: string, data: any) {
    return http.put(`/${entityName}/${productId}`, data).then((response) => response.data);
}

function deleteProduct(id: string) {
    return http.delete(`/${entityName}/${id}`).then((response) => response.data);
}

export default { getProduct, getProducts, createProduct, updateProduct, deleteProduct };
