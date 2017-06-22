import {Schedule, ScheduleDto, TimeslotItem} from 'core/components/schedule-timetable/schedule-timetable.model';
import {FreeListenForm, FreeListenItem} from '../../shared/form.model';

declare module 'core/components/schedule-timetable/schedule-timetable.model' {
    interface ScheduleDto {
        courseTeacherId: string;
        courseTeacherName: string;
        repeatType: number;
    }

    interface Schedule {
        courseTeacherId: string;
        courseTeacherName: string;
        repeatType: number;
    }
}

declare module '../../shared/form.model' {
    interface FreeListenForm {
        removedItems: FreeListenItem[];

        scheduleDisabled(schedule: Schedule): boolean;

        toggleSchedule(schedule: Schedule): void;
        addItem(item: FreeListenItem): void;
        removeItem(item: FreeListenItem): void;

        toServerDto(): any;
        getAddedItems(): any[];
        isValid(): boolean;
    }
}

FreeListenForm.prototype.addItem = function(this: FreeListenForm, item: FreeListenItem): void {
    const removedItem = this.removedItems.find(it => it.schedule.id === item.schedule.id);
    if (removedItem) {
        this.removedItems.splice(this.removedItems.indexOf(removedItem), 1);
        this.items.push(removedItem);
    } else {
        this.items.push(item);
        this.checkerId = item.schedule.courseTeacherId;
        this.checkerName = item.schedule.courseTeacherName;
    }
};

FreeListenForm.prototype.removeItem = function(this: FreeListenForm, item: FreeListenItem): void {
    this.items.splice(this.items.indexOf(item), 1);
    if (item.id) {
        this.removedItems.push(item);
    }
    if (this.items.length === 0) {
        this.checkerId = undefined;
        this.checkerName = undefined;
    }
};

FreeListenForm.prototype.scheduleDisabled = function(this: FreeListenForm, schedule: Schedule): boolean {
    return this.scheduleExisted(schedule) || this.atSchool && schedule.repeatType === 0;
};

FreeListenForm.prototype.toggleSchedule = function(this: FreeListenForm, schedule: Schedule): void {
    const freeItem = this.items.find(it => it.schedule.id === schedule.id);
    if (freeItem) {
        this.removeItem(freeItem);
    } else {
        this.items
            .filter(it => it.schedule.courseTeacherId !== schedule.courseTeacherId)
            .forEach(it => this.removeItem(it));
        this.addItem(new FreeListenItem({}, schedule));
    }
};

FreeListenForm.prototype.isValid = function(this: FreeListenForm): boolean {
    return this.reason
        && this.reason.length >= 10
        && this.reason.length <= 200
        && this.items.length > 0;
};

FreeListenForm.prototype.toServerDto = function(this: FreeListenForm): any {
    return {
        reason: this.reason,
        checkerId: this.checkerId,
        addedItems: this.items.filter(it => !it.id).map(it => it.schedule.id),
        removedItems: this.id ? this.removedItems.map(it => it.id) : null,
    };
};
