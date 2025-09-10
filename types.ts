export enum Day {
    Monday = 'Monday',
    Tuesday = 'Tuesday',
    Wednesday = 'Wednesday',
    Thursday = 'Thursday',
    Friday = 'Friday',
}

export enum Student {
    Eddie = 'Eddie',
    Elie = 'Elie',
    Shared = 'Shared',
}

export interface Course {
    id: number;
    student: Student;
    code: string;
    title: string;
    day: Day;
    startTime: string; // "HH:mm"
    endTime: string; // "HH:mm"
    instructor: string;
    location: string;
    credits: number;
    section: string;
    session: string;
    subtype: string;
    courseType: string;
    dateDuration: string;
    creditType: string;
    daysStr: string;
}
