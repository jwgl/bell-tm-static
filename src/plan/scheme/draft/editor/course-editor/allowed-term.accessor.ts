import {
    Component,
    Directive,
    EventEmitter,
    forwardRef,
    Input,
    Output,
    SimpleChange,
} from '@angular/core';
import {
    ControlValueAccessor,
    FormArray,
    FormControl,
    NG_VALUE_ACCESSOR,
} from '@angular/forms';

import {AllowedTermComponent} from './allowed-term.component';

@Directive({
    selector: 'allowed-term',
    host: {'(valueChange)': 'onChange($event)'},
    providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AllowedTermAccessor), multi: true}],
})
export class AllowedTermAccessor implements ControlValueAccessor {
    constructor(private host: AllowedTermComponent) {}

    writeValue(value: any): void {
        this.host.setValue(value);
    }

    /* tslint:disable:no-empty */
    onChange = (_: any) => {};
    onTouched = () => {};
    /* tslint:enable:no-empty */

    registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
    registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}
