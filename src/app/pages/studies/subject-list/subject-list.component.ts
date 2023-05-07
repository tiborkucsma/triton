import { Component, Input, OnInit } from '@angular/core';
import { TakenSubject } from '../../../shared/models/semester';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {

  @Input() subjects: Array<TakenSubject> = [];

  displayedColumns = ['id', 'name', 'credits', 'mark'];

  constructor() { }

  ngOnInit(): void {
  }

}
