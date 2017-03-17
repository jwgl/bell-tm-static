import {Component, Input} from '@angular/core';

import {Property} from '../../shared/scheme.model';

/**
 * 课程性质
 */
@Component({
    selector: '[scheme-property]',
    styles: [
        ':host { background-color: #ddd; }',
        'td.name { text-align: left;}',
    ],
    templateUrl: 'scheme-property.component.html',
    host: {'[class]': "'property'"},
})
export class SchemePropertyComponent {
    @Input('scheme-property') property: Property;
    @Input() terms: number[];
}
