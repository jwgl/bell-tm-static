import {Component, Input} from '@angular/core';

import {Scheme} from '../scheme.model';

/**
 * 教学计划表格
 */
@Component({
    selector: 'scheme-table',
    templateUrl: 'scheme-table.component.html',
})
export class SchemeTableComponent {
    @Input() scheme: Scheme;
}
