import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

import {BaseDialog} from 'core/dialogs';

import {toVersionString} from '../utils';

@Component({
    selector: 'version-dialog',
    template: require('./version.html'),
    styles: [require('./version.scss')],
})
export class VersionDialog extends BaseDialog {
    prev: number;
    curr: number;

    versionForm: FormGroup;

    constructor(private fb: FormBuilder) {
        super();
    }

    validate(form: FormGroup): any {
        if (!this.prev) {
            return null;
        }

        let newVersion = this.getValue(form);
        return newVersion <= this.prev ? {mustGreatThan: {value: toVersionString(this.prev)}} : null;
    }

    /**
     * options: {prev: number, curr: number}
     */
    protected onOpening(): Observable<any>  {
        this.prev = this.options.prev;
        this.curr = this.options.curr;

        /* tslint:disable:no-bitwise */
        this.versionForm = this.fb.group({
            a: [(this.curr >> 24) & 255],
            b: [(this.curr >> 16) & 255],
            c: [(this.curr >>  8) & 255],
            d: [(this.curr >>  0) & 255],
        }, {validator: this.validate.bind(this)});
        /* tslint:enable:no-bitwise */
        return null;
    }

    protected onConfirmed(): number {
        return this.getValue(this.versionForm);
    }

    private getValue(form: FormGroup): number {
        let a = form.controls['a'].value;
        let b = form.controls['b'].value;
        let c = form.controls['c'].value;
        let d = form.controls['d'].value;
        /* tslint:disable:no-bitwise */
        return (a << 24) + (b << 16) + (c << 8) + (d << 0);
        /* tslint:enable:no-bitwise */
    }
}
