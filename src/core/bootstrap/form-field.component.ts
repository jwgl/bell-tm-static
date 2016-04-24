import {Component, Input, ContentChild} from 'angular2/core';
import {FormDirective} from './form.directive';
import {FormControlDirective} from './form-control.directive';

@Component({
    selector: 'form-field',
    template: `
    <label [attr.for]="controlId" class="col-sm-{{labelCol}} form-control-label">{{label}}</label>
    <div class="col-sm-{{controlCol}}">
        <ng-content></ng-content>
    </div>
    `,
})
export class FormFieldComponent {
    private static _id = 0;

    @Input() label: string;
    @Input() labelCol: string;
    @ContentChild(FormControlDirective) formControl: FormControlDirective;

    controlId: string;
    controlCol: string;

    constructor(private formDirective: FormDirective) {
        this.controlId = `ctrl_${FormFieldComponent._id++}`;
    }

    ngOnInit() {
        if (!this.labelCol) {
            this.labelCol = this.formDirective ? this.formDirective.colLabel : '2';
        }
        this.controlCol = this.formDirective ? this.formDirective.colControll : '10';
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
