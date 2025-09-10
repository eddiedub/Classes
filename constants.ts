import { Course, Day, Student } from './types';

export const DAYS: Day[] = [Day.Monday, Day.Tuesday, Day.Wednesday, Day.Thursday, Day.Friday];

export const TIME_SLOTS: string[] = Array.from({ length: 14 }, (_, i) => {
    const hour = i + 7;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    return `${displayHour}:00 ${ampm}`;
});

const courseDetails = {
    session: 'Session 01',
    subtype: 'Lecture',
    courseType: 'Course',
    dateDuration: '9/17/2025 - 12/23/2025',
    creditType: 'Standard Letter',
};

export const COURSES: Course[] = [
    // Eddie's Classes
    { id: 1, student: Student.Eddie, code: "HUM 318", title: "Human Rights", day: Day.Monday, startTime: "11:30", endTime: "12:45", instructor: "Liliane El Kazzi", location: "Agora Building, Floor 1, Room AG125", credits: 3.00, section: "A", daysStr: "Monday,Wednesday", ...courseDetails },
    { id: 2, student: Student.Eddie, code: "MAT 010", title: "College Algebra – Intensive", day: Day.Monday, startTime: "14:00", endTime: "15:15", instructor: "Joseph Chafic Keirouz", location: "Agora Building, Floor 2, Room AG213", credits: 0.00, section: "A", daysStr: "Monday,Wednesday", ...courseDetails },
    { id: 3, student: Student.Eddie, code: "CSC 201", title: "Int. to Information Technology", day: Day.Tuesday, startTime: "11:30", endTime: "12:45", instructor: "Miss Caline Karam", location: "Agora Building, Floor 2, Room AG212", credits: 3.00, section: "A", daysStr: "TTH", ...courseDetails },
    { id: 4, student: Student.Eddie, code: "STA 104", title: "Basic concept in Statistics", day: Day.Tuesday, startTime: "12:46", endTime: "13:59", instructor: "Mrs. Micheline Hamid Dib", location: "Agora Building, Floor 1, Room AG118", credits: 3.00, section: "A", daysStr: "TTH", ...courseDetails },
    { id: 5, student: Student.Eddie, code: "ECO 104", title: "Basic Concept of Economics", day: Day.Tuesday, startTime: "14:05", endTime: "15:15", instructor: "Mr. Wassim Chaaban", location: "Agora Building", credits: 3.00, section: "A", daysStr: "TTH", ...courseDetails },
    { id: 6, student: Student.Eddie, code: "HUM 318", title: "Human Rights", day: Day.Wednesday, startTime: "11:30", endTime: "12:45", instructor: "Liliane El Kazzi", location: "Agora Building, Floor 1, Room AG125", credits: 3.00, section: "A", daysStr: "Monday,Wednesday", ...courseDetails },
    { id: 7, student: Student.Eddie, code: "MAT 010", title: "College Algebra – Intensive", day: Day.Wednesday, startTime: "14:00", endTime: "15:15", instructor: "Joseph Chafic Keirouz", location: "Agora Building, Floor 2, Room AG213", credits: 0.00, section: "A", daysStr: "Monday,Wednesday", ...courseDetails },
    { id: 8, student: Student.Eddie, code: "CSC 201", title: "Int. to Information Technology", day: Day.Thursday, startTime: "11:30", endTime: "12:45", instructor: "Miss Caline Karam", location: "Agora Building, Floor 2, Room AG212", credits: 3.00, section: "A", daysStr: "TTH", ...courseDetails },
    { id: 9, student: Student.Eddie, code: "STA 104", title: "Basic concept in Statistics", day: Day.Thursday, startTime: "12:46", endTime: "13:59", instructor: "Mrs. Micheline Hamid Dib", location: "Agora Building, Floor 1, Room AG118", credits: 3.00, section: "A", daysStr: "TTH", ...courseDetails },
    { id: 10, student: Student.Eddie, code: "ECO 104", title: "Basic Concept of Economics", day: Day.Thursday, startTime: "14:05", endTime: "15:15", instructor: "Mr. Wassim Chaaban", location: "Agora Building", credits: 3.00, section: "A", daysStr: "TTH", ...courseDetails },

    // Elie's Classes
    { id: 11, student: Student.Elie, code: "COM 204", title: "Intro to Radio, TV & Film", day: Day.Monday, startTime: "10:00", endTime: "11:15", instructor: "Mr. Mohamed Missilmani", location: "Agora Building, Floor 2, Room ZC216", credits: 3.00, section: "A", daysStr: "Monday,Wednesday", ...courseDetails },
    { id: 12, student: Student.Elie, code: "AVP 206", title: "Principles of Directing", day: Day.Monday, startTime: "11:30", endTime: "12:45", instructor: "Mr. Mohamed Missilmani", location: "Agora Building, Floor 2, Room ZC216", credits: 3.00, section: "A", daysStr: "Monday,Wednesday", ...courseDetails },
    { id: 13, student: Student.Elie, code: "AVP 212", title: "Field Recording", day: Day.Monday, startTime: "14:00", endTime: "16:30", instructor: "Mr. Alaa Abou-Chakra", location: "Agora Building, Floor 2, Room ZC215", credits: 3.00, section: "A", daysStr: "Monday", ...courseDetails },
    { id: 14, student: Student.Elie, code: "COM 204", title: "Intro to Radio, TV & Film", day: Day.Wednesday, startTime: "10:00", endTime: "11:15", instructor: "Mr. Mohamed Missilmani", location: "Agora Building, Floor 2, Room ZC216", credits: 3.00, section: "A", daysStr: "Monday,Wednesday", ...courseDetails },
    { id: 15, student: Student.Elie, code: "AVP 206", title: "Principles of Directing", day: Day.Wednesday, startTime: "11:30", endTime: "12:45", instructor: "Mr. Mohamed Missilmani", location: "Agora Building, Floor 2, Room ZC216", credits: 3.00, section: "A", daysStr: "Monday,Wednesday", ...courseDetails },
    { id: 16, student: Student.Elie, code: "AVP 255", title: "Principles of Lighting", day: Day.Friday, startTime: "08:00", endTime: "10:29", instructor: "Dany Youssef Chedid", location: "Agora Building, Floor 2, Room ZC216", credits: 3.00, section: "A", daysStr: "Friday", ...courseDetails },

    // Shared Classes
    { id: 17, student: Student.Shared, code: "ENG 200", title: "Writing Skills", day: Day.Tuesday, startTime: "08:30", endTime: "09:45", instructor: "Nadine Joseph Bou Maachar", location: "Agora Building, Floor 1, Room AG119", credits: 3.00, section: "A1", daysStr: "TTH", ...courseDetails },
    { id: 18, student: Student.Shared, code: "ENG 200", title: "Writing Skills", day: Day.Thursday, startTime: "08:30", endTime: "09:45", instructor: "Nadine Joseph Bou Maachar", location: "Agora Building, Floor 1, Room AG119", credits: 3.00, section: "A1", daysStr: "TTH", ...courseDetails },
];
