import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {CommonDirectivesModule} from 'core/common-directives';

import {RollcallScheduleComponent} from './schedule.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonDirectivesModule,
    ],
    declarations: [
        RollcallScheduleComponent,
    ],
    exports: [
        RollcallScheduleComponent,
    ],
})
export class RollcallScheduleModule {}
