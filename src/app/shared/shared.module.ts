import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteConfirmationComponent } from './dialog/delete-confirmation/delete-confirmation.component';

import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    DeleteConfirmationComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
  ]
})
export class SharedModule { }
