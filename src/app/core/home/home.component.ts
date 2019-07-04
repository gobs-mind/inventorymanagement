import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private employeeService : EmployeeService) { }

  isStoreManager() : boolean {
    if(localStorage.getItem("role") == "Store Manager") {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit() {
  }

}
