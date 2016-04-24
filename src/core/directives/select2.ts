import {
    Directive,
    ElementRef,
    QueryList,
    ContentChildren,
    AfterContentInit,
} from 'angular2/core';
import {
    NgControlName,
    NgSelectOption,
} from 'angular2/common';

@Directive({
    selector: '[select2]',
})
export class Select2 implements AfterContentInit {
    $select2: JQuery;
    $element: JQuery;
    ngControl: NgControlName;
    @ContentChildren(NgSelectOption) options: QueryList<NgSelectOption>;

    constructor(
        elementRef: ElementRef,
        ngControl: NgControlName
    ) {
        this.$element = $(elementRef.nativeElement);
        this.ngControl = ngControl;
        this.$select2 = this.$element.select2({width: '100%'});

        // view -> model
        this.$select2.on('change', () => {
            let newValue = this.$select2.val();
            this.ngControl.viewToModelUpdate(newValue);
            this.ngControl.control.updateValue(newValue, {emitModelToViewChange: false});
            this.ngControl.control.markAsDirty();
        });
    }

    ngAfterContentInit() {
        // 异步加载option,当加载完成时，设置select2初始值。
        this.options.changes.subscribe(_ => {
            this.$select2.val(this.ngControl.control.value).trigger('change');
        });
    }
}
