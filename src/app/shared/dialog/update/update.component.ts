import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import Insurance from '../../model/insurance';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Insurance,
    public dialogRef: MatDialogRef<UpdateComponent>,
  ) {}
  
  closeDialog(){
    this.dialogRef.close(true);
  }
  cancelDialog(){
    this.dialogRef.close();
  }
}
