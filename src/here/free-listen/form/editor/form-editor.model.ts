import * as _ from 'lodash';

import {FreeForm, FreeItem} from '../../shared/form.model';
import {Schedule} from '../../../shared/schedule/schedule.model';
import '../../shared/student-schedule.model';

declare module '../../shared/form.model' {
    interface FreeForm {
        removedItems: FreeItem[];
        existedItems: FreeItem[];

        scheduleDisabled(schedule: Schedule): boolean;

        toggleSchedule(schedule: Schedule): void;

        addItem(item: FreeItem): void;
        removeItem(item: FreeItem): void;
        toServerDto(): any;
        getAddedItems(): any[];
        isValid(): boolean;
    }
}

FreeForm.prototype.scheduleDisabled = function(this: FreeForm, schedule: Schedule): boolean {
    return schedule.repeatType === 0 // repeat course only
        || _.some(this.existedItems, it => it.schedule.id === schedule.id);
};

FreeForm.prototype.toggleSchedule = function(this: FreeForm, schedule: Schedule): void {
    let freeItem = new FreeItem(this, {});
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

FreeForm.prototype.addItem = function(this: FreeForm, item: FreeItem): void {
    if (this.items.find(it => it.equalsTo(item))) {
        return;
    }

    let removedItem = this.removedItems.find(i => i.equalsTo(item));
    if (removedItem) {
        this.removedItems.splice(this.removedItems.indexOf(removedItem), 1);
        this.items.push(removedItem);
    } else {
        this.items.push(item);
        this.checkerId = item.schedule.courseTeacherId;
        this.checkerName = item.schedule.courseTeacherName;
    }
};

FreeForm.prototype.removeItem = function(this: FreeForm, item: FreeItem): void {
    let freeItem = this.items.find(it => it.equalsTo(item));

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

FreeForm.prototype.isValid = function(this: FreeForm): boolean {
    return this.reason
        && this.reason.length >= 10
        && this.reason.length <= 200
        && this.items.length > 0;
};

FreeForm.prototype.toServerDto = function(this: FreeForm): any {
    return {
        reason: this.reason,
        checkerId: this.checkerId,
        addedItems: this.getAddedItems(),
        removedItems: this.id ? this.removedItems.map(it => it.id) : null,
    };
};

FreeForm.prototype.getAddedItems = function(this: FreeForm): any[] {
    return this.items.filter(it => !it.id).map(it => ({
        taskScheduleId: it.schedule.id,
    }));
};
