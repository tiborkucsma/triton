import { User } from "./user";
import { Subject } from "./subject";

export enum SemesterStatus {
    Unknown = 0,
    Active,
    Passive,
}

export interface TakenSubject {
    subject: Subject,
    mark: number
}

export interface StudentSemester {
    id: string,
    semesterId: {
        year1: number,
        year2: number,
        half: number
    },
    student: User,
    status: SemesterStatus,
    subjects: Array<TakenSubject>
}