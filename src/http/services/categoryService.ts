import { Category } from 'src/store/features/categorySlice';
import http from '../http-common';

const entityName = 'categories';

function getCategories(): Promise<Category[]> {
    return http.get(`/${entityName}`).then((response) => response.data);
}

function getCategory(id: string): Promise<Category> {
    return http.get(`/${entityName}/${id}`).then((response) => response.data);
}

function createCategory(data: any): Promise<Category> {
    return http.post(`/${entityName}`, data).then((response) => response.data);
}

function updateCategory(categoryId: string, data: any) {
    return http.put(`/${entityName}/${categoryId}`, data).then((response) => response.data);
}

function deleteCategory(id: string) {
    return http.delete(`/${entityName}/${id}`).then((response) => response.data);
}

export default { getCategory, getCategories, createCategory, updateCategory, deleteCategory };
