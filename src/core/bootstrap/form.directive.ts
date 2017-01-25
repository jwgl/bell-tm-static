import {Directive, Input} from '@angular/core';

@Directive({
    selector: 'form.form-horizontal',
})
export class FormDirective {
    @Input() colLabel = 2;
    @Input() colControll = 10;
}
