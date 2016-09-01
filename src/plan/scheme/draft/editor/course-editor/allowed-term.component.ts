import {
    Component,
    Directive,
    Input,
    Output,
    EventEmitter,
    SimpleChange,
    forwardRef,
} from '@angular/core';
import {
    FormControl,
    FormArray,
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
} from '@angular/forms';

import {getBit, setBit, clearBit} from '../../../../../core/utils';

@Component({
    selector: 'allowed-term',
    styles: [require('./allowed-term.scss')],
    template: require('./allowed-term.html'),
})
export class AllowedTermComponent {
    @Input() value: number;
    @Input() suggestedTerm: number;
    @Input() terms: number[];

    @Output() valueChange: EventEmitter<number>;

    controls: FormArray;

    constructor() {
        this.valueChange = new EventEmitter<number>();
    }

    ngOnInit() {
        this.controls = new FormArray(this.terms.map(term => new FormControl(getBit(this.value, term - 1))));
        this.controls.valueChanges.subscribe((values: boolean[]) => {
            this.value = values.reduce((prev, curr, i) => curr ? setBit(prev, this.terms[i] - 1) : prev, 0);
            this.valueChange.emit(this.value);
        });
    }

    ngOnChanges(changes: {[key: string]: SimpleChange}) {
        let suggestedTermChange = changes['suggestedTerm'];
        if (suggestedTermChange && !suggestedTermChange.isFirstChange()) {
            let value = this.value;
            value = clearBit(value, suggestedTermChange.previousValue - 1);
            value = setBit(value, suggestedTermChange.currentValue - 1);
            this.setValue(value);
            this.valueChange.emit(this.value);
        }
    }

    setValue(value: number) {
        this.value = value;
        this.terms.forEach((term, i) => (<FormControl>this.controls.at(i)).setValue(getBit(this.value, term - 1), {emitEvent: false}));
    }
}

@Directive({
    selector: 'allowed-term',
    host: {'(valueChange)': 'onChange($event)'},
    providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AllowedTermAccessor), multi: true}],
})
export class AllowedTermAccessor implements ControlValueAccessor {
    /* tslint:disable:no-empty */
    onChange = (_: any) => {};
    onTouched = () => {};
    /* tslint:enable:no-empty */

    constructor(private host: AllowedTermComponent) {
    }

    writeValue(value: any): void {
        this.host.setValue(value);
    }

    registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
    registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}
