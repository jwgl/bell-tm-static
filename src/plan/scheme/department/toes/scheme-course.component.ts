import {Component, EventEmitter, Input, Output} from '@angular/core';

import {Direction, Property, RecordStatus, Scheme, SchemeCourse} from '../../shared/scheme.model';
import './department-toes.model';

@Component({
    selector: '[scheme-course]',
    styleUrls: ['scheme-course.component.scss'],
    templateUrl: 'scheme-course.component.html',
    host: {
        '[class]': 'statusClasses',
    },
})
export class SchemeCourseToesComponent {
    @Input('scheme-course') schemeCourse: SchemeCourse;
    @Input() scheme: Scheme;
    @Input() direction: Direction;
    @Input() property: Property;

    @Output() edit: EventEmitter<null> = new EventEmitter();

    get directionName(): string {
        return this.direction ? this.direction.name : '无方向';
    }

    get departmentName(): string {
        if (this.schemeCourse.departmentName) {
            return this.schemeCourse.departmentName;
        } else {
            return this.scheme.departmentName;
        }
    }

    get startWeekType(): number {
        if (this.schemeCourse.theoryPeriod === 0 && this.schemeCourse.experimentPeriod === 0) {
            return 0;
        } else {
            return 1;
        }
    }

    get statusClasses(): string {
        if (!this.schemeCourse.group.getScheme().previousId) {
            return '';
        }

        const classes: string[] = [];
        if (this.schemeCourse.prevStatus !== RecordStatus.None) {
            classes.push('Prev' + RecordStatus[this.schemeCourse.prevStatus]);
        }
        if (this.schemeCourse.currStatus !== RecordStatus.None) {
            classes.push('Curr' + RecordStatus[this.schemeCourse.currStatus]);
        }
        return classes.join(' ');
    }
}
