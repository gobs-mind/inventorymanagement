import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/entity/Product';
import { ProductService } from 'src/app/services/product.service';
import { Location } from '@angular/common';
import { ProductrequestService } from 'src/app/services/productrequest.service';
import { ProductRequest } from 'src/app/entity/ProductRequest';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productId : number;

  message : string;

  product : Product = new Product();

  productRequest : ProductRequest = new ProductRequest();

  update() {
    this.router.navigate(["./update",this.productId]);
  }

  delete() {
    if(localStorage.getItem("role")=="Store Manager") {
      this.productService.deleteProduct(this.productId).subscribe(response => {
        Swal.fire("Hurrah!!","Product deleted...","success").then((value)=>{this.location.back();});
      }, error => {
        this.message = error.error.message;
      });
    } else {
       this.productRequest.productName = this.product.productName;
      this.productRequest.vendor = this.product.vendor;
      this.productRequest.price = this.product.price;
      this.productRequest.batchNum = this.product.batchNum;
      this.productRequest.batchDate = this.product.batchDate;
      this.productRequest.quantity = this.product.quantity;
      this.productRequest.status = "Pending";
      this.productRequest.requestType = "delete";
      this.productRequestService.addRequest(this.productRequest).subscribe(response => {
        if(response == true) {
          this.product.status = "Pending"
          this.productService.updateProduct(this.product).subscribe(response => {
            if(response == true) {
              Swal.fire("Hurrah!!","Your request submitted successfully...","success").then((value)=>{this.location.back();});
            }
          }, error => {
            Swal.fire("Hey!!",error.error.message,"warning");
          });
      }
    }, error => {
      Swal.fire("Hey!!",error.error.message,"warning");
      });
    }  
  }

  constructor(private router : Router, private route : ActivatedRoute, private productService : ProductService, private location : Location, private productRequestService : ProductrequestService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        this.productId   = +params.get('productId');
        this.productService.getProduct(this.productId).subscribe(product => {
          this.product = product;
        }, error => {
          Swal.fire("Hey!!",error.error.message,"warning");
        })
      });
  }

}