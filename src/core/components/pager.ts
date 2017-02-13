import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'pager',
    styles: [
        ':host {display: block; text-align: center;}',
    ],
    template: `
    <div class="btn-group" *ngIf="length < total">
        <button class="btn btn-secondary" (click)="onPrev()" [disabled]="offset <= 0">上一页</button>
        <button class="btn btn-secondary" (click)="onNext()" [disabled]="offset + length >= total">下一页</button>
    </div>
    `,
})
export class PagerComponent {
    @Input() total: number;
    @Input() offset: number;
    @Input() length: number;
    @Input() max: number;
    @Output() next = new EventEmitter(false);
    @Output() prev = new EventEmitter(false);

    constructor() {
        this.offset = 0;
    }

    onPrev() {
        this.offset -= this.max;
        if (this.offset < 0) {
            this.offset = 0;
        }
        this.prev.emit(this.offset);
    }

    onNext() {
        this.offset += this.max;
        if (this.offset > this.total) {
            this.offset = this.total;
        }
        this.next.emit(this.offset);
    }
}
