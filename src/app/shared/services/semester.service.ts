import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { mergeMap, Observable } from 'rxjs';
import { StudentSemester, TakenSubject } from '../models/semester';
import { User } from '../models/user';
import { Subject } from '../models/subject';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SemesterService {
  collectionName = 'StudentSemesters';

  constructor(private afs: AngularFirestore, private userService: UserService) { }

  private collection() {
    return this.afs.collection<StudentSemester>(this.collectionName);
  }

  private patchStudent(value: Observable<StudentSemester[]>): Observable<StudentSemester[]> {
    return value.pipe(mergeMap(
      async sa => {
        for (let s of sa)
          s.student = (await (s.student as unknown as DocumentReference).get()).data() as User;

        return sa;
      }
    ));
  }

  private patchSubjects(value: Observable<StudentSemester[]>): Observable<StudentSemester[]> {
    return value.pipe(mergeMap(
      async sa => {
        for (let semester of sa)
          for (let e of semester.subjects)
            e.subject = (await (e.subject as unknown as DocumentReference).get()).data() as Subject;

        return sa;
      }
    ));
  }

  create(s: StudentSemester) {
    let id = this.afs.createId();
    s.id = id;
    return this.collection().doc(id).set(s);
  }

  getAll() {
    return this.collection().valueChanges().pipe(this.patchStudent).pipe(this.patchSubjects);
  }

  getById(id: string) {
    return this.collection().doc(id).valueChanges();
  }

  getByStudentId(id: string) {
    return this.afs.collection<StudentSemester>(this.collectionName, ref => ref.where('student', '==', this.userService.getRefById(id))).valueChanges().pipe(this.patchStudent).pipe(this.patchSubjects);
  }

  update(s: StudentSemester) {
    return this.collection().doc(s.id).set(s);
  }

  delete(id: string) {
    return this.collection().doc(id).delete();
  }
}
