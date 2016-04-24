import {Component, Input, ViewEncapsulation} from 'angular2/core';

import {SchemeTermTitlePipe} from '../../common/pipes';
import {PlanTitleComponent} from '../../common/components';
import {ZeroEmptyPipe} from '../../common/pipes';
import {Scheme} from './scheme.model';

/**
 * 课程。
 */
@Component({
    selector: '[scheme-course]',
    template: require('./scheme-course.html'),
    pipes: [ZeroEmptyPipe],
})
class SchemeCourse {
    @Input('scheme-course') schemeCourse: any;
    @Input() terms: number[];

    /**
     * 1级分组
     */
    @Input() group1: any;
    @Input() first1: boolean;

    /**
     * 2级分组
     */
    @Input() group2: any;
    @Input() first2: boolean;
}

/**
 * 小计。
 */
@Component({
    selector: '[scheme-group]',
    template: require('./scheme-group.html'),
    host: {'[class]': "'group'"},
    pipes: [ZeroEmptyPipe],
})
class SchemeGroup {
    @Input('scheme-group') group: any;
    @Input() terms: number[];
}

/**
 * 汇总行
 */
@Component({
    selector: '[scheme-summary]',
    styles: [':host {background-color: #ddd}'],
    template: require('./scheme-summary.html'),
})
export class SchemeSummary {
    @Input('scheme-summary') scheme: Scheme;
}

/**
 * 计划表格
 */
@Component({
    selector: 'scheme-table',
    template: require('./scheme-table.html'),
    directives: [
        SchemeGroup,
        SchemeCourse,
        SchemeSummary,
    ],
    pipes: [
        ZeroEmptyPipe,
        SchemeTermTitlePipe,
    ],
})
class SchemeTable {
    @Input() scheme: Scheme;
}


@Component({
    selector: 'scheme-viewer',
    styles: [require('./scheme-viewer.scss')],
    template: require('./scheme-viewer.html'),
    directives: [
        SchemeTable,
        PlanTitleComponent,
    ],
    encapsulation: ViewEncapsulation.None,
})
export class SchemeViewerComponent {
    @Input() scheme: Scheme;
}
