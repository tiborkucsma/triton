import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectFormComponent } from './subject-form.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    SubjectFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  exports: [
    SubjectFormComponent
  ]
})
export class SubjectFormModule { }
