import {Student} from '../shared/attendance.model';

declare module '../shared/attendance.model' {
    interface Student {
        subject: string;
        disqualified: boolean;
        absentOverflow: boolean;
        attendOverflow: boolean;
        showDetails: boolean;
        showDisqual: boolean;
        disqualifyButtonClass: string;
    }
}

Object.defineProperty(Student.prototype, 'showDisqual', {
    /* tslint:disable:object-literal-shorthand*/
    get: function(this: Student) {
        return this.disqualified || this.absentOverflow || this.attendOverflow;
    },
    /* tslint:enable:object-literal-shorthand*/
    enumerable: true,
    configurable: true,
});

Object.defineProperty(Student.prototype, 'disqualStatus', {
    /* tslint:disable:object-literal-shorthand*/
    get: function(this: Student) {
        if (this.absentOverflow || this.attendOverflow) {
            return this.disqualified ? '已取消' : '可取消';
        } else {
            return this.disqualified ? '可恢复' : '';
        }
    },
    /* tslint:enable:object-literal-shorthand*/
    enumerable: true,
    configurable: true,
});

Object.defineProperty(Student.prototype, 'disqualifyButtonClass', {
    /* tslint:disable:object-literal-shorthand*/
    get: function(this: Student) {
        if (this.disqualified) {
            if (this.absentOverflow || this.attendOverflow) {
                return 'btn-danger';
            } else {
                return 'btn-success';
            }
        } else {
            if (this.absentOverflow || this.attendOverflow) {
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
    teacherId: string;
    termId: number;
    activeTerm: boolean;
    students: Student[];

    absentDisqualRatio: number;
    attendDisqualRatio: number;

    constructor(dto: any) {
        this.id = dto.id;
        this.code = dto.code;
        this.name = dto.name;
        this.course = dto.course;
        this.startWeek = dto.startWeek;
        this.endWeek = dto.endWeek;
        this.department = dto.department;
        this.totalSection = dto.totalSection;
        this.teacherId = dto.teacherId;
        this.termId = dto.termId;
        this.activeTerm = dto.activeTerm;

        this.absentDisqualRatio = dto.absentDisqualRatio;
        this.attendDisqualRatio = dto.attendDisqualRatio;

        const studentMap: {[key: string]: Student} = {};
        this.students = dto.students.map((s: any) => {
            const student = new Student(s);
            student.subject = s.subject;
            student.disqualified = s.disqualified;
            student.absentOverflow = false;
            student.attendOverflow = false;
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

            student.absentOverflow = student.total > this.totalSection * this.absentDisqualRatio;
            student.attendOverflow = student.leave > this.totalSection * this.attendDisqualRatio;
            student.showDetails = true;
        });
    }
}
