import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {CommonDirectivesModule} from 'core/common-directives';

import {HereScheduleComponent} from './schedule.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonDirectivesModule,
    ],
    declarations: [
        HereScheduleComponent,
    ],
    exports: [
        HereScheduleComponent,
    ],
})
export class HereScheduleModule {}
