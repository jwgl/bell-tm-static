import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {CommonDirectivesModule} from 'core/common-directives';

import {HereScheduleModule} from '../../../shared/schedule/schedule.module';
import {RollcallScheduleComponent} from './schedule.component';

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
