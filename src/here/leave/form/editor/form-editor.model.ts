import * as _ from 'lodash';

import {LeaveForm, LeaveItem} from '../../shared/form.model';
import {Schedule} from '../../../shared/schedule/schedule.model';

declare module '../../shared/form.model' {
    interface LeaveForm {
        toggleWeek(week: number): void;
        toggleDayOfWeek(week: number, dayOfWeek: number): void;
        toggleSchedule(week: number, schedule: Schedule): void;
        addItem(item: LeaveItem): void;
        removeItem(item: LeaveItem): void;
        toServerDto(): any;
        isValid(): boolean;
    }
}

LeaveForm.prototype.toggleWeek = function(this: LeaveForm, week: number): void {
    let leaveItem = new LeaveItem(this, {week});
    if (this.contains(leaveItem)) {
        this.removeItem(leaveItem);
    } else {
        this.items
            .filter(i => i.week === week)
            .forEach(i => this.removeItem(i));
        this.addItem(leaveItem);
    }
};

LeaveForm.prototype.toggleDayOfWeek = function(this: LeaveForm, week: number, dayOfWeek: number): void {
    let leaveItem = new LeaveItem(this, {week, dayOfWeek});
    if (this.contains(leaveItem)) {
        this.removeItem(leaveItem);
    } else {
        this.items
            .filter(i => i.week === week)
            .filter(i => !i.dayOfWeek && !i.schedule || i.schedule && i.schedule.dayOfWeek === dayOfWeek)
            .forEach(i => this.removeItem(i));
        this.addItem(leaveItem);
    }
};

LeaveForm.prototype.toggleSchedule = function(this: LeaveForm, week: number, schedule: Schedule): void {
    let leaveItem = new LeaveItem(this, {week});
    leaveItem.schedule = schedule;
    if (this.contains(leaveItem)) {
        this.removeItem(leaveItem);
    } else {
        this.items
            .filter(i => i.week === week)
            .filter(i => !i.dayOfWeek && !i.schedule || i.dayOfWeek === schedule.dayOfWeek)
            .forEach(i => this.removeItem(i));
        this.addItem(leaveItem);
    }
};


LeaveForm.prototype.addItem = function(this: LeaveForm, item: LeaveItem): void {
    if (this.items.find(i => i.equalsTo(item))) {
        return;
    }

    let removedItem = this.removedItems.find(i => i.equalsTo(item));
    if (removedItem) {
        this.removedItems.splice(this.removedItems.indexOf(removedItem), 1);
        this.items.push(removedItem);
    } else {
        this.items.push(item);
    }
};

LeaveForm.prototype.removeItem = function(this: LeaveForm, item: LeaveItem): void {
    let leaveItem = this.items.find(i => i.equalsTo(item));

    if (leaveItem) {
        this.items.splice(this.items.indexOf(leaveItem), 1);
        if (leaveItem.id) {
            this.removedItems.push(leaveItem);
        }
    }
};

LeaveForm.prototype.isValid = function(this: LeaveForm): boolean {
    return true;
};

LeaveForm.prototype.toServerDto = function(this: LeaveForm): any {
    if (!this.id) {
        return {
        };
    } else {
        return {
        };
    }
};
