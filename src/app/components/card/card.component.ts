import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { InsuranceService } from 'src/app/services/insurance/insurance.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
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


  constructor(private insuranceService:InsuranceService,public dialog: MatDialog,private _snackBar: MatSnackBar,private notificationService:NotificationService){}


  ngOnInit(): void {
    this.getInsurances();
  }

  getInsurances() {
 
      this.insuranceService.getAll(this.currentPage,this.currentSize).subscribe(([insurances, totalElements]) => {
        [this.insurances,this.totalElements] = [insurances, totalElements]; 
      });   
}
 nextPage(event: PageEvent) {

  this.currentPage = event.pageIndex.toString();
  this.currentSize = event.pageSize.toString();

  const sort = {
    column: this.currentSortColumn,
    direction: this.currentSortDirection
  };

  this.insuranceService.getAll(this.currentPage,this.currentSize, sort).subscribe(([insurances, totalElements]) => {
    [this.insurances,this.totalElements] = [insurances, totalElements]; 
  });
  
}
showMore: { [key: number]: boolean } = {}; 

  toggleShowMore(insuranceId: number): void {
    this.showMore[insuranceId] = !this.showMore[insuranceId];
  }
  
   delete(row:Insurance){
    this.openDeleteDialog(row);
  }
   edit(row:Insurance){
    this.openUpdateDialog(row);
  }
  
     openDeleteDialog(row:Insurance) {
      const dialogRef = this.dialog.open(DeleteConfirmationComponent);
  
      dialogRef.afterClosed().subscribe(async result => {
        if(result){
        this.insuranceService.remove(row).subscribe(
          (res) =>{
            if(res.status == "OK"){
              this.notificationService.showSuccess(res);
        
              const sort = {
                column: this.currentSortColumn,
                direction: this.currentSortDirection
              };
            
              this.insuranceService.getAll(this.currentPage,this.currentSize,sort).subscribe(([insurances, totalElements]) => {
                [this.insurances,this.totalElements] = [insurances, totalElements]; 
              });
             
            }

          },
          (errorResponse) => {
            this.notificationService.showError(errorResponse);     
          }
        )
        
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
          });     
        }
      });
    }
}
