import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ApiUrl } from 'src/app/ApiUrl';
import { Vendor } from 'src/app/entity/Vendor';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  getVendors() : Observable<Vendor[]> {
    const url = `${ApiUrl.getVendors}`;
    return this.httpClient.get<Vendor[]>(url, httpOptions);
  }

  constructor(private httpClient : HttpClient) { }
}
