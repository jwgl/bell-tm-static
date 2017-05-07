/* tslint:disable:max-classes-per-file*/
export interface ListCounts {
    [key: string]: number;
}

export interface ListOption {
    type: string;
    label: string;
    class: string;
}

export class ListGroupItem {
    type: string;
    label: string;
    class: string;
    count = 0;
    active = false;

    constructor(option: ListOption) {
        this.type = option.type;
        this.label = option.label;
        this.class = option.class;
    }
}

export class ListGroup {
    items: ListGroupItem[];
    constructor(configs: ListOption[]) {
        this.items = configs.map(it => new ListGroupItem(it));
    }

    update(counts: ListCounts): void {
        this.items.forEach(item => {
            item.count = counts[item.type] || 0;
        });
    }

    activate(status: string) {
        const item = this.items.find(it => it.type === status);
        if (item) {
            this.items.forEach(it => it.active = false);
            item.active = true;
        }
    }
}
