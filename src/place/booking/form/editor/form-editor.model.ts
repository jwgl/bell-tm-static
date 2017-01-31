import {BookingForm, BookingItem} from '../../shared/form.model';
import * as _ from 'lodash';

declare module '../../shared/form.model' {
    interface BookingForm {
        addItem(dto: any): void;
        removeItem(item: BookingItem): void;
        conflict(item: BookingItem): boolean;
        occupied(): boolean;
        getOcuupiedItem(): number[];
        isValid(): boolean;
        toServerDto(): any;
        getAddedItems(): any[];
    }

    interface BookingItem {
        getSectionName(): string;
    }
}

BookingForm.prototype.addItem = function(this: BookingForm, dto: any): void {
    let item = new BookingItem(this, dto);
    if (!this.conflict(item)) {
        this.items.push(item);
    }
};

BookingForm.prototype.removeItem = function (this: BookingForm, item: BookingItem): void {
    let index = this.items.indexOf(item);
    this.items.splice(index, 1);
    if (item.id) {
        this.removedItems.push(item);
    }
};

BookingForm.prototype.conflict = function(this: BookingForm, item: BookingItem): boolean {
    return this.items.some(it => {
        return it.place.id === item.place.id
            && it.dayOfWeek === item.dayOfWeek
            && it.startWeek <= item.endWeek
            && it.endWeek >= item.startWeek
            && _.intersection(it.section.includes, item.section.includes).length > 0;
    });
};

BookingForm.prototype.occupied = function(this: BookingForm): boolean {
    return this.items.some(it => it.occurpied);
};

BookingForm.prototype.getOcuupiedItem = function(this: BookingForm): number[] {
    return this.items.filter(it => it.occurpied).map(it => it.id);
};

BookingForm.prototype.isValid = function(this: BookingForm): boolean {
    return this.reason
        && this.reason.length >= 10
        && this.reason.length <= 100
        && this.items.length > 0;
};

BookingForm.prototype.toServerDto = function(this: BookingForm): any {
    return {
        departmentId: this.departmentId,
        bookingTypeId: this.bookingTypeId,
        reason: this.reason,
        addedItems: this.getAddedItems(),
        removedItems: this.id ? this.removedItems.map(it => it.id) : null,
    };
};

BookingForm.prototype.getAddedItems = function(this: BookingForm) {
    return this.items.filter(it => !it.id).map(it => ({
        placeId:     it.place.id,
        startWeek:   it.startWeek,
        endWeek:     it.endWeek,
        oddEven:     it.oddEven,
        dayOfWeek:   it.dayOfWeek,
        sectionId:   it.section.id,
    }));
};
