import {Component, EventEmitter, Input, Output, SimpleChange} from '@angular/core';
import {FormArray, FormControl} from '@angular/forms';

import {clearBit, getBit, setBit} from 'core/utils';

@Component({
    selector: 'allowed-term',
    templateUrl: 'allowed-term.component.html',
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
        this.controls = new FormArray(this.terms.map(term => new FormControl({
            value: getBit(this.value, term - 1),
            disabled: this.suggestedTerm === term,
        })));

        this.controls.valueChanges.subscribe((values: boolean[]) => {
            // 被禁用的控件的值未包含在values中
            values.splice(this.terms.indexOf(this.suggestedTerm), 0, true);
            this.setValue(values.reduce((prev, curr, i) => curr ? setBit(prev, this.terms[i] - 1) : prev, 0));
        });
    }

    ngOnChanges(changes: {[key: string]: SimpleChange}) {
        const suggestedTermChange = changes['suggestedTerm'];
        if (suggestedTermChange && !suggestedTermChange.isFirstChange()) {
            this.terms.forEach((term, i) => {
                const control = this.controls.at(i);
                if (suggestedTermChange.currentValue === term) {
                    control.disable();
                } else {
                    control.enable();
                }
            });

            this.setValue(setBit(0, suggestedTermChange.currentValue - 1));
        }
    }

    setValue(value: number) {
        this.value = value;
        this.terms.forEach((term, i) => this.controls.at(i).setValue(getBit(this.value, term - 1), {emitEvent: false}));
        this.valueChange.emit(this.value);
    }
}
