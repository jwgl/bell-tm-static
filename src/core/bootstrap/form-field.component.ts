import {Component, ContentChild, Input} from '@angular/core';
import {FormControlDirective} from './form-control.directive';
import {FormDirective} from './form.directive';

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
    static nextId(): string {
        return `ctrl_${FormFieldComponent._id++}`;
    }

    private static _id = 1000;

    @Input() label: string;
    @Input() labelCol = 2;
    @ContentChild(FormControlDirective) formControl: FormControlDirective;

    controlId: string;
    controlCol = 10;

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
