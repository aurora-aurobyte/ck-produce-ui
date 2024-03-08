import { PendingPayment } from 'src/store/features/pendingPaymentSlice';
import http from '../http-common';

const entityName = 'pendingPayments';

function getPendingPayments(): Promise<PendingPayment[]> {
    return http.get(`/${entityName}`).then((response) => response.data);
}

export default { getPendingPayments };
