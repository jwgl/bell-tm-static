import {Component, Input} from '@angular/core';

/**
 * 课程。
 */
@Component({
    selector: '[scheme-course]',
    templateUrl: 'scheme-course.component.html',
})
export class SchemeCourseComponent {
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
