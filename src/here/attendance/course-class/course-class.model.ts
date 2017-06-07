import {Student} from '../shared/attendance.model';

declare module '../shared/attendance.model' {
    interface Student {
        subject: string;
        disqualified: boolean;
        rollcallOverflow: boolean;
        leaveOverflow: boolean;
        showDetails: boolean;
        showDisqual: boolean;
        disqualifyButtonClass: string;
    }
}

Object.defineProperty(Student.prototype, 'showDisqual', {
    /* tslint:disable:object-literal-shorthand*/
    get: function(this: Student) {
        return this.disqualified || this.rollcallOverflow || this.leaveOverflow;
    },
    /* tslint:enable:object-literal-shorthand*/
    enumerable: true,
    configurable: true,
});

Object.defineProperty(Student.prototype, 'disqualifyButtonClass', {
    /* tslint:disable:object-literal-shorthand*/
    get: function(this: Student) {
        if (this.disqualified) {
            if (this.rollcallOverflow || this.leaveOverflow) {
                return 'btn-danger';
            } else {
                return 'btn-success';
            }
        } else {
            if (this.rollcallOverflow || this.leaveOverflow) {
                return 'btn-warning';
            } else {
                return 'btn-secondary';
            }
        }
    },
    /* tslint:enable:object-literal-shorthand*/
    enumerable: true,
    configurable: true,
});

export class CourseClass {
    id: string;
    code: string;
    name: string;
    course: string;
    startWeek: number;
    endWeek: number;
    department: string;
    totalSection: number;
    students: Student[];

    rollcallDisqualRatio: number;
    leaveDisqualRatio: number;

    constructor(dto: any) {
        this.id = dto.id;
        this.code = dto.code;
        this.name = dto.name;
        this.course = dto.course;
        this.startWeek = dto.startWeek;
        this.endWeek = dto.endWeek;
        this.department = dto.department;
        this.totalSection = dto.totalSection;

        this.rollcallDisqualRatio = dto.rollcallDisqualRatio;
        this.leaveDisqualRatio = dto.leaveDisqualRatio;

        const studentMap: {[key: string]: Student} = {};
        this.students = dto.students.map((s: any) => {
            const student = new Student(s);
            student.subject = s.subject;
            student.disqualified = s.disqualified;
            student.rollcallOverflow = false;
            student.leaveOverflow = false;
            student.showDetails = false;
            studentMap[student.id] = student;
            return student;
        });

        dto.attendances.forEach((a: any) => {
            const student = studentMap[a.id];
            if (!student) {
                return;
            }

            student.absent = a.absent;
            student.late = a.late;
            student.early = a.early;
            student.total = a.total;
            student.leave = a.leave;

            student.rollcallOverflow = student.total > this.totalSection / this.rollcallDisqualRatio;
            student.leaveOverflow = student.leave > this.totalSection / this.leaveDisqualRatio;
            student.showDetails = true;
        });
    }
}
