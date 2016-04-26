import {Component} from 'angular2/core';

import {BOOTSTRAP_DIRECTIVES} from '../bootstrap';
import {MODAL_DIRECTIVES} from '../directives';
import {Rest, Observable} from '../http';
import {BaseDialog} from './dialog';

@Component({
    selector: 'simple-list-select-dialog',
    template: require('./simple-list-select.html'),
    directives: [
        MODAL_DIRECTIVES,
        BOOTSTRAP_DIRECTIVES,
    ],
})
export class SimpleListSelectDialog extends BaseDialog {
    result: string;
    valueFn: Function;
    labelFn: Function;

    constructor(private rest: Rest) {
        super();
        this.valueFn = (item: any) => item.id;
        this.labelFn = (item: any) => item.toString();
    }

    selectChanged(id: string) {
        this.result = id;
    }

    protected onOpening(): Observable<any> {
        this.valueFn = this.options.valueFn || this.valueFn;
        this.labelFn = this.options.labelFn || this.labelFn;
        return this.rest.get(this.options.url);
    }

    protected onConfirmed(): any {
        return this.result;
    }
}
