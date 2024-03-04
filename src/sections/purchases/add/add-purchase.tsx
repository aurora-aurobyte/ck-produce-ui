import { ChangeEvent, useState, FormEvent, useEffect, useMemo } from 'react';
import Container from 'src/components/container/container';
import Title from 'src/components/title';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import Iconify from 'src/components/iconify';
import {
    Purchase,
    PurchaseItem,
    addPurchase,
    updatePurchase,
} from 'src/store/features/purchaseSlice';
import { Product, fetchProducts } from 'src/store/features/productSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { useRouter } from 'src/routes/hooks';
import { fDate } from 'src/utils/format-time';
import { v4 as uuidv4 } from 'uuid';

const defaultValues: Purchase = {
    purchaseId: '',
    sellerName: '',
    date: fDate(new Date().toString(), 'yyyy-MM-dd'),
    subTotal: 0,
    discount: 0,
    total: 0,
    purchaseItems: [],
};

const defaultPurchaseItem: PurchaseItem = {
    productId: '',
    productName: '',
    purchasePrice: 0,
    quantity: 1,
};

// ----------------------------------------------------------------

type AddPurchaseProps = {
    purchaseId?: string;
    edit?: boolean;
};

export default function AddPurchase({ purchaseId, edit }: AddPurchaseProps) {
    const purchases = useAppSelector((state) => state.purchase.purchases);
    const products = useAppSelector((state) => state.product.products);

    const [purchaseValues, setPurchaseValues] = useState<Purchase>(defaultValues);
    const [purchaseItems, setPurchaseItems] = useState<PurchaseItem[]>([]);
    const [purchaseItemsValues, setPurchaseItemsValues] =
        useState<PurchaseItem>(defaultPurchaseItem);

    const dispatch = useAppDispatch();
    const router = useRouter();

    const handlePurchaseChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPurchaseValues({ ...purchaseValues, [event.target.name]: event.target.value });
    };

    const handlePurchaseItemChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPurchaseItemsValues((_purchaseItemsValues: PurchaseItem) => {
            const { name, value } = event.target;
            const duplicatedPurchaseItems = { ..._purchaseItemsValues, [name]: value };
            if (name === 'productId') {
                duplicatedPurchaseItems.purchasePrice =
                    products.find((product) => product._id === value)?.purchasePrice || 0;
            }
            return duplicatedPurchaseItems;
        });
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (edit) {
            dispatch(
                updatePurchase({
                    ...purchaseValues,
                    purchaseItems,
                    purchaseId: purchaseId as string,
                })
            );
        } else {
            dispatch(addPurchase({ ...purchaseValues, purchaseId: uuidv4(), purchaseItems }));
        }
        router.back();
    };

    const handleRemoveItem = (productId: string) => {
        setPurchaseItems((_purchaseItems: PurchaseItem[]) =>
            _purchaseItems.filter((item: PurchaseItem) => item.productId !== productId)
        );
    };

    const handleAddPurchaseItem = () => {
        if (purchaseItemsValues.productId && purchaseItemsValues.quantity) {
            setPurchaseItems((_purchaseItems: PurchaseItem[]) => [
                ..._purchaseItems,
                {
                    productId: purchaseItemsValues.productId,
                    productName: products.find(
                        (product) => product._id === purchaseItemsValues.productId
                    )?.name as string,
                    purchasePrice: purchaseItemsValues.purchasePrice,
                    quantity: purchaseItemsValues.quantity,
                },
            ]);
            setPurchaseItemsValues(defaultPurchaseItem);
        }
    };

    useEffect(() => {
        if (edit && purchaseId && purchases) {
            const purchase = purchases.find(
                (_purchase) => _purchase.purchaseId === purchaseId
            ) as Purchase;
            if (purchase) {
                setPurchaseValues(purchase);
                setPurchaseItems(purchase.purchaseItems);
            }
        }
    }, [edit, purchaseId, purchases]);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        setPurchaseValues((_purchaseItems) => ({
            ..._purchaseItems,
            total: _purchaseItems.subTotal - _purchaseItems.discount,
        }));
    }, [purchaseValues.discount]);

    useEffect(() => {
        setPurchaseValues((_purchaseValues) => {
            const subTotal = purchaseItems.reduce(
                (acc, item) => acc + item.purchasePrice * item.quantity,
                0
            );
            return {
                ..._purchaseValues,
                subTotal,
                total: subTotal - _purchaseValues.discount,
            };
        });
    }, [purchaseItems]);

    const filteredProducts = useMemo(
        () =>
            products.filter(
                (product: Product) =>
                    purchaseItems.findIndex(
                        (purchaseItem: PurchaseItem) => product._id === purchaseItem.productId
                    ) === -1
            ),
        [purchaseItems, products]
    );

    return (
        <Container>
            <Title title={edit ? 'Edit Purchase' : 'Add Purchase'} />
            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={6}>
                        <TextField
                            id="sellerName"
                            name="sellerName"
                            label="Seller Name"
                            variant="standard"
                            fullWidth
                            size="small"
                            value={purchaseValues.sellerName}
                            onChange={handlePurchaseChange}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <TextField
                            id="date"
                            name="date"
                            label="Purchase Date"
                            variant="standard"
                            fullWidth
                            size="small"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={purchaseValues.date}
                            onChange={handlePurchaseChange}
                        />
                    </Grid>
                </Grid>
                <TableContainer sx={{ mt: 2 }}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ pl: 0 }}>Product Name</TableCell>
                                <TableCell align="right">Purchase Price</TableCell>
                                <TableCell align="right">Qty</TableCell>
                                <TableCell align="right">Total</TableCell>
                                <TableCell sx={{ px: 0 }} />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {purchaseItems.map((purchaseItem: PurchaseItem) => (
                                <TableRow key={purchaseItem.productId} hover>
                                    <TableCell sx={{ pl: 0 }}>{purchaseItem.productName}</TableCell>
                                    <TableCell align="right">
                                        {purchaseItem.purchasePrice}
                                    </TableCell>
                                    <TableCell align="right">{purchaseItem.quantity}</TableCell>
                                    <TableCell align="right">
                                        {purchaseItem.purchasePrice * purchaseItem.quantity}
                                    </TableCell>
                                    <TableCell align="right" sx={{ px: 0 }}>
                                        <IconButton
                                            onClick={() => handleRemoveItem(purchaseItem.productId)}
                                        >
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
                                        value={purchaseItemsValues.productId}
                                        onChange={handlePurchaseItemChange}
                                    >
                                        {filteredProducts.map((product: Product) => (
                                            <MenuItem key={product._id} value={product._id}>
                                                {product.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        id="purchasePrice"
                                        name="purchasePrice"
                                        label="Price"
                                        variant="standard"
                                        type="number"
                                        fullWidth
                                        value={purchaseItemsValues.purchasePrice}
                                        onChange={handlePurchaseItemChange}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        id="quantity"
                                        name="quantity"
                                        label="Quantity"
                                        variant="standard"
                                        type="number"
                                        fullWidth
                                        value={purchaseItemsValues.quantity}
                                        onChange={handlePurchaseItemChange}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    {purchaseItemsValues.purchasePrice *
                                        purchaseItemsValues.quantity}
                                </TableCell>
                                <TableCell align="right" sx={{ px: 0 }}>
                                    <IconButton onClick={handleAddPurchaseItem}>
                                        <Iconify icon="eva:plus-circle-outline" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="right" colSpan={3}>
                                    Sub total
                                </TableCell>
                                <TableCell align="right">{purchaseValues.subTotal}</TableCell>
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
                                        value={purchaseValues.discount}
                                        onChange={handlePurchaseChange}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="right" colSpan={3}>
                                    Total
                                </TableCell>
                                <TableCell align="right">{purchaseValues.total}</TableCell>
                                <TableCell sx={{ px: 0 }} />
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    <Button variant="contained" color="inherit" type="submit">
                        Save
                    </Button>
                    <Button variant="contained" color="inherit" type="button">
                        Print
                    </Button>
                </Stack>
            </Box>
        </Container>
    );
}
