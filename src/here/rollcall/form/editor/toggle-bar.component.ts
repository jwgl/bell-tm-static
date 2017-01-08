import {Component, Input, Output, EventEmitter} from '@angular/core';

import {RollcallType, RollcallTypes, RollcallTypeKeys} from '../form.model';

@Component({
    selector: 'rollcall-toggle-bar',
    styleUrls: ['toggle-bar.component.scss'],
    templateUrl: 'toggle-bar.component.html',
})
export class RollcallToggleBarComponent {
    @Input() rollcallType: RollcallType;
    @Output() toggle = new EventEmitter<string>();

    typeKeys: string[];
    constructor() {
        this.typeKeys = RollcallTypeKeys;
    }

    hasType(key: string): boolean {
        return RollcallType.contains(this.rollcallType, key);
    }

    label(key: string): string {
        return RollcallTypes[key].text;
    }

    toggleType(key: string) {
        this.toggle.emit(key);
    }
}
