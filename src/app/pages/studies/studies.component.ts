import { Component, OnInit } from '@angular/core';
import { SemesterStatus, StudentSemester } from '../../shared/models/semester';
import { SemesterService } from '../../shared/services/semester.service';
import { AuthService } from '../../shared/services/auth.service';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-studies',
  templateUrl: './studies.component.html',
  styleUrls: ['./studies.component.css']
})
export class StudiesComponent implements OnInit {

  semesters: Array<StudentSemester> = [];

  displayedColumns = ['semesterId', 'status', 'controls'];

  constructor(private auth: AuthService, private semesterService: SemesterService, private dialog: MatDialog) { }

  ngOnInit(): void {
    let userId = this.auth.user?.id;

    if (userId) {
      this.semesterService.getByStudentId(userId).subscribe(s => {
        this.semesters = s;
      });
    }
  }

  semesterStatusToString(stat: SemesterStatus) {
    switch(stat) {
        case 0: return 'Meghatározatlan';
        case 1: return 'Aktív';
        case 2: return 'Passzív';
    }
    return '';
  }

  showSubjectList(semester: StudentSemester) {
    this.dialog.open(SubjectListComponent, {width: '800px', height: '600px'}).componentInstance.subjects = semester.subjects;
  }

}
