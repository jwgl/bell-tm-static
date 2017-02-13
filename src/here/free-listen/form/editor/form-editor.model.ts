import * as _ from 'lodash';

import {Schedule, ScheduleDto} from '../../../shared/schedule/schedule.model';
import {FreeListenForm, FreeListenItem} from '../../shared/form.model';
import '../../shared/student-schedule.model';

declare module '../../../shared/schedule/schedule.model' {
    interface ScheduleDto {
        repeatType: number;
    }
}

declare module '../../shared/form.model' {
    interface FreeListenForm {
        removedItems: FreeListenItem[];
        existedItems: FreeListenItem[];

        scheduleDisabled(schedule: Schedule): boolean;

        toggleSchedule(schedule: Schedule): void;

        addItem(item: FreeListenItem): void;
        removeItem(item: FreeListenItem): void;
        toServerDto(): any;
        getAddedItems(): any[];
        isValid(): boolean;
    }

}

FreeListenForm.prototype.scheduleDisabled = function(this: FreeListenForm, schedule: Schedule): boolean {
    return schedule.repeatType === 0 // repeat course only
        || _.some(this.existedItems, it => it.schedule.id === schedule.id);
};

FreeListenForm.prototype.toggleSchedule = function(this: FreeListenForm, schedule: Schedule): void {
    const freeItem = new FreeListenItem(this, {});
    freeItem.schedule = schedule;
    if (this.contains(freeItem)) {
        this.removeItem(freeItem);
    } else {
        this.items
            .filter(it => it.schedule.courseTeacherId !== schedule.courseTeacherId)
            .forEach(it => this.removeItem(it));
        this.addItem(freeItem);
    }
};

FreeListenForm.prototype.addItem = function(this: FreeListenForm, item: FreeListenItem): void {
    if (this.items.find(it => it.equalsTo(item))) {
        return;
    }

    const removedItem = this.removedItems.find(i => i.equalsTo(item));
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
    const freeItem = this.items.find(it => it.equalsTo(item));

    if (freeItem) {
        this.items.splice(this.items.indexOf(freeItem), 1);
        if (freeItem.id) {
            this.removedItems.push(freeItem);
        }
        if (this.items.length === 0) {
            this.checkerId = undefined;
            this.checkerName = undefined;
        }
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
        addedItems: this.getAddedItems(),
        removedItems: this.id ? this.removedItems.map(it => it.id) : null,
    };
};

FreeListenForm.prototype.getAddedItems = function(this: FreeListenForm): any[] {
    return this.items.filter(it => !it.id).map(it => ({
        taskScheduleId: it.schedule.id,
    }));
};
