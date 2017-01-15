import {Component, Input, Output, EventEmitter} from '@angular/core';

import {RollcallType, RollcallTypes, RollcallKeys} from '../form.model';

@Component({
    selector: 'rollcall-toggle-bar',
    styleUrls: ['toggle-bar.component.scss'],
    templateUrl: 'toggle-bar.component.html',
})
export class RollcallToggleBarComponent {
    @Input() stretch = false;
    @Input() rollcallType: RollcallType;
    @Output() toggle = new EventEmitter<string>();

    get typeKeys() {
        return RollcallKeys;
    }

    hasType(key: string): boolean {
        return RollcallType.contains(this.rollcallType, key);
    }

    label(key: string): string {
        return RollcallTypes[key].label;
    }

    toggleType(key: string) {
        this.toggle.emit(key);
    }
}
