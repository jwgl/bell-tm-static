import {Component, EventEmitter, Input, Output} from '@angular/core';

import {RollcallActionLabels, RollcallActions, RollcallType} from '../form.model';

@Component({
    selector: 'rollcall-toggle-bar',
    styleUrls: ['toggle-bar.component.scss'],
    templateUrl: 'toggle-bar.component.html',
})
export class RollcallToggleBarComponent {
    @Input() stretch = false;
    @Input() rollcallType: RollcallType;
    @Input() disabled = false;
    @Output() toggle = new EventEmitter<RollcallType>();

    get actions() {
        return RollcallActions;
    }

    hasType(type: RollcallType): boolean {
        return this.rollcallType === type ||
               this.rollcallType === RollcallType.LateEarly && (type === RollcallType.Late || type === RollcallType.Early);
    }

    getText(type: RollcallType): string {
        return RollcallActionLabels[type].text;
    }

    getClass(type: RollcallType): string {
        return `btn-outline-${RollcallActionLabels[type].class}`;
    }

    toggleType(type: RollcallType) {
        this.toggle.emit(type);
    }
}
