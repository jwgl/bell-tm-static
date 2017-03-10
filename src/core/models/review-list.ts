export class ReviewList {
    type: string;
    query: string;
    max: number = 10;
    offset: number = 0;
    total: number;
    items: any[];

    constructor(dto: {
        type: string,
        query: string,
        offset: number,
        total: number,
        items: any[],
    }) {
        this.type = dto.type;
        this.query = dto.query;
        this.offset = dto.offset;
        this.total = dto.total;
        this.items = dto.items;
    }

    get prevOffset(): number {
        let offset = this.offset - this.max;
        if (offset < 0) {
            offset = 0;
        }
        return offset;
    }

    get nextOffset(): number {
        let offset = this.offset + this.max;
        if (offset > this.total) {
            offset = this.total;
        }
        return offset;
    }

    get prevDisabled(): boolean {
        return this.offset === 0;
    }

    get nextDisabled(): boolean {
        return this.offset + this.items.length >= this.total;
    }

    get pagerEnabled(): boolean {
        return this.items.length < this.total;
    }

    get prevRouterLink() {
        if (this.query) {
            return {
                offset: this.prevOffset,
                query: this.query,
            };
        } else {
            return {
                offset: this.prevOffset,
            };
        }
    }

    get nextRouterLink() {
        if (this.query) {
            return {
                offset: this.nextOffset,
                query: this.query,
            };
        } else {
            return {
                offset: this.nextOffset,
            };
        }
    }
}
