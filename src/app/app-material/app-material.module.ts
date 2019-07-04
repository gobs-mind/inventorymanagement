import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, MatSelectModule, MatDividerModule, MatGridListModule, MatTableModule, MatSortModule} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatDividerModule,
    MatGridListModule,
    MatTableModule,
    MatSortModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports : [
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatDividerModule,
    MatGridListModule,
    MatTableModule,
    MatSortModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AppMaterialModule { }
