import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureRoutingModule } from './feature-routing.module';
import { NewproductComponent } from './newproduct/newproduct.component';
import { AppMaterialModule } from 'src/app/app-material/app-material.module';
import { ProductComponent } from 'src/app/feature/product/product.component';
import { UpdateComponent } from './update/update.component';
import { AllProductsComponent } from './all-products/all-products.component';

@NgModule({
  declarations: [NewproductComponent, ProductComponent, UpdateComponent, AllProductsComponent],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    AppMaterialModule
  ],
  exports : [
    NewproductComponent,
    ProductComponent,
    UpdateComponent
  ]
})
export class FeatureModule { }
