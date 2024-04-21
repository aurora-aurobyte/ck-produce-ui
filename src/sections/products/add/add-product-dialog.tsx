import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { useAppSelector } from 'src/store/hooks';
import AddProduct from './add-product';

interface FormDialogProps {
    open: number;
    setOpen: React.Dispatch<React.SetStateAction<number>>;
    edit?: boolean;
}

const FormDialog: React.FC<FormDialogProps> = ({ open, setOpen, edit }) => {
    const { watch, setValue } = useFormContext();
    const invoiceItems = watch('invoiceItems');

    const products = useAppSelector((state) => state.product.products);

    const handleClose = (values: any) => {
        setValue(`invoiceItems.${open - 1}.unitPrice`, parseFloat(values.unitPrice));
        setValue(`invoiceItems.${open - 1}.tax`, parseFloat(values.tax));

        setOpen(0);
    };

    React.useEffect(() => {
        if (open - 1 >= 0 && !edit) {
            setValue(`invoiceItems.${open - 1}.productId`, products?.slice(-1)?.[0]?._id);
        }
    }, [products, invoiceItems, open, setValue, edit]);

    return (
        <Dialog open={!!open} onClose={() => setOpen(0)}>
            <DialogContent>
                {!!open && (
                    <AddProduct
                        productId={invoiceItems?.[open - 1]?.productId}
                        edit={edit}
                        isDialog
                        handleClose={handleClose}
                    />
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(0)}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default FormDialog;
