import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {CommonDirectivesModule} from 'core/common-directives';

import {SimpleScheduleComponent} from './simple-schedule.component';
import {TabedScheduleComponent} from './tabed-schedule.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonDirectivesModule,
    ],
    declarations: [
        TabedScheduleComponent,
        SimpleScheduleComponent,
    ],
    exports: [
        TabedScheduleComponent,
        SimpleScheduleComponent,
    ],
})
export class HereScheduleModule {}
