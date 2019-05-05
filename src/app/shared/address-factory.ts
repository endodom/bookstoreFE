import {Address} from "./address";

export class AddressFactory {

    static empty(): Address {
        return new Address(null,"", 0,"","",0, false, null);
    }

    static fromObject(rawBook: any): Address {
        return new Address(
            rawBook.id,
            rawBook.street,
            rawBook.postcode,
            rawBook.city,
            rawBook.country,
            rawBook.taxPercentage,
            rawBook.isMain,
            rawBook.user_id


        );
    }

}
