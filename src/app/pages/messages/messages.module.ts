import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesComponent } from './messages.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MessageDetailsComponent } from './message-details/message-details.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    MessagesComponent,
    MessageDetailsComponent
  ],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatSnackBarModule,
    MatCardModule,
    MatDialogModule,
    FlexLayoutModule
  ]
})
export class MessagesModule {}
