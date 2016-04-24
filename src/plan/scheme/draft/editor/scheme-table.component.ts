import {
    Component,
    Input,
    Output,
    EventEmitter,
} from 'angular2/core';

import {EditMode} from '../../../../core/constants';
import {SchemeTermTitlePipe} from '../../../common/pipes';

import {Scheme, AbstractGroup, SchemeCourse} from '../../common/scheme.model';
import {SchemePropertyComponent} from './scheme-property.component';
import {SchemeDirectionComponent} from './scheme-direction.component';
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
        SchemeDirectionComponent,
        SchemeGroupComponent,
        SchemeCourseComponent,
        SchemeSummaryComponent,
    ],
    pipes: [
        SchemeTermTitlePipe,
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
