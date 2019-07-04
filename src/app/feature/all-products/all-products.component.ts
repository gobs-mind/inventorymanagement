import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

export class PeriodicElement {
  productId : number;
  productName : string;
  price : number;
  quantity : number;
}

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AllProductsComponent implements OnInit {

  constructor(private productService: ProductService, private router : Router) { }

    displayedColumns: string[] = ['productId', 'productName','price', 'quantity'];
  
    public dataSource = new MatTableDataSource<PeriodicElement>();
  
    getSource() {
      this.productService.getAllProducts().subscribe(products => {
        this.dataSource.data = products;
      }, error => {
        Swal.fire("Hey!!",error.error.message,"warning");
      })
    }

    productInfo(row : any) {
      this.router.navigate(["/product",row.productId]);
    }
  
    ngOnInit() {
      this.getSource();
    }

    @ViewChild(MatSort, {static: false}) sort: MatSort;

    ngAfterViewInit(): void {
      this.dataSource.sort = this.sort;
    }
  

}
