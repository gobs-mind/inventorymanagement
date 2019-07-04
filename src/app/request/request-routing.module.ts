import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestDashboardComponent } from 'src/app/request/request-dashboard/request-dashboard.component';
import { RequestListComponent } from 'src/app/request/request-list/request-list.component';
import { RequestApprovalComponent } from 'src/app/request/request-approval/request-approval.component';

const routes: Routes = [
  {
    path : "",
    component : RequestDashboardComponent,
    children : [
      {
        path : ":type",
        component : RequestListComponent
      },
      {
        path : "request/:requestId",
        component : RequestApprovalComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestRoutingModule { }
