import {Component, Input} from '@angular/core';

/**
 * 汇总行
 */
@Component({
    selector: '[scheme-summary]',
    styles: [':host {background-color: #ddd}'],
    templateUrl: 'scheme-summary.component.html',
})
export class SchemeSummaryComponent {
    @Input('scheme-summary') scheme: any;
}
