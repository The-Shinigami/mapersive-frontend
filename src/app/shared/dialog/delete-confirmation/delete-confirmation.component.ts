import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css']
})


export class DeleteConfirmationComponent {
  constructor(
    public dialogRef: MatDialog,
  ) {}
  openDialog() {
    this.dialogRef.open(DeleteConfirmationComponent);
  }

}
