import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {RollcallScheduleComponent} from './schedule.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
    ],
    declarations: [
        RollcallScheduleComponent,
    ],
    exports: [
        RollcallScheduleComponent,
    ],
})
export class RollcallScheduleModule {}
