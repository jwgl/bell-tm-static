import {Component, Input} from '@angular/core';

import {AbstractGroup} from '../scheme.model';

/**
 * 小计。
 */
@Component({
    selector: '[scheme-group]',
    templateUrl: 'scheme-group.component.html',
    host: {'[class]': "'group'"},
})
export class SchemeGroupComponent {
    @Input('scheme-group') group: AbstractGroup;
    @Input() terms: number[];
}
