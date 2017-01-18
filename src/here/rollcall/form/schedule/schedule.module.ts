import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {CommonDirectivesModule} from 'core/common-directives';

import {RollcallScheduleComponent} from './schedule.component';
import {HereScheduleModule} from '../../../shared/schedule/schedule.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonDirectivesModule,
        HereScheduleModule,
    ],
    declarations: [
        RollcallScheduleComponent,
    ],
    exports: [
        RollcallScheduleComponent,
    ],
})
export class RollcallScheduleModule {}
