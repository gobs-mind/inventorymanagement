import { Component, OnInit } from '@angular/core';
import { VendorService } from 'src/app/services/vendor.service';
import { Vendor } from 'src/app/entity/Vendor';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/entity/Product';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductRequest } from 'src/app/entity/ProductRequest';
import { ProductrequestService } from 'src/app/services/productrequest.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  updateForm = new FormGroup({
    productName: new FormControl(''),
    vendor: new FormControl('',Validators.required),
    price: new FormControl(''),
    batchNum: new FormControl(''),
    batchDate: new FormControl(''),
    quantity: new FormControl('')
  });

  message: string;

  product: Product = new Product();

  updatedProduct: Product = new Product();

  productRequest: ProductRequest = new ProductRequest();

  productId: number;

  vendors: Vendor[];

  onSubmit() {
    if(this.updateForm.invalid) {
      Swal.fire("Hey!!", "Please, Fill all the details", "warning")
      return
    }
    if ((this.updateForm.get('productName').value == null) || ("" === this.updateForm.get('productName').value.trim())) {
      Swal.fire("Hey!!", "Please, Fill all the details", "warning")
      return
    }
    else {
      this.updateForm.get('productName').setValue(this.updateForm.get('productName').value.trim());
      this.updatedProduct.productName = this.updateForm.get('productName').value;
    }
    if (this.updateForm.get('vendor').value == null) {
      Swal.fire("Hey!!", "Please, Fill all the details", "warning")
      return
    }
    else {
      this.updatedProduct.vendor = this.updateForm.get('vendor').value;
    }
    if (this.updateForm.get('price').value == "") {
      Swal.fire("Hey!!", "Please, Fill all the details", "warning")
      return
    }
    else {
      this.updatedProduct.price = this.updateForm.get('price').value;
    }
    if ((this.updateForm.get('batchNum').value == null) || ("" === this.updateForm.get('batchNum').value.trim())) {
      Swal.fire("Hey!!", "Please, Fill all the details", "warning")
      return
    } else {
      this.updateForm.get('batchNum').setValue(this.updateForm.get('batchNum').value.trim());
      this.updatedProduct.batchNum = this.updateForm.get('batchNum').value;
    }
    if (this.updateForm.get('batchDate').value == '') {
      Swal.fire("Hey!!", "Please, Fill all the details", "warning")
      return
    }
    else {
      this.updatedProduct.batchDate = this.updateForm.get('batchDate').value;
    }
    if (this.updateForm.get('quantity').value == "") {
      Swal.fire("Hey!!", "Please, Fill all the details", "warning")
      return
    } else if (this.updateForm.get('quantity').value < 1) {
      Swal.fire("Hey!!", "Quantity for New Product must be at least 1", "warning")
      return;
    }
    else {
      this.updatedProduct.quantity = this.updateForm.get('quantity').value;
    }
    this.updatedProduct.productId = this.productId;
    if (localStorage.getItem("role") == "Store Manager") {
      this.updatedProduct.status = "Approved";
      this.productService.updateProduct(this.updatedProduct).subscribe(response => {
        if (response == true) {
          Swal.fire("Hurrah!!", "Your product is updated successfully...", "success").then((value) => { this.router.navigateByUrl('/products') });
        }
      }, error => {
        Swal.fire("Hey!!", error.error.message, "warning");
      });
    } else {
      this.productRequest.productId = this.productId;
      this.productRequest.productName = this.updateForm.get('productName').value;
      this.productRequest.vendor = this.updateForm.get('vendor').value;
      this.productRequest.price = this.updateForm.get('price').value;
      this.productRequest.batchNum = this.updateForm.get('batchNum').value;
      this.productRequest.batchDate = this.updateForm.get('batchDate').value;
      this.productRequest.quantity = this.updateForm.get('quantity').value;
      this.productRequest.status = "Pending";
      this.productRequest.requestType = "update";
      this.productRequestService.addRequest(this.productRequest).subscribe(response => {
        if (response == true) {
          this.product.status = "Pending"
          this.productService.updateProduct(this.product).subscribe(response => {
            if (response == true) {

            }
          }, error => {
            Swal.fire("Hey!!", error.error.message, "warning");
          });
          Swal.fire("Hurrah!!", "Your request submitted successfully...", "success").then((value) => { this.location.back(); });
        }
      }, error => {
        Swal.fire("Hey!!", error.error.message, "warning");
      })
    }
  }

  onCancel() {
    this.location.back();
  }

  constructor(private vendorService: VendorService, private route: ActivatedRoute, private productService: ProductService,
    private productRequestService: ProductrequestService, private router: Router, private location: Location) { }

  ngOnInit() {
    this.vendorService.getVendors().subscribe(vendors => {
      this.vendors = vendors;
    });
    this.route.paramMap.subscribe(
      params => {
        this.productId = +params.get('productId');
        this.productService.getProduct(this.productId).subscribe(product => {
          this.product = product;
          this.updateForm.get('productName').setValue(product.productName);
          this.updateForm.get('vendor').setValue(product.vendor);
          this.updateForm.get('price').setValue(product.price);
          this.updateForm.get('batchNum').setValue(product.batchNum);
          this.updateForm.get('batchDate').setValue(product.batchDate);
          this.updateForm.get('quantity').setValue(product.quantity);
        }, error => {
          Swal.fire("Hey!!", error.error.message, "warning");
        })
      });
  }

}
