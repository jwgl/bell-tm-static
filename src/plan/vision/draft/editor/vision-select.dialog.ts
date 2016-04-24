import {Component, ElementRef} from 'angular2/core';

import {BOOTSTRAP_DIRECTIVES} from '../../../../core/bootstrap';
import {MODAL_DIRECTIVES} from '../../../../core/directives';
import {BaseDialog} from '../../../../core/dialogs';
import {Rest, Observable} from '../../../../core/http';

@Component({
    selector: 'vision-select-dialog',
    template: require('./vision-select.html'),
    directives: [
        MODAL_DIRECTIVES,
        BOOTSTRAP_DIRECTIVES,
    ],
})
export class VisionSelectDialog extends BaseDialog {
    result: string;

    constructor(elementRef: ElementRef, private rest: Rest) {
        super(elementRef);
    }

    protected onOpening(): Observable<any> {
        return this.rest.get(`/api/departments/${this.options.departmentId}/visions`);
    }

    protected onConfirmed(): any {
        return this.result;
    }

    selectChanged(id: string) {
        this.result = id;
    }
}
