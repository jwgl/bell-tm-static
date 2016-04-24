import {Directive} from 'angular2/core';

@Directive({
    selector: '.form-group',
    host: {
        '[class.row]': 'true',
    },
})
export class FormGroupDirective {
}
