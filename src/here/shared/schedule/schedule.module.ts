import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {HereScheduleComponent} from './schedule.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
    ],
    declarations: [
        HereScheduleComponent,
    ],
    exports: [
        HereScheduleComponent,
    ],
})
export class HereScheduleModule {}
