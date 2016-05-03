import {Directive} from '@angular/core';

@Directive({
    selector: '.form-group',
    host: {
        '[class.row]': 'true',
    },
})
export class FormGroupDirective {
}
