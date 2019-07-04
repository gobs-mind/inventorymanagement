import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogin() : boolean {
    if(localStorage.getItem("login")=="true") {
      return true;
    } else {
      return false;
    } 
  }

  logout() {
    this.employeeService.isLoggedIn = false;
    localStorage.setItem("login","false");
    localStorage.removeItem("role");
    Swal.fire("Hurrah!!","Logout Successfully...","success");
  }

  constructor(private employeeService : EmployeeService) { }

  ngOnInit() {
  }

}
