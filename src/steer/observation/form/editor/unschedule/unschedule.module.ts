import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { CommonDirectivesModule } from 'core/common-directives';
import { Dialog } from 'core/dialogs';
import { RestModule } from 'core/rest';

import { PipesModule } from '../../../shared/pipes/observation-pipes.module';
import { MyTeacherModule } from '../../../shared/utils/my-teacher.module';

import { ObservationSpecial } from './form.component';
import { TaskListComponent } from './task-list.component';
import { UnScheduleService } from './unschedule.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        CommonDirectivesModule,
        MyTeacherModule,
        PipesModule,
        RouterModule,
    ],
    declarations: [
        ObservationSpecial,
        TaskListComponent,
    ],
    providers: [
        Dialog,
        UnScheduleService,
    ],
    exports: [
        ObservationSpecial,
        TaskListComponent,
    ],
})
export class UnScheduleModule { }
