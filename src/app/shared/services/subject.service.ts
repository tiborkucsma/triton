import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subject } from '../models/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  collectionName = 'Subjects';

  constructor(private afs: AngularFirestore) { }

  private collection() {
    return this.afs.collection<Subject>(this.collectionName);
  }

  create(s: Subject) {
    return this.collection().doc(s.id).set(s);
  }

  getAll() {
    return this.collection().valueChanges();
  }

  getById(id: string) {
    return this.collection().doc(id).valueChanges();
  }

  update(s: Subject) {
    return this.collection().doc(s.id).set(s);
  }

  delete(id: string) {
    return this.collection().doc(id).delete();
  }
}
