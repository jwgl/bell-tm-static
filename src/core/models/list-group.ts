/* tslint:disable:max-classes-per-file*/
export interface StatusCounts {
    [key: string]: number;
};

export interface ListGroupOption {
    status: string;
    label: string;
    class: string;
}

export class ListGroupItem {
    status: string;
    label: string;
    class: string;
    count = 0;
    active = false;

    constructor(option: ListGroupOption) {
        this.status = option.status;
        this.label = option.label;
        this.class = option.class;
    }
}

export class ListGroup {
    items: ListGroupItem[];
    constructor(configs: ListGroupOption[]) {
        this.items = configs.map(it => new ListGroupItem(it));
    }

    update(counts: StatusCounts): void {
        this.items.forEach(item => {
            const value = counts[item.status];
            if (value !== undefined) {
                item.count = value;
            }
        });
    }

    activate(status: string) {
        const item = this.items.find(it => it.status === status);
        if (item) {
            this.items.forEach(it => it.active = false);
            item.active = true;
        }
    }
}
