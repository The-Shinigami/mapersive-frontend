import { Component } from '@angular/core';
import { InsuranceService } from 'src/app/services/insurance.service';
import Insurance from 'src/app/shared/model/insurance';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import {Sort} from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from 'src/app/shared/dialog/delete-confirmation/delete-confirmation.component';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  insurances:Insurance[] = []
  totalElements :number = 0;
  currentPage = '0';
  currentSize = '5';
  currentSortColumn = ""
  currentSortDirection = ""
  displayedColumns = [
    // 'policyId',
    'dateOfPurchase',
    // 'customerId',
    'fuel',
    'vehicleSegment',
    'premium',
    'bodilyInjuryLiability',
    'personalInjuryProtection',
    'propertyDamageLiability',
    'collision',
    'comprehensive',
    'customerGender',
    'customerIncomeGroup',
    'customerRegion',
    'customerMaritalStatus',
    'edit',
    'delete'
  ];
  dataSource: MatTableDataSource<Insurance> = new MatTableDataSource();

  constructor(private insuranceService:InsuranceService,public dialog: MatDialog){}

  ngOnInit(): void {
    this.getInsurances();
  }

  async getInsurances() {
    try {
      [this.insurances,this.totalElements] = await this.insuranceService.getAll();
      this.dataSource = new MatTableDataSource(this.insurances);

      
    } catch (error) {
      console.error("Error fetching insurances:", error);
      // Handle the error here
    }
}
async nextPage(event: PageEvent) {

  this.currentPage = event.pageIndex.toString();
  this.currentSize = event.pageSize.toString();

  const sort = {
    column: this.currentSortColumn,
    direction: this.currentSortDirection
  };


  [this.insurances,this.totalElements] = await this.insuranceService.getAll(this.currentPage,this.currentSize, sort);
  this.dataSource = new MatTableDataSource(this.insurances);
  
}
async sortData(event:Sort){

  this.currentSortColumn = event.active
  this.currentSortDirection = event.direction
  const sort = {
    column: this.currentSortColumn,
    direction: this.currentSortDirection
  };

  [this.insurances,this.totalElements] = await this.insuranceService.getAll(this.currentPage,this.currentSize,sort);
  this.dataSource = new MatTableDataSource(this.insurances);
}

async delete(row:Insurance){
  this.openDeleteDialog(row);
}
async edit(row:Insurance){
  console.log(row)
}

   openDeleteDialog(row:Insurance) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);

    dialogRef.afterClosed().subscribe(async result => {
      if(result){
      const isDeleted = await this.insuranceService.remove(row);
      if(isDeleted){
        const sort = {
          column: this.currentSortColumn,
          direction: this.currentSortDirection
        };
      
        [this.insurances,this.totalElements] = await this.insuranceService.getAll(this.currentPage,this.currentSize,sort);
        this.dataSource = new MatTableDataSource(this.insurances);
      }
      }
    });
  }
  
  

}
