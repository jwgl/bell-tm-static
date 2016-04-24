import {Component, Input} from 'angular2/core';

import {Scheme} from '../../common/scheme.model';

@Component({
    selector: '[scheme-summary]',
    styles: [':host {background-color: #ddd}'],
    template: require('./scheme-summary.html'),
})
export class SchemeSummaryComponent {
    @Input('scheme-summary') scheme: Scheme;
}
