import {Component, Input} from '@angular/core';

import {Property} from '../../shared/scheme.model';

/**
 * 课程性质
 */
@Component({
    selector: '[scheme-property]',
    styles: [
        ':host { background-color: #ddd; }',
        'td.name { text-align: left; padding: 0.25rem;}',
    ],
    templateUrl: 'scheme-property.component.html',
    host: {'[class]': "'property'"},
})
export class SchemePropertyToesComponent {
    @Input('scheme-property') property: Property;
}
