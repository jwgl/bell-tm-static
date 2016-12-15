import {Directive, Attribute, ElementRef} from '@angular/core';

@Directive({
    selector: '.form-control,.form-control-static',
})
export class FormControlDirective {
    constructor(
        @Attribute('col') public col: string,
        private elementRef: ElementRef,
    ) {}

    set id(value: string) {
        this.elementRef.nativeElement.setAttribute('id', value);
    }
}
