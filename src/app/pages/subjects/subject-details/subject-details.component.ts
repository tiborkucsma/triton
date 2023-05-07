import { Component, Input, OnInit } from '@angular/core';
import { Subject } from '../../../shared/models/subject';

@Component({
  selector: 'app-subject-details',
  templateUrl: './subject-details.component.html',
  styleUrls: ['./subject-details.component.css']
})
export class SubjectDetailsComponent implements OnInit {

  @Input() subject?: Subject;

  constructor() { }

  ngOnInit(): void {
  }

}
