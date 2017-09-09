import {Attribute, Directive, ElementRef} from '@angular/core';

@Directive({
    selector: '.form-control,.form-control-plaintext',
})
export class FormControlDirective {
    col: number;
    constructor(
        @Attribute('col') col: string,
        private elementRef: ElementRef,
    ) {
        this.col = parseInt(col, 10);
    }

    set id(value: string) {
        this.elementRef.nativeElement.setAttribute('id', value);
    }
}
