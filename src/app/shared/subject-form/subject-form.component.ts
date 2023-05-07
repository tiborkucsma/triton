import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from '../models/subject';

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.css']
})
export class SubjectFormComponent implements OnInit {

  @Input() inputData: Subject = {
    id: '',
    name: '',
    credits: 0,
    description: '',
    requirements: ''
  };

  @Output() onSubmit: EventEmitter<Subject> = new EventEmitter();

  subjectForm = this.createSubjectForm(this.inputData);

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) { }

  createSubjectForm(subject: Subject) {
    let formGroup = this.fb.group(subject);
    formGroup.get('id')?.addValidators([Validators.required]);
    formGroup.get('name')?.addValidators([Validators.required]);
    formGroup.get('credits')?.addValidators([Validators.required]);
    return formGroup;
  }

  ngOnInit(): void {
    this.subjectForm = this.createSubjectForm(this.inputData);
  }

  submit() {
    if (this.subjectForm.valid) {
      this.onSubmit.emit(this.subjectForm.value);
    } else {
      this.snackBar.open('Hibásan kitöltött űrlap!', '', {duration: 2000});;
    }
  }

}
