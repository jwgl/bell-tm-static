import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {CommonDialogsModule} from 'core/common-dialogs';
import {CommonDirectivesModule} from 'core/common-directives';

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
