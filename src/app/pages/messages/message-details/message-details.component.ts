import { Message } from '../../../shared/models/message';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.css']
})
export class MessageDetailsComponent implements OnInit {

  @Input() message?: Message;

  constructor() { }

  ngOnInit(): void {
  }

}
