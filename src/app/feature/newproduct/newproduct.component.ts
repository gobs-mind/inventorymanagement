import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Vendor } from 'src/app/entity/Vendor';
import { VendorService } from 'src/app/services/vendor.service';
import { Product } from 'src/app/entity/Product';
import { ProductRequest } from 'src/app/entity/ProductRequest';
import { ProductrequestService } from 'src/app/services/productrequest.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.component.html',
  styleUrls: ['./newproduct.component.css']
})
export class NewproductComponent implements OnInit {

  vendors: Vendor[];

  message: string;

  productForm = new FormGroup({
    productName: new FormControl(''),
    vendor: new FormControl('',Validators.required),
    price: new FormControl(''),
    batchNum: new FormControl(''),
    batchDate: new FormControl(''),
    quantity: new FormControl('')
  });

  product: Product = new Product();
  productRequest: ProductRequest = new ProductRequest();

  onSubmit() {
    if(this.productForm.invalid) {
      Swal.fire("Hey!!", "Please, Fill all the details", "warning")
      return
    }
    if ((this.productForm.get('productName').value == null) || ("" === this.productForm.get('productName').value.trim())) {
      Swal.fire("Hey!!", "Please, Fill all the details", "warning")
      return
    }
    else {
      this.productForm.get('productName').setValue(this.productForm.get('productName').value.trim());
      this.product.productName = this.productForm.get('productName').value;
    }
    if (this.productForm.get('vendor').value == null) {
      Swal.fire("Hey!!", "Please, Fill all the details", "warning")
      return
    }
    else {
      this.product.vendor = this.productForm.get('vendor').value;
    }
    if (this.productForm.get('price').value == "") {
      Swal.fire("Hey!!", "Please, Fill all the details", "warning")
      return
    }
    else {
      this.product.price = this.productForm.get('price').value;
    }
    if ((this.productForm.get('batchNum').value == null) || ("" === this.productForm.get('batchNum').value.trim())) {
      Swal.fire("Hey!!", "Please, Fill all the details", "warning")
      return
    } 
    else {
      this.productForm.get('batchNum').setValue(this.productForm.get('batchNum').value.trim());
      this.product.batchNum = this.productForm.get('batchNum').value;
    }
    if (this.productForm.get('batchDate').value == '') {
      Swal.fire("Hey!!", "Please, Fill all the details", "warning")
      return
    }
    else {
      this.product.batchDate = this.productForm.get('batchDate').value;
    }
    if (this.productForm.get('quantity').value == "") {
      Swal.fire("Hey!!", "Please, Fill all the details", "warning")
      return
    } else if (this.productForm.get('quantity').value < 1) {
      Swal.fire("Hey!!", "Quantity for New Product must be at least 1", "warning")
      return;
    }
    else {
      this.product.quantity = this.productForm.get('quantity').value;
    }
    if (localStorage.getItem("role") == "Store Manager") {
      this.product.status = "Approved";
      this.productService.addProduct(this.product).subscribe(response => {
        if (response == true) {
          Swal.fire("Hurrah!!", "Product added successfully...", "success").then((value) => { this.router.navigateByUrl(""); })
        }
      }, error => {
        Swal.fire("Hey!!", error.error.message, "warning");
      });
    } else {
      this.productRequest.productName = this.productForm.get('productName').value;
      this.productRequest.vendor = this.productForm.get('vendor').value;
      this.productRequest.price = this.productForm.get('price').value;
      this.productRequest.batchNum = this.productForm.get('batchNum').value;
      this.productRequest.batchDate = this.productForm.get('batchDate').value;
      this.productRequest.quantity = this.productForm.get('quantity').value;
      this.productRequest.status = "Pending";
      this.productRequest.requestType = "new";
      this.productRequestService.addRequest(this.productRequest).subscribe(response => {
        if (response == true) {
          Swal.fire("Hurrah!!", "Your request submitted successfully...", "success").then((value) => { this.router.navigateByUrl(""); })
        }
      }, error => {
        Swal.fire("Hey!!", error.error.message, "warning");
      })
    }
  }

  constructor(private vendorService: VendorService, private productService: ProductService, private productRequestService: ProductrequestService,
    private router: Router, private location: Location) { }

  ngOnInit() {
    this.vendorService.getVendors().subscribe(vendors => {
      this.vendors = vendors;
    }, error => {
      Swal.fire("Hey!!", error.error.message, "warning");
    })
  }

}
