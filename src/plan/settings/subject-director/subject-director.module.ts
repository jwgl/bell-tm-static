import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CommonDialogModule} from '../../../core/dialogs';

import {PlanCommonModule} from '../../common/module';
import {SubjectDirectorComponent} from './subject-director.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDialogModule,
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
