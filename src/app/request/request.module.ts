import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestRoutingModule } from './request-routing.module';
import { AppMaterialModule } from 'src/app/app-material/app-material.module';
import { RequestDashboardComponent } from 'src/app/request/request-dashboard/request-dashboard.component';
import { RequestApprovalComponent } from 'src/app/request/request-approval/request-approval.component';
import { RequestListComponent } from 'src/app/request/request-list/request-list.component';

@NgModule({
  declarations: [RequestDashboardComponent, RequestApprovalComponent, RequestListComponent],
  imports: [
    CommonModule,
    RequestRoutingModule,
    AppMaterialModule
  ]
})
export class RequestModule { }
