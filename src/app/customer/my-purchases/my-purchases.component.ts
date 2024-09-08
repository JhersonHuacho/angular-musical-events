import { Component, inject, OnInit, ViewChild } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { SalesService } from '../../admin/sales/sales.service';
import { SaleResponseDto } from '../../admin/sales/sales.model';
import {MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-my-purchases',
  standalone: true,
  imports: [MatInputModule, MatTableModule,MatPaginatorModule, MatIconModule],
  templateUrl: './my-purchases.component.html',
  styleUrl: './my-purchases.component.css'
})
export class MyPurchasesComponent implements OnInit {

  salesService = inject(SalesService);

  displayedColumns: string[] = ['saleId', 'title', 'quantity', 'total', 'saleDate', 'dateEvent', 'ticket'];
  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource = new MatTableDataSource<SaleResponseDto>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.salesService.getSalesByCustomer('jhersonhuacho@gmail.com', '', 1, 10).subscribe((response) => {
      if (response.success) {
        this.dataSource = new MatTableDataSource(response.data);
      }
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}


