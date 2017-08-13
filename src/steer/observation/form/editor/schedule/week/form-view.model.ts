import { Schedule, Timeslot, TimeslotItem } from 'core/components/schedule-timetable/schedule-timetable.model';

declare module 'core/components/schedule-timetable/schedule-timetable.model' {
    interface Schedule {
        superviseCount: number;
        academicTitle: string;
        department: string;
    }

    interface TimeslotItem {
        getDepartment(): string;
        getAcademicTitle(): string;
    }

    interface Timeslot {
        getTeacherId(): string;
        getObservationClass(): string;
    }
}

TimeslotItem.prototype.getDepartment = function(this: TimeslotItem): string {
    return this.schedules[0].department;
};

TimeslotItem.prototype.getAcademicTitle = function(this: TimeslotItem): string {
    return this.schedules[0].academicTitle;
};

Timeslot.prototype.getTeacherId = function(this: Timeslot): string {
    return this.items[0].schedules[0].teacherId;
};

Timeslot.prototype.getObservationClass = function(this: Timeslot): string {
    const superviseCount = this.items[0].schedules[0].superviseCount;
    if (superviseCount === 2) {
        return 'slotitem-other';
    } else if (superviseCount > 2) {
        return 'slotitem-current';
    } else {
        return 'slotitem-normal';
    }
};
