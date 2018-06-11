import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {CommonDirectivesModule} from 'core/common-directives';

import {DualdegreeAuditStatusComponent} from './audit-status';
import {PipesModule} from './common-pipes';
import {ApplicationFormViewerComponent} from './form-viewer.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        PipesModule,
    ],
    declarations: [
        ApplicationFormViewerComponent,
        DualdegreeAuditStatusComponent,
    ],
    exports: [
        ApplicationFormViewerComponent,
        DualdegreeAuditStatusComponent,
    ],
})
export class ApplicationSharedModule {}
