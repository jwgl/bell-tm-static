import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CommonDirectivesModule} from 'core/common-directives';
import {CommonDialogsModule} from 'core/common-dialogs';

import {PlanCommonModule} from '../../common/module';
import {SubjectDirectorComponent} from './subject-director.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        CommonDialogsModule,
        PlanCommonModule,
    ],
    declarations: [
        SubjectDirectorComponent,
    ],
    exports: [
        SubjectDirectorComponent,
    ],
})
export class SubjectDirectorModule {}
