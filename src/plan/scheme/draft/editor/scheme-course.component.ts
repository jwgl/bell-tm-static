import {Component, Input, Output, EventEmitter} from '@angular/core';

import {EditMode} from '../../../../core/constants';
import {ZeroEmptyPipe} from '../../../common/pipes';
import {SchemeCourse, RecordStatus} from '../../common/scheme.model';

/**
 * 课程
 */
@Component({
    selector: '[scheme-course]',
    styles: [require('./scheme-course.scss')],
    template: require('./scheme-course.html'),
    host: {
        '[class]': 'statusClasses',
    },
    pipes: [ZeroEmptyPipe],
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

        let classes: string[] = [];
        if (this.editMode !== EditMode.Create && this.schemeCourse.prevStatus !== RecordStatus.None) {
            classes.push('Prev' + RecordStatus[this.schemeCourse.prevStatus]);
        }
        if (this.editMode !== EditMode.Create && this.schemeCourse.currStatus !== RecordStatus.None) {
            classes.push('Curr' + RecordStatus[this.schemeCourse.currStatus]);
        }
        return classes.join(' ');
    }
}
