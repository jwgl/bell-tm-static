import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

import {Subject} from 'rxjs/Subject';

@Component({
    selector: 'expend',
    template: '<i (click)="click()" class="fa fa-1x fa-fw" [ngClass]="getClass()"></i>',
})
export class ExpendComponent {
    @Input() enabled = false;
    @Input() expended = false;
    @Output() toggle = new EventEmitter<Subject<void>>();
    progressing = false;
    completed = new Subject<void>();

    constructor() {
        this.completed.subscribe(() => {
            if (this.progressing) {
                this.progressing = false;
                this.expended = true;
            }
        });
    }

    click(): void {
        if (!this.enabled) {
            return;
        }

        if (this.expended) {
            this.expended = false;
        } else {
            this.progressing = true;
            this.toggle.emit(this.completed);
        }
    }

    getClass(): string {
        return !this.enabled
               ? ''
               : this.progressing
               ? 'fa-spinner fa-pulse '
               : this.expended
               ? 'fa-minus-square-o'
               : 'fa-plus-square-o';
    }
}
