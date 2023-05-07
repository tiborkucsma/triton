import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Message } from '../models/message';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  collectionName = 'Messages';

  constructor(private afs: AngularFirestore) { }

  private collection() {
    return this.afs.collection<Message>(this.collectionName);
  }

  private patchMessageSender(value: Observable<Message[]>): Observable<Message[]> {
    return new Observable(
      sub => 
        value.subscribe(async messages => {
          for (let msg of messages)
            msg.from = (await(msg.from as unknown as DocumentReference).get()).data() as User;

          sub.next(messages);
        })
    );
  }

  create(msg: Message) {
    let id = this.afs.createId();
    msg.id = id;
    return this.collection().doc(id).set(msg);
  }

  getAll() {
    return this.collection().valueChanges().pipe(this.patchMessageSender);
  }

  getById(id: string) {
    return this.collection().doc(id).valueChanges();
  }

  getByRecipientId(id: string) {
    return this.afs.collection<Message>(this.collectionName, ref => ref.where('toIdArray', 'array-contains', id).orderBy('timestamp', 'desc')).valueChanges().pipe(this.patchMessageSender);
  }

  update(msg: Message) {
    return this.collection().doc(msg.id).set(msg);
  }

  delete(id: string) {
    return this.collection().doc(id).delete();
  }
}
