import {Student} from '../shared/attendance.model';

declare module '../shared/attendance.model' {
    interface Student {
        subject: string;
        disqualified: boolean;
        rollcallOverflow: boolean;
        leaveOverflow: boolean;
        showDisqual: boolean;
        showDetails: boolean;

        getDisqualButtonClass(): string;
    }
}

Student.prototype.getDisqualButtonClass = function(this: Student) {
    if (this.showDetails) {
        if (this.disqualified) {
            if (this.rollcallOverflow || this.leaveOverflow) {
                return 'btn-secondary';
            } else {
                return 'btn-success';
            }
        } else {
            return 'btn-danger';
        }
    }
};

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

    private studentMap: {[key: string]: Student} = {};

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

        this.students = dto.students.map((s: any) => {
            const student = new Student(s);
            student.subject = s.subject;
            student.disqualified = s.disqualified;
            student.rollcallOverflow = false;
            student.leaveOverflow = false;
            student.showDisqual = false;
            student.showDetails = false;
            this.studentMap[student.id] = student;
            return student;
        });

        dto.attendances.forEach((a: any) => {
            const student = this.studentMap[a.id];
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
            student.showDisqual = student.disqualified || student.rollcallOverflow || student.leaveOverflow;

            student.showDetails = true;
        });
    }
}
