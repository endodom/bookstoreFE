import { Injectable } from '@angular/core';
import {Orderlog} from "./orderlog";

@Injectable({
  providedIn: 'root'
})
export class OrderlogFactoryService {
    static empty(): Orderlog {
        return new Orderlog();
    }

    static fromObject(rawOrder: any): Orderlog {
        return new Orderlog(
            rawOrder.note,
            rawOrder.adminNote,
            rawOrder.status,
            rawOrder.order_id,
            rawOrder.updated_at
        );
    }
}
