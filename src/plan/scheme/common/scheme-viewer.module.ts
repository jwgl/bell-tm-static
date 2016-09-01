import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PlanCommonModule} from '../../common/module';
import {
    SchemeCourse,
    SchemeGroup,
    SchemeSummary,
    SchemeTable,
    SchemeViewerComponent,
} from './scheme-viewer.component';

@NgModule({
    imports: [
        CommonModule,
        PlanCommonModule,
    ],
    declarations: [
        SchemeCourse,
        SchemeGroup,
        SchemeSummary,
        SchemeTable,
        SchemeViewerComponent,
    ],
    exports: [
        SchemeViewerComponent,
    ],
})
export class SchemeViewerModule {}
