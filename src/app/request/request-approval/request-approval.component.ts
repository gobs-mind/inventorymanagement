import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { ProductRequest } from 'src/app/entity/ProductRequest';
import { ProductService } from 'src/app/services/product.service';
import { Location } from '@angular/common';
import { Product } from 'src/app/entity/Product';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

@Component({
  selector: 'app-request-approval',
  templateUrl: './request-approval.component.html',
  styleUrls: ['./request-approval.component.css']
})
export class RequestApprovalComponent implements OnInit {

  constructor(private route : ActivatedRoute, private requestService : RequestService, private productService : ProductService, private location : Location,
              private router : Router) { }

  productRequest : ProductRequest = new ProductRequest();

  message : string;

  product : Product = new Product();

  approve() {
    if(this.productRequest.requestType == "delete") {
      this.productService.deleteProduct(this.productRequest.productId).subscribe(response => {
        
      }, error => Swal.fire("Hey!!",error.error.message,"warning"));
      this.requestService.deleteProductRequest(this.productRequest.productRequestId).subscribe(response => {
        if(response == true) {
          Swal.fire("Hurrah!!","Product deleted successfully...","success").then((value)=>{this.location.back();})
        }
      }, error => Swal.fire("Hey!!",error.error.message,"warning"));
    } else {
      this.product.productName = this.productRequest.productName;
      this.product.price = this.productRequest.price;
      this.product.vendor = this.productRequest.vendor;
      this.product.batchNum = this.productRequest.batchNum;
      this.product.batchDate = this.productRequest.batchDate;
      this.product.quantity = this.productRequest.quantity;
      this.product.status = "Approved"
      if(this.productRequest.requestType == "new") {
        this.productService.addProduct(this.product).subscribe(response => {
            
        }, error => {
          Swal.fire("Hey!!",error.error.message,"warning");
        });
      } else {
        this.product.productId = this.productRequest.productId;
        this.productService.updateProduct(this.product).subscribe(response => {
          if(response == true) {
            
          }
        }, error => {
          Swal.fire("Hey!!",error.error.message,"warning");
        });
      }
      this.requestService.deleteProductRequest(this.productRequest.productRequestId).subscribe(response => {
        if(response == true) {
          Swal.fire("Hurrah!!","Request Approved...","success").then((value)=>{this.location.back();})
        }
      }, error => Swal.fire("Hey!!",error.error.message,"warning"));;
    } 
  }

  disapprove() {
    if(this.productRequest.requestType == "update" || this.productRequest.requestType == "delete") {
      this.product.productId = this.productRequest.productId;
      this.product.status == "Approved"
      this.productService.updateProduct(this.product).subscribe(response => {
        if(response == true) {
            
          }
      }, error => {
        Swal.fire("Hey!!",error.error.message,"warning");
      });
    }
    this.requestService.deleteProductRequest(this.productRequest.productRequestId).subscribe(response => {
      if(response == true) {
        Swal.fire("Hurrah!!","Request disapproved...","success").then((value)=>{this.location.back();})
      }
    }, error => Swal.fire("Hey!!",error.error.message,"warning"));
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        this.requestService.getProductRequest(+params.get('requestId')).subscribe(request => {
          this.productRequest = request;
        }, error => Swal.fire("Hey!!",error.error.message,"warning"))
      });
  }

}
