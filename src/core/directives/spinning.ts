import {Directive, Input} from '@angular/core';

@Directive({
    selector: '[spinning]',
    host: {
        'class': 'fa fa-spinner fa-pulse fa-fw text-success',
        '[style.visibility]': 'visible',
    },
})
export class Spinning {
    @Input() spinning: boolean;

    get visible(): string {
        return this.spinning ? 'visible' : 'hidden';
    }
}
