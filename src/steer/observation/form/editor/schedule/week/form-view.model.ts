import { Schedule, Timeslot, TimeslotItem } from 'core/components/schedule-timetable/schedule-timetable.model';

import * as _ from 'lodash';

declare module 'core/components/schedule-timetable/schedule-timetable.model' {
    interface Schedule {
        superviseCount: number;
        academicTitle: string;
        department: string;
        property: string;
        cantObserver: boolean;
    }

    interface TimeslotItem {
        getDepartment(): string;
        getAcademicTitle(): string;
        getProperty(): string;
        getPermission(): boolean;
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

TimeslotItem.prototype.getProperty = function(this: TimeslotItem): string {
    return _.chain(this.schedules).map(data => data.property).uniq().join(',').value();
};

TimeslotItem.prototype.getPermission = function(this: TimeslotItem): boolean {
    return this.schedules[0].cantObserver;
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
        return this.items[0].schedules[0].cantObserver ? 'slotitem-normal shadow-none' : 'slotitem-normal';
    }
};
