import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {Dialog} from '../../core/dialogs';
import {ModalDirectivesModule} from '../../core/directives';
import {PlanTitleComponent} from './components/plan-title.component';
import {VersionDialog} from './dialogs/version.dialog';
import {PrimaryCoursesPipe} from './pipes/primary-courses';
import {ProgramTypePipe} from './pipes/program-type';
import {VersionNumberPipe} from './pipes/version-number';
import {ZeroEmptyPipe} from './pipes/zero-empty';
import {SchemeTermNamePipe, SchemeTermTitlePipe} from './pipes/scheme-term';
import {GradeFilterPipe} from './pipes/grade-filter';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ModalDirectivesModule,
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
        VersionDialog,
        PrimaryCoursesPipe,
        ProgramTypePipe,
        VersionNumberPipe,
        ZeroEmptyPipe,
        SchemeTermNamePipe,
        SchemeTermTitlePipe,
        GradeFilterPipe,
    ],
})
export class PlanCommonModule {}
