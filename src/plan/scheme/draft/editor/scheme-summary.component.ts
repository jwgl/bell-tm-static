import {Component, Input} from '@angular/core';

import {Scheme} from '../../common/scheme.model';

@Component({
    selector: '[scheme-summary]',
    styles: [':host {background-color: #ddd}'],
    templateUrl: 'scheme-summary.component.html',
})
export class SchemeSummaryComponent {
    @Input('scheme-summary') scheme: Scheme;
}
