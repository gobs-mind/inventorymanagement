import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { Product } from 'src/app/entity/Product';
import { MatTableDataSource, MatSort } from '@angular/material';
import { ProductService } from 'src/app/services/product.service';
import { ProductRequest } from 'src/app/entity/ProductRequest';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

export class PeriodicElement {
  productRequestId: number;
  productName: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RequestListComponent implements OnInit {

  type : string;

  products: ProductRequest[]

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        this.type = params.get('type');
        this.requestService.getList(params.get('type')).subscribe(requests => {
          this.dataSource.data = requests;
        }, error => {
          Swal.fire("Hey!!",error.error.message,"warning");
        })
      });
  }

  constructor(private route: ActivatedRoute, private requestService: RequestService, private productService: ProductService, private router: Router) { }

  displayedColumns: string[] = ['productRequestId', 'productName', 'price', 'quantity'];

  public dataSource = new MatTableDataSource<PeriodicElement>();

  requestApproval(row : any) {
    this.router.navigate(['../request',row.productRequestId],{relativeTo:this.route});
  }

  @ViewChild(MatSort, {static: false}) sort: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

}
