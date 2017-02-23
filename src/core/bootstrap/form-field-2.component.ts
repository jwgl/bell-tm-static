import {Component, ContentChild, Directive, Input} from '@angular/core';
import {FormControlDirective} from './form-control.directive';
import {FormFieldComponent} from './form-field.component';
import {FormDirective} from './form.directive';

@Directive({
    selector: '.form-field-left',
})
export class FormFieldLeftDirective {
    @Input() label: string;
    @Input() labelCol = 2;
    @ContentChild(FormControlDirective) formControl: FormControlDirective;

    controlId: string;
    controlCol = 4;

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

/* tslint:disable:max-classes-per-file */
@Directive({
    selector: '.form-field-right',
})
export class FormFieldRightDirective {
    @Input() label: string;
    @Input() labelCol = 2;
    @ContentChild(FormControlDirective) formControl: FormControlDirective;

    controlId: string;
    controlCol = 4;

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

@Component({
    selector: 'form-field-2',
    styles: ['label {white-space: nowrap}'],
    template: `
    <label *ngIf="left" [attr.for]="left.controlId" class="col-sm-{{left.labelCol}} col-form-label">{{left.label}}</label>
    <div *ngIf="left" class="col-sm-{{left.controlCol}}">
        <ng-content select=".form-field-left"></ng-content>
    </div>
    <label *ngIf="right" [attr.for]="right.controlId" class="col-sm-{{right.labelCol}} col-form-label">{{right.label}}</label>
    <div *ngIf="right" class="col-sm-{{right.controlCol}}">
        <ng-content select=".form-field-right"></ng-content>
    </div>
    `,
    host: {
        '[class.form-group]': 'true',
        '[class.row]': 'true',
    },
})
export class FormField2Component {
    @ContentChild(FormFieldLeftDirective) left: FormFieldLeftDirective;
    @ContentChild(FormFieldRightDirective) right: FormFieldRightDirective;
}
