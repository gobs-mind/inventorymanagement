import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ApiUrl } from 'src/app/ApiUrl';
import { Vendor } from 'src/app/entity/Vendor';
import { Product } from 'src/app/entity/Product';
import { ProductRequest } from 'src/app/entity/ProductRequest';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductrequestService {

  addRequest(request : ProductRequest) : Observable<boolean> {
    const url = `${ApiUrl.addRequest}`;
    return this.httpClient.post<boolean>(url,request,httpOptions);
  }

  updateRequest(request : ProductRequest) : Observable<boolean> {
    const url = `${ApiUrl.updateRequest}`;
    return this.httpClient.put<boolean>(url,request,httpOptions);
  } 

  constructor(private httpClient : HttpClient) { }
}
