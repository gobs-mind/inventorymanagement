import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/entity/Employee';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ApiUrl } from 'src/app/ApiUrl';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employee : Employee = new Employee();

  isLoggedIn : boolean = false;

  message : string;

  redirectUrl : string;

  login(username : string, password: string): Observable<Employee> {
    this.employee.employeeUsername = username;
    this.employee.employeePassword = password;
    const url = `${ApiUrl.checkEmployee}`;
    return this.httpClient.post<Employee>(url,this.employee , httpOptions);
    }

  constructor(private httpClient: HttpClient) { }
}
