import {Component, ElementRef} from 'angular2/core';
import {FormBuilder, ControlGroup} from 'angular2/common';
import {Observable} from 'rxjs/Observable';

import {MODAL_DIRECTIVES} from '../../../core/directives';
import {BaseDialog} from '../../../core/dialogs';
import {PLAN_PIPES} from '../pipes';

@Component({
    selector: 'version-dialog',
    providers: [FormBuilder],
    template: require('./version.html'),
    styles: [require('./version.scss')],
    directives: [MODAL_DIRECTIVES],
    pipes: [PLAN_PIPES],
})
export class VersionDialog extends BaseDialog {
    prev: number;
    curr: number;
    a: number;
    b: number;
    c: number;
    d: number;

    form: ControlGroup;

    constructor(elementRef: ElementRef, fb: FormBuilder) {
        super(elementRef);

        this.form = fb.group({
            a: [''],
            b: [''],
            c: [''],
            d: [''],
        }, {validator: this.validate.bind(this)});
    }

    validate(form: ControlGroup): any {
        if (!this.prev) {
            return null;
        }
        /* tslint:disable:no-string-literal */
        let a = form.controls['a'].value;
        let b = form.controls['b'].value;
        let c = form.controls['c'].value;
        let d = form.controls['d'].value;
        /* tslint:enable:no-string-literal */

        /* tslint:disable:no-bitwise */
        let newVersion = (a << 24) + (b << 16) + (c << 8) + (d << 0);
        let pa = (this.curr >> 24) & 255;
        let pb = (this.curr >> 16) & 255;
        let pc = (this.curr >>  8) & 255;
        let pd = (this.curr >>  0) & 255;
        /* tslint:enable:no-bitwise */

        return newVersion <= this.prev ? {mustGreatThan: {value: `${pa}.${pb}.${pc}.${pd}`}} : null;
    }

    /**
     * options: {prev: number, curr: number}
     */
    protected onOpening(): Observable<any>  {
        this.prev = this.options.prev;
        this.curr = this.options.curr;

        /* tslint:disable:no-bitwise */
        this.a = (this.curr >> 24) & 255;
        this.b = (this.curr >> 16) & 255;
        this.c = (this.curr >>  8) & 255;
        this.d = (this.curr >>  0) & 255;
        /* tslint:enable:no-bitwise */
        return null;
    }

    protected onConfirmed(): number {
        /* tslint:disable:no-bitwise */
        return (this.a << 24) + (this.b << 16) + (this.c << 8) + (this.d << 0);
        /* tslint:enable:no-bitwise */
    }
}
