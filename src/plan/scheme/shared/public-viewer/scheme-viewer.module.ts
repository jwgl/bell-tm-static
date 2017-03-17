import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {PlanSharedModule} from '../../../shared/module';
import {SchemeSharedModule} from '../../shared/scheme.module';
import {SchemeCourseComponent} from './scheme-course.component';
import {SchemeGroupComponent} from './scheme-group.component';
import {SchemeSummaryComponent} from './scheme-summary.component';
import {SchemeTableComponent} from './scheme-table.component';
import {SchemeViewerComponent} from './scheme-viewer.component';

@NgModule({
    imports: [
        CommonModule,
        PlanSharedModule,
        SchemeSharedModule,
    ],
    declarations: [
        SchemeCourseComponent,
        SchemeGroupComponent,
        SchemeSummaryComponent,
        SchemeTableComponent,
        SchemeViewerComponent,
    ],
    exports: [
        SchemeViewerComponent,
    ],
})
export class SchemePublicViewerModule {}
