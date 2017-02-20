import {dayOfWeekText, weekRangeText} from 'core/utils';
import * as _ from 'lodash';

export interface BookingSection {
    id: number;
    name: string;
    start: number;
    total: number;
    includes: number[];
}

export const bookingSectionMap: {[key: number]: BookingSection} = {};

export class BookingForm {
    id: number;
    term: number;
    userId: string;
    userName: string;
    extraInfo: string[];
    phoneNumber: string;
    departmentId: string;
    departmentName: string;
    bookingTypeId: number;
    bookingTypeName: string;
    reason: string;
    status: string;
    workflowInstanceId: string;
    items: BookingItem[];
    removedItems: BookingItem[];

    constructor(dto: any) {
        this.id = dto.id;
        this.term = dto.term;
        this.userId = dto.userId;
        this.userName = dto.userName;
        this.extraInfo = dto.extraInfo;
        this.phoneNumber = dto.phoneNumber;
        this.departmentId = dto.departmentId;
        this.departmentName = dto.departmentName;
        this.bookingTypeId = dto.bookingTypeId;
        this.bookingTypeName = dto.bookingTypeName;
        this.reason = dto.reason;
        this.status = dto.status;
        this.workflowInstanceId = dto.workflowInstanceId;
        this.items = dto.items.map ((item: any) => new BookingItem(this, item));
        this.removedItems = [];
    }

    get title(): string {
        return this.id ? `教室借用单#${this.id}` : '教室借用单';
    }

    get occupied(): boolean {
        return _.some(this.items, it => it.occupied);
    }
}

/* tslint:disable:max-classes-per-file */
export class BookingItem {
    form: BookingForm;
    id: number;
    place: {
        id: string;
        name: string;
        seat: number;
        type: string;
    };
    startWeek: number;
    endWeek: number;
    oddEven: number;
    dayOfWeek: number;
    section: BookingSection;
    occupied: boolean;

    constructor(form: BookingForm, dto: any) {
        this.form = form;
        this.id = dto.id;
        this.place = dto.place;
        this.startWeek = dto.startWeek;
        this.endWeek = dto.endWeek;
        this.oddEven = dto.oddEven;
        this.dayOfWeek = dto.dayOfWeek;
        if (dto.sectionId) {
            this.section = bookingSectionMap[dto.sectionId];
        } else {
            this.section = dto.section;
        }
        this.occupied = dto.occupied;
    }

    toString(): string {
        return `${weekRangeText(this)} 星期${dayOfWeekText(this.dayOfWeek)} ${this.section.name} ` +
               `${this.place.name}（${this.place.type} / ${this.place.seat}座）`;
    }
}
