import { Component, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from '../../shared/models/subject';
import { AuthService } from '../../shared/services/auth.service';
import { User, UserRole } from '../../shared/models/user';
import { SubjectService } from '../../shared/services/subject.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  studentRegForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    name: new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl('')
    }),
    dateOfBirth: new FormControl(Timestamp.now()),
    studentCardNumber: new FormControl(''),
    address: new FormControl(''),
  });

  constructor(
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.studentRegForm.get('email')?.addValidators([Validators.required, Validators.email]);
    this.studentRegForm.get('password')?.addValidators([Validators.required, Validators.minLength(8)]);
    this.studentRegForm.get('name.firstname')?.addValidators([Validators.required]);
    this.studentRegForm.get('name.lastname')?.addValidators([Validators.required]);
    this.studentRegForm.get('dateOfBirth')?.addValidators([Validators.required]);
    this.studentRegForm.get('studentCardNumber')?.addValidators([Validators.required]);
    this.studentRegForm.get('address')?.addValidators([Validators.required]);
  }

  save() {
    if (this.studentRegForm.valid) {
      this.authService.signup({
        id: '',
        email: this.studentRegForm.get('email')?.value,
        name: {
          firstname: this.studentRegForm.get('name.firstname')?.value,
          lastname: this.studentRegForm.get('name.lastname')?.value
        },
        dateOfBirth: Timestamp.fromDate(new Date(this.studentRegForm.get('dateOfBirth')?.value)),
        studentCardNumber: this.studentRegForm.get('studentCardNumber')?.value,
        address: this.studentRegForm.get('address')?.value,
        role: UserRole.Student
      }, this.studentRegForm.get('password')?.value || '');
    } else {
      this.snackBar.open('Hibásan kitöltött űrlap!', '', {duration: 2000});;
    }
  }

  addSubject(subject: Subject) {
    this.subjectService.create(subject);
  }

}
