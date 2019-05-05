import {Order} from "./order";
export {Order} from "./order";

export class Orderlog {
    constructor (
        public note?: string,
        public adminNote?: string,
        public status?,
        public updated_at?,
        public order_id?: number,
    ) {}
}
