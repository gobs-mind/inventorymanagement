import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-dashboard',
  templateUrl: './request-dashboard.component.html',
  styleUrls: ['./request-dashboard.component.css']
})
export class RequestDashboardComponent implements OnInit {

  list(type : string) {
    this.router.navigate([type],{relativeTo:this.route});
  }

  constructor(private requestService : RequestService, private router : Router, private route : ActivatedRoute) { }

  ngOnInit() {
  }

}
