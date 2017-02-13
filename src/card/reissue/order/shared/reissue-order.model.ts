import * as _ from 'lodash';

export class ReissueOrder {
    static fromDto(dto: any): ReissueOrder {
        const order = new ReissueOrder();
        order.id = dto.id;
        order.creatorName = dto.creatorName;
        order.dateCreated = dto.dateCreated;
        order.modifierName = dto.modifierName;
        order.dateModified = dto.dateModified;
        order.items = dto.items;
        order.removedItems = [];
        return order;
    }

    static create(): ReissueOrder {
        const order = new ReissueOrder();
        order.items = [];
        order.removedItems = [];
        return order;
    }

    id: number;
    creatorName: string;
    dateCreated: string;
    modifierName: string;
    dateModified: string;

    items: any[];
    private removedItems: any[];

    get allFinished(): boolean {
        return this.items.every(item => item.status === 'FINISHED');
    }

    addItem(form: any): void {
        const index = _.findIndex(this.items, (item) => item.formId === form.id);
        const removedIndex = _.findIndex(this.removedItems, item => item.formId === form.id);

        if (index !== -1) {
            return;
        }

        if (removedIndex === -1) {
            // 构造新Item, form的id转换成formId
            const item = _.mapKeys(form as _.Dictionary<any>, (value, key) => key === 'id' ? 'formId' : key);
            this.items.push(item);
        } else {
            // 重新加入已删除的Item
            const removedItem = this.removedItems[removedIndex];
            this.removedItems.splice(removedIndex, 1);
            this.items.push(removedItem);
        }
    }

    removeItem(formId: any): void {
        const index = _.findIndex(this.items, item => item.formId === formId);

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
                addedItems: this.items.filter(item => !item.id).map(item => ({formId: item.formId})),
                removedItems: this.removedItems.map(item => ({id: item.id, formId: item.formId})),
            };
        } else {
            return {
                addedItems: this.items.map(item => ({formId: item.formId})),
            };
        }
    }
}
