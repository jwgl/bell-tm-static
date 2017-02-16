export class BookingReport {
    static fromDto(dto: any): BookingReport {
        const report = new BookingReport();
        report.id = dto.id;
        report.creator = dto.creator;
        report.dateCreated = dto.dateCreated;
        report.modifier = dto.modifier;
        report.dateModified = dto.dateModified;
        report.items = dto.items;
        report.removedItems = [];
        return report;
    }

    static create(): BookingReport {
        const report = new BookingReport();
        report.items = [];
        report.removedItems = [];
        return report;
    }

    id: number;
    creator: string;
    dateCreated: string;
    modifier: string;
    dateModified: string;

    items: any[];
    private removedItems: any[];

    addItem(item: any): void {
        const index = this.items.findIndex(it => it.formId === item.formId);
        if (index !== -1) {
            return;
        }

        const removedIndex = this.removedItems.findIndex(it => it.formId === item.formId);
        if (removedIndex === -1) {
            this.items.push(Object.create(item));
        } else {
            const removedItem = this.removedItems[removedIndex];
            this.removedItems.splice(removedIndex, 1);
            this.items.push(removedItem);
        }
    }

    removeItem(formId: any): void {
        const index = this.items.findIndex(it => it.formId === formId);
        if (index === -1) {
            return;
        }

        const item = this.items[index];
        this.items.splice(index, 1);
        if (item.id) {
            this.removedItems.push(item);
        }
    }

    toServerDto(): any {
        if (this.id) {
            return {
                addedItems: this.items.filter(it => !it.id).map(it => it.formId),
                removedItems: this.removedItems.map(it => it.formId),
            };
        } else {
            return {
                addedItems: this.items.map(it => it.formId),
            };
        }
    }
}
