import {Student} from '../shared/attendance.model';

/* tslint:disable:max-classes-per-file */
export class CourseClass {
    id: string;
    code: string;
    name: string;
    course: string;
    startWeek: number;
    endWeek: number;
    department: string;
    students: Student[];
    private studentMap: {[key: string]: Student} = {};

    constructor(dto: any) {
        this.id = dto.id;
        this.code = dto.code;
        this.name = dto.name;
        this.course = dto.course;
        this.startWeek = dto.startWeek;
        this.endWeek = dto.endWeek;
        this.department = dto.department;
        this.students = dto.students.map((s: any) => new Student(s));
        this.students.forEach(s => this.studentMap[s.id] = s);
    }

    setStats(stats: any[]) {
        stats.forEach((a: any) => {
            const student = this.studentMap[a.id];
            if (!student) {
                return;
            }

            student.absent = a.absent;
            student.late = a.late;
            student.early = a.early;
            student.total = a.total;
            student.leave = a.leave;
        });
    }
}
