import {Directive, Attribute, ElementRef} from 'angular2/core';

@Directive({
    selector: '.form-control',
})
export class FormControlDirective {
    constructor(
        @Attribute('col') public col: string,
        private elementRef: ElementRef
        ) {
    }

    set id(value: string) {
        this.elementRef.nativeElement.setAttribute('id', value);
    }
}
