import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  collectionName = 'Users';

  constructor(private afs: AngularFirestore) { }

  private collection() {
    return this.afs.collection<User>(this.collectionName);
  }

  create(user: User) {
    return this.collection().doc(user.id).set(user);
  }

  getAll() {
    return this.collection().valueChanges();
  }

  getById(id: string) {
    return this.collection().doc(id).valueChanges();
  }

  getByEmail(email: string) {
    return this.afs.collection<User>(this.collectionName, ref => ref.where('email', '==', email).limit(1)).get();
  }

  update(user: User) {
    return this.collection().doc(user.id).set(user);
  }

  delete(id: string) {
    return this.collection().doc(id).delete();
  }

  getRefById(id: string) {
    return this.collection().doc(id).ref;
  }
}
