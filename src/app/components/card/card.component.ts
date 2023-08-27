import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { InsuranceService } from 'src/app/services/insurance.service';
import { DeleteConfirmationComponent } from 'src/app/shared/dialog/delete-confirmation/delete-confirmation.component';
import { UpdateComponent } from 'src/app/shared/dialog/update/update.component';
import Insurance from 'src/app/shared/model/insurance';
import ResponseHandler from 'src/app/shared/model/response';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  insurances:Insurance[] = []
  totalElements :number = 0;
  currentPage = '0';
  currentSize = '6';
  currentSortColumn = "id"
  currentSortDirection = "asc"
  
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';


  constructor(private insuranceService:InsuranceService,public dialog: MatDialog,private _snackBar: MatSnackBar){}


  ngOnInit(): void {
    this.getInsurances();
  }

  async getInsurances() {
    try {
      [this.insurances,this.totalElements] = await this.insuranceService.getAll(this.currentPage,this.currentSize);


      
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
  
}
showMore: { [key: number]: boolean } = {}; // Object to track expanded states

  toggleShowMore(insuranceId: number): void {
    this.showMore[insuranceId] = !this.showMore[insuranceId];
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
        const res : ResponseHandler = await this.insuranceService.remove(row);
        if(res.status == "OK"){
          let config = new MatSnackBarConfig();
          config.duration = 1500;
          config.horizontalPosition = this.horizontalPosition;
          config.verticalPosition = this.verticalPosition;
    
          this._snackBar.open(res.payload, 'Close',config);
          const sort = {
            column: this.currentSortColumn,
            direction: this.currentSortDirection
          };
        
          [this.insurances,this.totalElements] = await this.insuranceService.getAll(this.currentPage,this.currentSize,sort);
         
        }
        }
      });
    }
  
    openUpdateDialog(row:Insurance) {
      const dialogRef = this.dialog.open(UpdateComponent,{
        data:row
      });
  
      dialogRef.afterClosed().subscribe(async result => {
        if(result){
          console.log(result)
          const sort = {
            column: this.currentSortColumn,
            direction: this.currentSortDirection
          };
          [this.insurances,this.totalElements] = await this.insuranceService.getAll(this.currentPage,this.currentSize,sort);
     
        }
      });
    }
}
