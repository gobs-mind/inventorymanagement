import { Vendor } from 'src/app/entity/Vendor';

export class ProductRequest {
    productRequestId : number;
    productId : number;
    productName : string;
    vendor : Vendor;
    price : number;
    batchNum : string;
    batchDate : Date;
    quantity : number;
    status : string;
    requestType : string;
}