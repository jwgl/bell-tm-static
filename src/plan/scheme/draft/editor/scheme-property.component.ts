import {Component, Input} from '@angular/core';

import {ZeroEmptyPipe} from '../../../common/pipes';
import {Property} from '../../common/scheme.model';

/**
 * 课程性质
 */
@Component({
    selector: '[scheme-property]',
    styles: [
        ':host { background-color: #eee; }',
        'td.name { text-align: left;font-size: 1.2rem; }',
    ],
    template: `<td [colSpan]="6 + terms.length" class="name">{{property.name}}</td>`,
    host: {'[class]': "'property'"},
    pipes: [ZeroEmptyPipe],
})
export class SchemePropertyComponent {
    @Input('scheme-property') property: Property;
    @Input() terms: number[];
}
