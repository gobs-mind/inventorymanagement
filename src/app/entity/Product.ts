import { Vendor } from 'src/app/entity/Vendor';

export class Product {
    productId : number;
    productName : string;
    vendor : Vendor;
    price : number;
    batchNum : string;
    batchDate : Date;
    quantity : number;
    status : string;
}