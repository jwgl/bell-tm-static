import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Rest} from '../rest';
import {BaseDialog} from './dialog';

@Component({
    selector: 'simple-list-select-dialog',
    templateUrl: 'simple-list-select.dialog.html',
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

        if (this.options.url) {
            return this.rest.get(this.options.url);
        } else {
            return null;
        }
    }

    protected onConfirmed(): any {
        return this.result;
    }
}
