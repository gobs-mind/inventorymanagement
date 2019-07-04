import { Injectable } from '@angular/core';
import { ApiUrl } from 'src/app/ApiUrl';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from 'src/app/entity/Product';
import { Observable } from 'rxjs/internal/Observable';
import { ProductRequest } from 'src/app/entity/ProductRequest';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  getList(type : string) : Observable<ProductRequest[]> {
    const url = `${ApiUrl.getList}`+`${type}`;
    return this.httpClient.get<ProductRequest[]>(url,httpOptions);
  }

  getProductRequest(requestId : number) : Observable<ProductRequest> {
    const url = `${ApiUrl.getRequest}`+`${requestId}`;
    return this.httpClient.get<ProductRequest>(url,httpOptions);
  }

  deleteProductRequest(productRequestId : number) : Observable<boolean> {
    const url = `${ApiUrl.deleteRequest}`+`${productRequestId}`;
    return this.httpClient.delete<boolean>(url,httpOptions);
  }

  constructor(private httpClient : HttpClient) { }
}
