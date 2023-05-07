import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectsRoutingModule } from './subjects-routing.module';
import { SubjectsComponent } from './subjects.component';
import { SubjectDetailsComponent } from './subject-details/subject-details.component';
import { SubjectFormModule } from 'src/app/shared/subject-form/subject-form.module';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    SubjectsComponent,
    SubjectDetailsComponent
  ],
  imports: [
    CommonModule,
    SubjectsRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatSnackBarModule,
    FlexLayoutModule,
    MatDialogModule,
    MatCardModule,
    SubjectFormModule
  ]
})
export class SubjectsModule { }
