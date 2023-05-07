import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { MessageService } from '../../shared/services/message.service';

import { Message } from '../../shared/models/message';
import { User } from '../../shared/models/user';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';

import { Timestamp } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MessageDetailsComponent } from './message-details/message-details.component';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  email = new FormControl('');
  title = new FormControl('');
  body = new FormControl('');

  messages: Array<Message> = [];

  displayedColumns = ['timestamp', 'from', 'title'];

  constructor(
    private auth: AuthService,
    private messageService: MessageService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    let userId = this.auth.user?.id;

    if (userId) {
      this.messageService.getByRecipientId(userId).subscribe(messages => {
        this.messages = messages;
      });
    }
  }

  send() {
    this.userService.getByEmail(this.email.value).subscribe(res => {
      if (!res.empty && this.auth.user) {
        this.snackBar.open('Üzenet elküldve!', '', {duration: 2000});
        this.messageService.create({
          id: '',
          from: this.userService.getRefById(this.auth.user.id) as unknown as User,
          toIdArray: [res.docs[0].data().id],
          title: this.title.value,
          body: this.body.value,
          timestamp: Timestamp.now()
        });
      } else {
        this.snackBar.open('Felhasználó nem található!', '', {duration: 2000});
      }
    });
  }

  showMessage(message: Message) {
    this.dialog.open(MessageDetailsComponent, {width: '800px', height: '600px'}).componentInstance.message = message;
  }

}
