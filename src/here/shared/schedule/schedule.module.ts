import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {CommonDirectivesModule} from 'core/common-directives';

import {TabedScheduleComponent} from './tabed-schedule.component';
import {SimpleScheduleComponent} from './simple-schedule.component';

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
