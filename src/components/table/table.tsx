import { ChangeEvent, MouseEvent, useState } from 'react';

import Card from '@mui/material/Card';
import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Scrollbar from 'src/components/scrollbar';

import TableNoData from './table-no-data';
import TableRow from './table-row';
import TableHead from './table-head';
import TableEmptyRows from './table-empty-rows';
import TableToolbar from './table-toolbar';
import { emptyRows, applyFilter, getComparator } from './utils';
import { TableColumn } from './tableColumn';

// ----------------------------------------------------------------------

interface TableProps<T> {
    data: T[];
    columns: TableColumn<T>[];
    editPage?: (row: T) => string;
    onRemoveClick?: (row: T) => any;
    // renderRow?: (
    //     row: T,
    //     selected: boolean,
    //     handleClick: (event: ChangeEvent) => void
    // ) => React.ReactNode;
}

export default function Table<T>({ data, columns, editPage, onRemoveClick }: TableProps<T>) {
    const [page, setPage] = useState(0);

    const [order, setOrder] = useState<'asc' | 'desc'>('asc');

    const [selected, setSelected] = useState<number[]>([]);

    const [orderBy, setOrderBy] = useState<string>('');

    const [filterName, setFilterName] = useState<string>('');

    const [rowsPerPage, setRowsPerPage] = useState<number>(5);

    const handleSort = (_event: MouseEvent<unknown>, id: string) => {
        const isAsc = orderBy === id && order === 'asc';
        if (id !== '') {
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(id);
        }
    };

    const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = data.map((_, id) => id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (_event: ChangeEvent<unknown>, index: number) => {
        const selectedIndex = selected.indexOf(index);
        let newSelected: number[] = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, index);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleFilterByName = (event: ChangeEvent<HTMLInputElement>) => {
        setPage(0);
        setFilterName(event.target.value);
    };

    const dataFiltered: T[] = applyFilter({
        inputData: data,
        comparator: getComparator(order, orderBy),
        filterName,
    });

    const notFound = !dataFiltered.length && !!filterName;

    return (
        <Card>
            <TableToolbar
                numSelected={selected.length}
                filterName={filterName}
                onFilterName={handleFilterByName}
            />

            <Scrollbar>
                <TableContainer sx={{ overflow: 'unset' }}>
                    <MuiTable>
                        <TableHead
                            order={order}
                            orderBy={orderBy}
                            rowCount={data.length}
                            numSelected={selected.length}
                            onRequestSort={handleSort}
                            onSelectAllClick={handleSelectAllClick}
                            headLabel={[...columns, { id: '' }]}
                        />
                        <TableBody>
                            {dataFiltered
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row: T, index: number) => (
                                    <TableRow
                                        key={index}
                                        // @ts-ignore
                                        row={row}
                                        selected={selected.includes(index)}
                                        handleClick={(event: ChangeEvent) =>
                                            handleClick(event, index)
                                        }
                                        columns={columns}
                                        editPage={editPage}
                                        onRemoveClick={onRemoveClick}
                                        rowIndex={index}
                                    />
                                ))}

                            <TableEmptyRows
                                height={77}
                                emptyRows={emptyRows(page, rowsPerPage, data.length)}
                            />

                            {notFound && <TableNoData query={filterName} />}
                        </TableBody>
                    </MuiTable>
                </TableContainer>
            </Scrollbar>

            <TablePagination
                page={page}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[5, 10, 25]}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Card>
    );
}
