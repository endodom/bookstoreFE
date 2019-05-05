import {Book} from "./book";
export {Book} from "./book";

export class Order {
    constructor (
        public user_id : number,
        public addressId: number,
        public books : Book[],
        public status?,
        public created_at?,
        public id?
    ) {}
}
