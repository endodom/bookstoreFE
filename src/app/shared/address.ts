export class Address {
    constructor (
        public id : number,
        public street : string,
        public postcode : number,
        public city : string,
        public country : string,
        public taxPercentage : number,
        public isMain: boolean,
        public user_id? : number
    ) {}
}
