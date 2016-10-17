import {Component, Input, ViewEncapsulation} from '@angular/core';

import {Scheme} from './scheme.model';

/**
 * 课程。
 */
@Component({
    selector: '[scheme-course]',
    templateUrl: 'scheme-course.html',
})
export class SchemeCourse {
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
    templateUrl: 'scheme-group.html',
    host: {'[class]': "'group'"},
})
export class SchemeGroup {
    @Input('scheme-group') group: any;
    @Input() terms: number[];
}

/**
 * 汇总行
 */
@Component({
    selector: '[scheme-summary]',
    styles: [':host {background-color: #ddd}'],
    templateUrl: 'scheme-summary.html',
})
export class SchemeSummary {
    @Input('scheme-summary') scheme: Scheme;
}

/**
 * 计划表格
 */
@Component({
    selector: 'scheme-table',
    templateUrl: 'scheme-table.html',
})
export class SchemeTable {
    @Input() scheme: Scheme;
}

/**
 * 查看器
 */
@Component({
    selector: 'scheme-viewer',
    styleUrls: ['scheme-viewer.component.scss'],
    templateUrl: 'scheme-viewer.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class SchemeViewerComponent {
    @Input() scheme: Scheme;
}
