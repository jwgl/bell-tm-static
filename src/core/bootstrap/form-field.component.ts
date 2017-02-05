import {Component, Input, ContentChild} from '@angular/core';
import {FormDirective} from './form.directive';
import {FormControlDirective} from './form-control.directive';

@Component({
    selector: 'form-field',
    styles: ['label {white-space: nowrap}'],
    template: `
    <label [attr.for]="controlId" class="col-sm-{{labelCol}} col-form-label">{{label}}</label>
    <div class="col-sm-{{controlCol}}">
        <ng-content></ng-content>
    </div>
    `,
    host: {
        '[class.form-group]': 'true',
        '[class.row]': 'true',
    },
})
export class FormFieldComponent {
    private static _id = 1000;

    @Input() label: string;
    @Input() labelCol = 2;
    @ContentChild(FormControlDirective) formControl: FormControlDirective;

    controlId: string;
    controlCol = 10;

    static nextId(): string {
        return `ctrl_${FormFieldComponent._id++}`;
    }

    constructor() {
        this.controlId = FormFieldComponent.nextId();
    }

    ngAfterContentInit() {
        if (this.formControl) {
            if (this.formControl.col) {
                this.controlCol = this.formControl.col;
            }
            this.formControl.id = this.controlId;
        }
    }
}
