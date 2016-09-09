import {Component, ViewChild, Input, ElementRef} from '@angular/core';

@Component({
    selector: 'checkbox-selector',
    template: '<input type="checkbox" #checkbox>',
})
export class CheckboxSelectorComponent {
    @ViewChild('checkbox') checkbox: ElementRef;
    @Input() data: any;

    get checked(): boolean {
        return (this.checkbox.nativeElement as HTMLInputElement).checked;
    }

    set checked(checked: boolean) {
        (this.checkbox.nativeElement as HTMLInputElement).checked = checked;
    }
}
