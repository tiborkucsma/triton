import { Timestamp } from '@angular/fire/firestore';
import { User } from './user';

export interface Message {
    id: string,
    from: User,
    toIdArray: Array<string>,
    title: string,
    body: string,
    timestamp: Timestamp
}