import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRole } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SubjectFormComponent } from 'src/app/shared/subject-form/subject-form.component';
import { Subject } from '../../shared/models/subject';
import { SubjectService } from '../../shared/services/subject.service';
import { SubjectDetailsComponent } from './subject-details/subject-details.component';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  subjects: Array<Subject> = [];

  displayedColumns = ['id', 'name', 'credits', 'controls'];

  constructor(private subjectService: SubjectService, private dialog: MatDialog, private auth: AuthService) { }

  ngOnInit(): void {
    this.subjectService.getAll().subscribe(subjects => this.subjects = subjects);
  }

  showSubjectDetails(subject: Subject) {
    this.dialog.open(SubjectDetailsComponent, {width: '800px', height: '600px'}).componentInstance.subject = subject;
  }

  editSubject(subject: Subject) {
    let d = this.dialog.open(SubjectFormComponent, { width: '800px', height: '600px' });
    let inst = d.componentInstance;
    inst.inputData = subject;
    inst.onSubmit.subscribe(subject => {
      this.subjectService.update(subject);
      d.close();
    });
  }

  deleteSubject(subject: Subject) {
    this.subjectService.delete(subject.id);
  }

  userHasAdminRole() {
    return this.auth.userHasRole(UserRole.Administrator);
  }

}
