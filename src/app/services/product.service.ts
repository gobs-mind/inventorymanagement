import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ApiUrl } from 'src/app/ApiUrl';
import { Vendor } from 'src/app/entity/Vendor';
import { Product } from 'src/app/entity/Product';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  getProduct(productId : number) : Observable<Product> {
    const url = `${ApiUrl.getProduct}`+`${productId}`;
    return this.httpClient.get<Product>(url,httpOptions);
  }

  addProduct(product : Product) : Observable<boolean> {
    const url = `${ApiUrl.addProduct}`;
    return this.httpClient.post<boolean>(url,product,httpOptions);
  }

  updateProduct(product : Product) : Observable<boolean> {
    const url = `${ApiUrl.updateProduct}`;
    return this.httpClient.put<boolean>(url,product,httpOptions);
  }

  deleteProduct(productId : number) : Observable<boolean> {
    const url = `${ApiUrl.deleteProduct}`+`${productId}`;
    return this.httpClient.delete<boolean>(url,httpOptions);
  }

  getAllProducts() : Observable<Product[]> {
    const url = `${ApiUrl.getAllProducts}`;
    return this.httpClient.get<Product[]>(url,httpOptions);
  }

  constructor(private httpClient : HttpClient) { }
}
