import { Component } from '@angular/core';
import { InsuranceService } from 'src/app/services/insurance/insurance.service';
import Insurance from 'src/app/shared/model/insurance';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import {Sort} from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from 'src/app/shared/dialog/delete-confirmation/delete-confirmation.component';
import { UpdateComponent } from 'src/app/shared/dialog/update/update.component';
import ResponseHandler from 'src/app/shared/model/response';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { NotificationService } from 'src/app/services/notification/notification.service';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  insurances:Insurance[] = []
  totalElements :number = 0;
  currentPage = '0';
  currentSize = '10';
  currentSortColumn = "id"
  currentSortDirection = "asc"
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
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private insuranceService:InsuranceService,public dialog: MatDialog,private _snackBar: MatSnackBar,private notificationService:NotificationService){}

  ngOnInit(): void {
    this.getInsurances();
  }

  async getInsurances() {
    try {
      this.insuranceService.getAll(this.currentPage,this.currentSize).subscribe(([insurances, totalElements]) => {
        
        [this.insurances,this.totalElements] = [insurances, totalElements]; 
        this.dataSource = new MatTableDataSource(this.insurances);

      });

      
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


  this.insuranceService.getAll(this.currentPage,this.currentSize,sort).subscribe(([insurances, totalElements]) => {
    [this.insurances,this.totalElements] = [insurances, totalElements]; 
    this.dataSource = new MatTableDataSource(this.insurances);
  });  
  
  
}
async sortData(event:Sort){

  this.currentSortColumn = event.active
  this.currentSortDirection = event.direction
  const sort = {
    column: this.currentSortColumn,
    direction: this.currentSortDirection
  };

  this.insuranceService.getAll(this.currentPage,this.currentSize,sort).subscribe(([insurances, totalElements]) => {
    [this.insurances,this.totalElements] = [insurances, totalElements]; 
    this.dataSource = new MatTableDataSource(this.insurances);
  });  
}

async delete(row:Insurance){
  this.openDeleteDialog(row);
}
async edit(row:Insurance){
  this.openUpdateDialog(row);
}

   openDeleteDialog(row:Insurance) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);
    dialogRef.afterClosed().subscribe(async result => {
      if(result){
      this.insuranceService.remove(row).subscribe((res)=>{
        if(res.status == "OK"){
          this.notificationService.showSuccess(res)
   
           const sort = {
             column: this.currentSortColumn,
             direction: this.currentSortDirection
           };
         
           this.insuranceService.getAll(this.currentPage,this.currentSize,sort).subscribe(([insurances, totalElements]) => {
             [this.insurances,this.totalElements] = [insurances, totalElements]; 
             this.dataSource = new MatTableDataSource(this.insurances);
           });        
         }
      },
      (errorResponse) => {
        this.notificationService.showError(errorResponse);     
      })
      
      }
    });
  }

  openUpdateDialog(row:Insurance) {
    const dialogRef = this.dialog.open(UpdateComponent,{
      data:row
    });

    dialogRef.afterClosed().subscribe(async result => {
      if(result){
        const sort = {
          column: this.currentSortColumn,
          direction: this.currentSortDirection
        };
        this.insuranceService.getAll(this.currentPage,this.currentSize,sort).subscribe(([insurances, totalElements]) => {
          [this.insurances,this.totalElements] = [insurances, totalElements]; 
          this.dataSource = new MatTableDataSource(this.insurances); 
        });        
           
      }
    });
  }

 

}
