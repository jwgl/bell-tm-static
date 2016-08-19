import {NgModule} from '@angular/core';

import {FormDirective} from './bootstrap/form.directive';
import {FormGroupDirective} from './bootstrap/form-group.directive';
import {FormFieldComponent} from './bootstrap/form-field.component';
import {FormControlDirective} from './bootstrap/form-control.directive';

const BOOTSTRAP_FORM_DIRECTIVES: any[] = [
    FormDirective,
    FormGroupDirective,
    FormFieldComponent,
    FormControlDirective,
];

@NgModule({
    declarations: [BOOTSTRAP_FORM_DIRECTIVES],
    exports: [BOOTSTRAP_FORM_DIRECTIVES],
})
export class BootstrapFormModule {}
