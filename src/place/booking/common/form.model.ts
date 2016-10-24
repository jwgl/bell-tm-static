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
        if (this.id) {
            return `教室借用单#${this.id}`;
        } else {
            return '教室借用单';
        }
    }
}

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
    occurpied: boolean;

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
        this.occurpied = dto.occurpied;
    }

    get weeks(): string {
        if (this.startWeek === this.endWeek) {
            return `第${this.startWeek}周`;
        } else {
            let oddEvenString = ' 单双';
            if (this.oddEven === 0) {
                return `${this.startWeek}-${this.endWeek}周`;
            } else {
                return `${this.startWeek}-${this.endWeek}周（${oddEvenString[this.oddEven]}）`;
            }
        }
    }
}
