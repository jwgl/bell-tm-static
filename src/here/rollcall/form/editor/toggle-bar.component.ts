import {Component, EventEmitter, Input, Output} from '@angular/core';

import {RollcallActions, RollcallActionsKeys, RollcallType} from '../form.model';

@Component({
    selector: 'rollcall-toggle-bar',
    styleUrls: ['toggle-bar.component.scss'],
    templateUrl: 'toggle-bar.component.html',
})
export class RollcallToggleBarComponent {
    @Input() stretch = false;
    @Input() rollcallType: RollcallType;
    @Input() disabled = false;
    @Output() toggle = new EventEmitter<string>();

    get actionsKeys() {
        return RollcallActionsKeys;
    }

    hasType(key: string): boolean {
        return this.rollcallType === RollcallActions[key].value ||
               this.rollcallType === RollcallType.LateEarly && (key === 'late' || key === 'early');
    }

    label(key: string): string {
        return RollcallActions[key].label;
    }

    toggleType(key: string) {
        this.toggle.emit(key);
    }
}
