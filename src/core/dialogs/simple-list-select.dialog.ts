import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Rest} from '../rest';
import {BaseDialog} from './dialog';

@Component({
    selector: 'simple-list-select-dialog',
    template: require('./simple-list-select.html'),
})
export class SimpleListSelectDialog extends BaseDialog {
    result: any;
    title: string;
    valueFn = (item: any) => item.id;
    labelFn = (item: any) => item.toString();

    constructor(private rest: Rest) {
        super();
    }

    protected onOpening(): Observable<any> {
        this.title = this.options.title;
        this.valueFn = this.options.valueFn || this.valueFn;
        this.labelFn = this.options.labelFn || this.labelFn;
        return this.rest.get(this.options.url);
    }

    protected onConfirmed(): any {
        return this.result;
    }
}
