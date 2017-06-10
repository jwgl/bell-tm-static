import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
    selector: 'button[scheme-show-diff]',
    host: {
        '(click)': 'click()',
        '[class]': '"btn btn-secondary"',
        '[hidden]': '!previousId',
    },
    exportAs: 'showDiff',
})
export class SchemeShowDiffButton {
    @Input('scheme-show-diff') previousId: number;

    private _showDiff: boolean;
    private button: HTMLButtonElement;

    get showDiff(): boolean {
        return this._showDiff;
    }

    @Input()
    set showDiff(value: boolean) {
        this._showDiff = value;
        this._updateView();
    }

    constructor(private elementRef: ElementRef) {
        this.button = this.elementRef.nativeElement as HTMLButtonElement;
    }

    ngAfterViewInit() {
        this._updateView();
        if (!this.previousId) {
            this.button.parentElement.classList.remove('ml-2');
        }
    }

    click() {
        this.showDiff = !this.showDiff;
    }

    private _updateView(): void {
        this.button.innerText = this._showDiff ? '隐藏变更' : '显示变更';
    }
}
