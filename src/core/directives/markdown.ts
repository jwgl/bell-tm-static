import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
    selector: '[markdown]',
})
export class Markdown {
    @Input()
    options: any;
    @Input('markdown')
    text: string;

    constructor(private elementRef: ElementRef) {
    }

    ngAfterViewInit() {
        const markdown = (window as any).markdownit(this.options);
        if (this.text) {
            this.elementRef.nativeElement.innerHTML = markdown.render(this.text);
        }
    }
}
