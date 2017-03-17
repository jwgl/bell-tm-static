import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {CommonDialogsModule} from 'core/common-dialogs';
import {CommonDirectivesModule} from 'core/common-directives';

import {PlanSharedModule} from '../../shared/module';
import {SubjectDirectorComponent} from './subject-director.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        CommonDialogsModule,
        PlanSharedModule,
    ],
    declarations: [
        SubjectDirectorComponent,
    ],
    exports: [
        SubjectDirectorComponent,
    ],
})
export class SubjectDirectorModule {}
