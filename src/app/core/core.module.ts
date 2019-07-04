import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PagenotFoundComponent } from './pagenot-found/pagenot-found.component';
import { AppMaterialModule } from 'src/app/app-material/app-material.module';

@NgModule({
  declarations: [HeaderComponent, HomeComponent, LoginComponent, PagenotFoundComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    AppMaterialModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule { }
