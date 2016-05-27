import {
    Component,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';

import {EditMode} from '../../../../core/constants';
import {Scheme, AbstractGroup, SchemeCourse} from '../../common/scheme.model';
import {SchemePropertyComponent} from './scheme-property.component';
import {SchemeGroupComponent} from './scheme-group.component';
import {SchemeCourseComponent} from './scheme-course.component';
import {SchemeSummaryComponent} from './scheme-summary.component';

/**
 * 教学计划表格
 */
@Component({
    selector: 'scheme-table',
    template: require('./scheme-table.html'),
    directives: [
        SchemePropertyComponent,
        SchemeGroupComponent,
        SchemeCourseComponent,
        SchemeSummaryComponent,
    ],
})
export class SchemeDraftTableComponent {
    @Input() scheme: Scheme;
    @Input() editMode: EditMode;

    @Output() add: EventEmitter<AbstractGroup> = new EventEmitter<AbstractGroup>();
    @Output() import: EventEmitter<AbstractGroup> = new EventEmitter<AbstractGroup>();
    @Output() edit: EventEmitter<SchemeCourse> = new EventEmitter<SchemeCourse>();
    @Output() delete: EventEmitter<SchemeCourse> = new EventEmitter<SchemeCourse>();
    @Output() restore: EventEmitter<SchemeCourse> = new EventEmitter<SchemeCourse>();
}
