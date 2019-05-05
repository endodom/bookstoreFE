import { Book } from './book';
import {Order} from "./order";

export class OrderFactory {
    static empty(): Order {
        return new Order(null, 0, []);
    }

    static fromObject(rawOrder: any): Order {
        return new Order(
            rawOrder.id,
            rawOrder.user_id,
            rawOrder.addressId,
            rawOrder.books,
            rawOrder.status,
            rawOrder.created_at
        );
    }
}
