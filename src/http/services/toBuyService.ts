import { ToBuy } from 'src/store/features/toBuySlice';
import http from '../http-common';

const entityName = 'toBuys';

function getToBuys(date: string): Promise<ToBuy[]> {
    return http.get(`/${entityName}?date=${date}`).then((response) => response.data);
}

export default { getToBuys };
