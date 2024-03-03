import { ChangeEvent, useState, useEffect, useMemo, Dispatch, SetStateAction } from 'react';

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';
import { Product, fetchProducts } from 'src/store/features/productSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

// ----------------------------------------------------------------

interface FormColumns {
    showUnitPrice: boolean;
    showPurchasePrice: boolean;
    showTax: boolean;
}

interface ColumnLabels {
    unitPrice: string;
    purchasePrice: string;
    quantity: string;
    tax: string;
}

interface FormItem {
    productId: string;
    productName: string;
    purchasePrice?: number;
    unitPrice?: number;
    tax?: number;
    category: string;
    quantity: number;
}

const defaultFormItem = {
    productId: '',
    productName: '',
    purchasePrice: 0,
    unitPrice: 0,
    tax: 0,
    category: '',
    quantity: 1,
};

interface Form {
    subTotal: number;
    discount: number;
    total: number;
    invoiceItems: FormItem[];
}

type ProductsFormProps = {
    formItems: FormItem[];
    setFormItems: Dispatch<SetStateAction<FormItem[]>>;
    formMetadata: Form;
    setFormMetadata: Dispatch<SetStateAction<Form>>;
    columnLabels?: ColumnLabels;
    formColumns?: FormColumns;
};

export default function ProductsForm({
    formItems,
    setFormItems,
    formMetadata,
    setFormMetadata,
    columnLabels,
    formColumns: { showUnitPrice = true, showPurchasePrice = true, showTax = true } = {
        showUnitPrice: true,
        showPurchasePrice: true,
        showTax: true,
    },
}: ProductsFormProps) {
    const products = useAppSelector((state) => state.product.products);

    const [formInputValues, setFormValues] = useState<FormItem>(defaultFormItem);

    const dispatch = useAppDispatch();

    const handleInvoiceChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormMetadata({ ...formMetadata, [event.target.name]: event.target.value });
    };

    const handleFormInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormValues((_invoiceItemsValues: FormItem) => {
            const { name, value } = event.target;
            const duplicatedInvoiceItems = { ..._invoiceItemsValues, [name]: value };
            if (name === 'productId') {
                duplicatedInvoiceItems.unitPrice =
                    products.find((product) => product.productId === value)?.unitPrice || 0;
            }
            return duplicatedInvoiceItems;
        });
    };

    const handleRemoveItem = (productId: string) => {
        setFormItems((_invoiceItems: FormItem[]) =>
            _invoiceItems.filter((item: FormItem) => item.productId !== productId)
        );
    };

    const handleProductsFormItem = () => {
        if (formInputValues.productId && formInputValues.quantity) {
            setFormItems((_invoiceItems: FormItem[]) => [
                ..._invoiceItems,
                {
                    productId: formInputValues.productId,
                    productName: products.find(
                        (product) => product.productId === formInputValues.productId
                    )?.name as string,
                    purchasePrice: formInputValues.purchasePrice,
                    unitPrice: formInputValues.unitPrice,
                    tax: formInputValues.tax,
                    category: formInputValues.category,
                    quantity: formInputValues.quantity,
                },
            ]);
            setFormValues(defaultFormItem);
        }
    };

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        setFormMetadata((_invoiceItems) => ({
            ..._invoiceItems,
            total: _invoiceItems.subTotal - _invoiceItems.discount,
        }));
    }, [formMetadata.discount, setFormMetadata]);

    useEffect(() => {
        setFormMetadata((_invoiceValues) => {
            const subTotal = formItems.reduce(
                (acc, item) => acc + (item.unitPrice ?? 0) * item.quantity,
                0
            );
            return {
                ..._invoiceValues,
                subTotal,
                total: subTotal - _invoiceValues.discount,
            };
        });
    }, [formItems, setFormMetadata]);

    const filteredProducts = useMemo(
        () =>
            products.filter(
                (product: Product) =>
                    formItems.findIndex(
                        (formItem: FormItem) => product.productId === formItem.productId
                    ) === -1
            ),
        [formItems, products]
    );

    return (
        <TableContainer sx={{ mt: 2 }}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ pl: 0 }}>Product</TableCell>
                        {showPurchasePrice && (
                            <TableCell align="right">
                                {columnLabels?.purchasePrice || 'Purchase Price'}
                            </TableCell>
                        )}
                        {showUnitPrice && (
                            <TableCell align="right">
                                {columnLabels?.unitPrice || 'Price'}
                            </TableCell>
                        )}
                        {showTax && (
                            <TableCell align="right">{columnLabels?.tax || 'Tax'}</TableCell>
                        )}
                        <TableCell align="right">{columnLabels?.quantity || 'Qty'}</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell sx={{ px: 0 }} />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {formItems.map((formItem: FormItem) => (
                        <TableRow key={formItem.productId} hover>
                            <TableCell sx={{ pl: 0 }}>{formItem.productName}</TableCell>
                            {showPurchasePrice && (
                                <TableCell align="right">{formItem.purchasePrice}</TableCell>
                            )}
                            {showUnitPrice && (
                                <TableCell align="right">{formItem.unitPrice}</TableCell>
                            )}
                            {showTax && <TableCell align="right">{formItem.tax}</TableCell>}
                            <TableCell align="right">{formItem.quantity}</TableCell>
                            <TableCell align="right">
                                {(formItem.unitPrice ?? 0) * formItem.quantity}
                            </TableCell>
                            <TableCell align="right" sx={{ px: 0 }}>
                                <IconButton onClick={() => handleRemoveItem(formItem.productId)}>
                                    <Iconify icon="eva:trash-2-fill" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow
                        sx={(theme) => ({
                            backgroundColor: theme.palette.action.hover,
                        })}
                    >
                        <TableCell sx={{ pl: 0 }}>
                            <TextField
                                id="productId"
                                name="productId"
                                label="Product"
                                variant="standard"
                                select
                                fullWidth
                                value={formInputValues.productId}
                                onChange={handleFormInputChange}
                            >
                                {filteredProducts.map((product: Product) => (
                                    <MenuItem key={product.productId} value={product.productId}>
                                        {product.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </TableCell>
                        {showPurchasePrice && (
                            <TableCell>
                                <TextField
                                    id="purchasePrice"
                                    name="purchasePrice"
                                    label="Purchase Price"
                                    variant="standard"
                                    type="number"
                                    fullWidth
                                    value={formInputValues.purchasePrice}
                                    onChange={handleFormInputChange}
                                />
                            </TableCell>
                        )}
                        {showUnitPrice && (
                            <TableCell>
                                <TextField
                                    id="unitPrice"
                                    name="unitPrice"
                                    label="Price"
                                    variant="standard"
                                    type="number"
                                    fullWidth
                                    value={formInputValues.unitPrice}
                                    onChange={handleFormInputChange}
                                />
                            </TableCell>
                        )}
                        {showTax && (
                            <TableCell>
                                <TextField
                                    id="tax"
                                    name="tax"
                                    label="Tax"
                                    variant="standard"
                                    type="number"
                                    fullWidth
                                    value={formInputValues.tax}
                                    onChange={handleFormInputChange}
                                />
                            </TableCell>
                        )}
                        <TableCell>
                            <TextField
                                id="quantity"
                                name="quantity"
                                label="Quantity"
                                variant="standard"
                                type="number"
                                fullWidth
                                value={formInputValues.quantity}
                                onChange={handleFormInputChange}
                            />
                        </TableCell>
                        <TableCell align="right">
                            {(formInputValues.unitPrice ?? 0) * formInputValues.quantity}
                        </TableCell>
                        <TableCell align="right" sx={{ px: 0 }}>
                            <IconButton onClick={handleProductsFormItem}>
                                <Iconify icon="eva:plus-circle-outline" />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="right" colSpan={3}>
                            Sub total
                        </TableCell>
                        <TableCell align="right">{formMetadata.subTotal}</TableCell>
                        <TableCell sx={{ px: 0 }} />
                    </TableRow>
                    <TableRow>
                        <TableCell align="right" colSpan={3}>
                            Discount
                        </TableCell>
                        <TableCell align="right" colSpan={2} sx={{ pr: 0 }}>
                            <TextField
                                id="discount"
                                name="discount"
                                label="Discount"
                                variant="standard"
                                type="number"
                                fullWidth
                                size="small"
                                value={formMetadata.discount}
                                onChange={handleInvoiceChange}
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="right" colSpan={3}>
                            Total
                        </TableCell>
                        <TableCell align="right">{formMetadata.total}</TableCell>
                        <TableCell sx={{ px: 0 }} />
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
