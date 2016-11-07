import {Component, Input} from '@angular/core';

/**
 * 小计。
 */
@Component({
    selector: '[scheme-group]',
    templateUrl: 'scheme-group.component.html',
    host: {'[class]': "'group'"},
})
export class SchemeGroupComponent {
    @Input('scheme-group') group: any;
    @Input() terms: number[];
}
