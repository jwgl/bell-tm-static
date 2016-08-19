import {Directive} from '@angular/core';

@Directive({
    selector: '.form-group:not([nolabel])',
    host: {
        '[class.row]': 'true',
    },
})
export class FormGroupDirective {
}
