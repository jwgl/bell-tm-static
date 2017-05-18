import {Component, Input} from '@angular/core';

import {AbstractGroup, Direction, Property} from '../scheme.model';

/**
 * 小计
 */
@Component({
    selector: '[scheme-group]',
    host: {'[class]': "'group'"},
    templateUrl: 'scheme-group.component.html',
})
export class SchemeGroupComponent {
    @Input('scheme-group') group: AbstractGroup;

    get summary(): string {
        if (this.group instanceof Property) {
             if (this.group.isResidual) {
                const residual = this.group.scheme.directionResidualCredits;
                if (residual) {
                    return `小计${residual}`;
                } else {
                    return '小计';
                }
            } else {
                return '小计';
            }
        } else if (this.group instanceof Direction) {
            return `小计（${this.group.name}）`;
        } else {
            return null;
        }
    }
}
