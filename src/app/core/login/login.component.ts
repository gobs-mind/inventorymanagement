import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/entity/Employee';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;

  employee: Employee;

  message: string;

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  keyDownFunction(event) {
    if(event.keyCode == 13) {
      this.onLogin();
    }
  }

  onLogin() {
    this.employeeService.login(this.loginForm.get('username').value, this.loginForm.get('password').value).subscribe(employee => {
      this.employee = employee;
      this.employeeService.isLoggedIn = true;
      localStorage.setItem("login","true");
      localStorage.setItem("role", employee.employeeRole.roleName);
      let redirect = this.employeeService.redirectUrl ? this.router.parseUrl(this.employeeService.redirectUrl) : '/home';
      this.router.navigateByUrl(redirect);
    },
      error => {
        Swal.fire("Hey!!",error.error.message,"warning");
      });
  }

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit() {
  }

}
