import {Component, EventEmitter, Input, Output, SimpleChange} from '@angular/core';
import {FormArray, FormControl} from '@angular/forms';

import {clearBit, getBit, setBit} from 'core/utils';

@Component({
    selector: 'allowed-term',
    styleUrls: ['allowed-term.component.scss'],
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
            this.value = values.reduce((prev, curr, i) => curr ? setBit(prev, this.terms[i] - 1) : prev, 0);
            this.valueChange.emit(this.value);
        });
    }

    ngOnChanges(changes: {[key: string]: SimpleChange}) {
        const suggestedTermChange = changes['suggestedTerm'];
        if (suggestedTermChange && !suggestedTermChange.isFirstChange()) {
            let value = this.value;
            value = clearBit(value, suggestedTermChange.previousValue - 1);
            value = setBit(value, suggestedTermChange.currentValue - 1);

            this.terms.forEach((term, i) => {
                const control = this.controls.at(i);
                if (suggestedTermChange.currentValue === term) {
                    control.disable();
                } else {
                    control.enable();
                }
            });

            this.setValue(value);
            this.valueChange.emit(this.value);
        }
    }

    setValue(value: number) {
        this.value = value;
        this.terms.forEach((term, i) => this.controls.at(i).setValue(getBit(this.value, term - 1), {emitEvent: false}));
    }
}
