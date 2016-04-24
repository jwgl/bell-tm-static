import {Component, Input} from 'angular2/core';

import {ZeroEmptyPipe} from '../../../common/pipes';
import {Direction} from '../../common/scheme.model';

/**
 * 专业方向
 */
@Component({
    selector: '[scheme-direction]',
    host: {'[class]': "'direction'"},
    styles: [
        'td.name { text-align: left; }',
    ],
    template: `<td [colSpan]="6 + terms.length" class="name">{{direction.name}}</td>`,
    pipes: [ZeroEmptyPipe],
})
export class SchemeDirectionComponent {
    @Input('scheme-direction') direction: Direction;
    @Input() terms: number[];
}
