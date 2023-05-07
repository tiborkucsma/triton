import { Timestamp } from '@angular/fire/firestore';

export enum UserRole {
    Student = 0,
    Teacher,
    Administrator
}

export interface User {
    id: string,
    email: string,
    name: {
        firstname: string,
        lastname: string
    },
    dateOfBirth: Timestamp,
    studentCardNumber: string,
    address: string,
    role: UserRole
}