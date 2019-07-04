import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/core/login/login.component';
import { HomeComponent } from 'src/app/core/home/home.component';
import { PagenotFoundComponent } from 'src/app/core/pagenot-found/pagenot-found.component';
import { NewproductComponent } from 'src/app/feature/newproduct/newproduct.component';
import { ProductComponent } from 'src/app/feature/product/product.component';
import { UpdateComponent } from 'src/app/feature/update/update.component';
import { AllProductsComponent } from 'src/app/feature/all-products/all-products.component';
import { RequestModule } from 'src/app/request/request.module';
import { AuthGuard } from 'src/app/auth.guard';

const routes: Routes = [
  {
    path : "home",
    component : HomeComponent
  },
  {
    path : "login",
    component : LoginComponent
  },
  {
    path : "newproduct",
    component : NewproductComponent,
    canActivate : [AuthGuard]
  },
  {
    path : "product/:productId",
    component : ProductComponent,
    canActivate : [AuthGuard]
  },
  {
    path : "update/:productId",
    component : UpdateComponent,
    canActivate : [AuthGuard]
  },
  {
    path : "products",
    component : AllProductsComponent,
    canActivate : [AuthGuard]
  },
  {
    path : "requests",
    loadChildren : () => RequestModule,
    canActivate : [AuthGuard]
  },
  {
    path : "",
    redirectTo : "/home",
    pathMatch : "full"
  },
  {
    path : "**",
    component : PagenotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
