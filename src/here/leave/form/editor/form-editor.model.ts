import * as _ from 'lodash';

import {Schedule} from 'core/models';

import {LeaveForm, LeaveItem} from '../../shared/form.model';

declare module '../../shared/form.model' {
    interface LeaveForm {
        removedItems: LeaveItem[];
        existedItems: LeaveItem[];

        toggleWeek(week: number): void;
        toggleDayOfWeek(week: number, dayOfWeek: number): void;
        toggleSchedule(week: number, schedule: Schedule): void;

        weekDisabled(week: number): boolean;
        dayOfWeekDisabled(week: number, dayOfWeek: number): boolean;
        scheduleDisabled(week: number, schedule: Schedule): boolean;

        addItem(item: LeaveItem): void;
        removeItem(item: LeaveItem): void;
        toServerDto(): any;
        getAddedItems(): any[];
        isValid(): boolean;
    }
}

LeaveForm.prototype.toggleWeek = function(this: LeaveForm, week: number): void {
    const leaveItem = new LeaveItem(this, {week});
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
    const leaveItem = new LeaveItem(this, {week, dayOfWeek});
    if (this.contains(leaveItem)) {
        this.removeItem(leaveItem);
    } else {
        this.items
            .filter(it => it.week === week)
            .filter(it => !it.dayOfWeek && !it.schedule || it.schedule && it.schedule.dayOfWeek === dayOfWeek)
            .forEach(it => this.removeItem(it));
        this.addItem(leaveItem);
    }
};

LeaveForm.prototype.toggleSchedule = function(this: LeaveForm, week: number, schedule: Schedule): void {
    const leaveItem = new LeaveItem(this, {week});
    leaveItem.schedule = schedule;
    if (this.contains(leaveItem)) {
        this.removeItem(leaveItem);
    } else {
        this.items
            .filter(it => it.week === week)
            .filter(it => !it.dayOfWeek && !it.schedule || it.dayOfWeek === schedule.dayOfWeek)
            .forEach(it => this.removeItem(it));
        this.addItem(leaveItem);
    }
};

LeaveForm.prototype.weekDisabled = function(this: LeaveForm, week: number): boolean {
    return _.some(this.existedItems, it => it.week === week);
};

LeaveForm.prototype.dayOfWeekDisabled = function(this: LeaveForm, week: number, dayOfWeek: number): boolean {
    return _.some(this.existedItems, it => it.week === week && (
        !it.dayOfWeek && !it.schedule ||
        it.dayOfWeek && it.dayOfWeek === dayOfWeek ||
        it.schedule && it.schedule.dayOfWeek === dayOfWeek));
};

LeaveForm.prototype.scheduleDisabled = function(this: LeaveForm, week: number, schedule: Schedule): boolean {
    return _.some(this.existedItems, it => it.week === week && (
        !it.dayOfWeek && !it.schedule ||
        it.dayOfWeek && it.dayOfWeek === schedule.dayOfWeek ||
        it.schedule && it.schedule.id === schedule.id));
};

LeaveForm.prototype.addItem = function(this: LeaveForm, item: LeaveItem): void {
    if (this.items.find(it => it.equalsTo(item))) {
        return;
    }

    const removedItem = this.removedItems.find(i => i.equalsTo(item));
    if (removedItem) {
        this.removedItems.splice(this.removedItems.indexOf(removedItem), 1);
        this.items.push(removedItem);
    } else {
        this.items.push(item);
    }
};

LeaveForm.prototype.removeItem = function(this: LeaveForm, item: LeaveItem): void {
    const leaveItem = this.items.find(it => it.equalsTo(item));

    if (leaveItem) {
        this.items.splice(this.items.indexOf(leaveItem), 1);
        if (leaveItem.id) {
            this.removedItems.push(leaveItem);
        }
    }
};

LeaveForm.prototype.isValid = function(this: LeaveForm): boolean {
    return this.reason
        && this.reason.length >= 10
        && this.reason.length <= 200
        && this.items.length > 0;
};

LeaveForm.prototype.toServerDto = function(this: LeaveForm): any {
    return {
        type: this.type,
        reason: this.reason,
        addedItems: this.getAddedItems(),
        removedItems: this.id ? this.removedItems.map(it => it.id) : null,
    };
};

LeaveForm.prototype.getAddedItems = function(this: LeaveForm): any[] {
    return this.items.filter(it => !it.id).map(it => ({
        week: it.week,
        dayOfWeek: it.dayOfWeek,
        taskScheduleId: it.schedule ? it.schedule.id : null,
    }));
};
