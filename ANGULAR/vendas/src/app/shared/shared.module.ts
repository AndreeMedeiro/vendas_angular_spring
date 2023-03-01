
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    ErrorDialogComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ],
  exports: [
    ErrorDialogComponent
  ]
})
export class SharedModule { }
