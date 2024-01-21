import React from 'react';

export interface TableColumn<T> {
    id: string;
    label: string;
    align?: 'left' | 'center' | 'right';
    render?: (row: T, id: number) => React.ReactNode;
}
