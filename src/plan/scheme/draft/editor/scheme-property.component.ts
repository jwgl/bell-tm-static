import {Component, Input} from '@angular/core';

import {Property} from '../../common/scheme.model';

/**
 * 课程性质
 */
@Component({
    selector: '[scheme-property]',
    styles: [
        ':host { background-color: #ddd; }',
        'td.name { text-align: left;}',
    ],
    template: require('./scheme-property.html'),
    host: {'[class]': "'property'"},
})
export class SchemePropertyComponent {
    @Input('scheme-property') property: Property;
    @Input() terms: number[];
}
