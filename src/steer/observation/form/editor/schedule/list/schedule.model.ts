import { Schedule } from 'core/components/schedule-timetable/schedule-timetable.model';

declare module 'core/components/schedule-timetable/schedule-timetable.model' {
    interface Schedule {
        superviseCount: number;
        academicTitle: string;
        department: string;
        credit: number;
        property: string;
        uniqueCompare(other: Schedule): boolean;
    }
}

Schedule.prototype.uniqueCompare = function(this: Schedule, other: Schedule): boolean {
    return this.teacherId === other.teacherId &&
           this.startWeek === other.startWeek &&
           this.endWeek === other.endWeek &&
           this.oddEven === other.oddEven &&
           this.dayOfWeek === other.dayOfWeek &&
           this.startSection === other.startSection &&
           this.totalSection === other.totalSection &&
           this.course === other.course &&
           this.courseItem === other.courseItem &&
           this.place === other.place;
};
