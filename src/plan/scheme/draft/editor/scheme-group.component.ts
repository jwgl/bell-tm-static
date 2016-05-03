import {
    Component,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';

import {ZeroEmptyPipe} from '../../../common/pipes';
import {AbstractGroup} from '../../common/scheme.model';

/**
 * 小计
 */
@Component({
    selector: '[scheme-group]',
    host: {'[class]': "'group'"},
    template: require('./scheme-group.html'),
    pipes: [ZeroEmptyPipe],
})
export class SchemeGroupComponent {
    @Input('scheme-group') group: AbstractGroup;
    @Input() terms: number[];
    @Output() add: EventEmitter<AbstractGroup> = new EventEmitter<AbstractGroup>();
    @Output() import: EventEmitter<AbstractGroup> = new EventEmitter<AbstractGroup>();
}
