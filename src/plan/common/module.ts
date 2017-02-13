import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {CommonDirectivesModule} from 'core/common-directives';
import {Dialog} from 'core/dialogs';

import {PlanTitleComponent} from './components/plan-title.component';
import {VersionDialog} from './dialogs/version.dialog';
import {GradeFilterPipe} from './pipes/grade-filter';
import {PrimaryCoursesPipe} from './pipes/primary-courses';
import {ProgramTypePipe} from './pipes/program-type';
import {SchemeTermNamePipe, SchemeTermTitlePipe} from './pipes/scheme-term';
import {VersionNumberPipe} from './pipes/version-number';
import {ZeroEmptyPipe} from './pipes/zero-empty';

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
        PrimaryCoursesPipe,
        ProgramTypePipe,
        VersionNumberPipe,
        ZeroEmptyPipe,
        SchemeTermNamePipe,
        SchemeTermTitlePipe,
        GradeFilterPipe,
    ],
    providers: [
        Dialog,
    ],
    exports: [
        PlanTitleComponent,
        PrimaryCoursesPipe,
        ProgramTypePipe,
        VersionNumberPipe,
        ZeroEmptyPipe,
        SchemeTermNamePipe,
        SchemeTermTitlePipe,
        GradeFilterPipe,
    ],
    entryComponents: [
        VersionDialog,
    ],
})
export class PlanCommonModule {}
