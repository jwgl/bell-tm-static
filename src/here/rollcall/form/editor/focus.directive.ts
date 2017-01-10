import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
    selector: '[focus]',
    host: {
        '(document: click)': 'focus()',
    },
})
export class FocusDirective implements OnInit {
    constructor(private elementRef: ElementRef) {}

    ngOnInit() {
        this.focus();
    }

    focus() {
        setTimeout(() => this.elementRef.nativeElement.focus(), 0);
    }
}
