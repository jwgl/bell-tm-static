import {Component, EventEmitter, Input, Output} from '@angular/core';

import {EditMode} from 'core/constants';

import {RecordStatus, SchemeCourse} from '../../common/scheme.model';

/**
 * 课程
 */
@Component({
    selector: '[scheme-course]',
    styleUrls: ['scheme-course.component.scss'],
    templateUrl: 'scheme-course.component.html',
    host: {
        '[class]': 'statusClasses',
        '[class.highlight]': 'schemeCourse.highlight',
        '(mouseenter)': 'mouseenter()',
        '(mouseleave)': 'mouseleave()',
    },
})
export class SchemeCourseComponent {
    @Input('scheme-course') schemeCourse: SchemeCourse;
    @Input() terms: number[];
    @Input() editMode: EditMode;

    @Output() edit: EventEmitter<SchemeCourse> = new EventEmitter<SchemeCourse>();
    @Output() delete: EventEmitter<SchemeCourse> = new EventEmitter<SchemeCourse>();
    @Output() restore: EventEmitter<SchemeCourse> = new EventEmitter<SchemeCourse>();

    get statusClasses(): string {
        if (!this.schemeCourse.group.getScheme().previousId) {
            return '';
        }

        const classes: string[] = [];
        if (this.editMode !== EditMode.Create && this.schemeCourse.prevStatus !== RecordStatus.None) {
            classes.push('Prev' + RecordStatus[this.schemeCourse.prevStatus]);
        }
        if (this.editMode !== EditMode.Create && this.schemeCourse.currStatus !== RecordStatus.None) {
            classes.push('Curr' + RecordStatus[this.schemeCourse.currStatus]);
        }
        return classes.join(' ');
    }

    mouseenter() {
        if (this.schemeCourse.ref) {
            this.schemeCourse.ref.highlight = true;

        }
    }

    mouseleave() {
        if (this.schemeCourse.ref) {
            this.schemeCourse.ref.highlight = false;
        }
    }
}
