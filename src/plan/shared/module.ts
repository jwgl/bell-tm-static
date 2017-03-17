import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {CommonDirectivesModule} from 'core/common-directives';
import {Dialog} from 'core/dialogs';

import {PlanTitleComponent} from './components/plan-title.component';
import {VersionDialog} from './dialogs/version.dialog';
import {GradeFilterPipe} from './pipes/grade-filter';
import {ProgramTypePipe} from './pipes/program-type';
import {VersionNumberPipe} from './pipes/version-number';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CommonDirectivesModule,
    ],
    declarations: [
        PlanTitleComponent,
        VersionDialog,
        ProgramTypePipe,
        VersionNumberPipe,
        GradeFilterPipe,
    ],
    providers: [
        Dialog,
    ],
    exports: [
        PlanTitleComponent,
        ProgramTypePipe,
        VersionNumberPipe,
        GradeFilterPipe,
    ],
    entryComponents: [
        VersionDialog,
    ],
})
export class PlanSharedModule {}
