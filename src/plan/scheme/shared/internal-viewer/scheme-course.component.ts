import {Component, Input} from '@angular/core';

import {RecordStatus, SchemeCourse} from '../scheme.model';

/**
 * 课程
 */
@Component({
    selector: '[scheme-course]',
    styleUrls: ['scheme-course.component.scss'],
    templateUrl: 'scheme-course.component.html',
    host: {
        '[class]': 'statusClass',
        '[class.highlight]': 'schemeCourse.highlight',
        '(mouseenter)': 'mouseenter()',
        '(mouseleave)': 'mouseleave()',
    },
})
export class SchemeCourseComponent {
    @Input('scheme-course') schemeCourse: SchemeCourse;

    get statusClass(): string {
        if (!this.schemeCourse.group.scheme.previousId || this.schemeCourse.prevStatus === RecordStatus.None) {
            return '';
        } else {
            return RecordStatus[this.schemeCourse.prevStatus];
        }
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
