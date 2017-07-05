import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { CommonDirectivesModule } from 'core/common-directives';
import { RestModule } from 'core/rest';

import { StatusTextPipe } from '../shared/pipes/status';
import { TermTextPipe } from '../shared/pipes/term';

import { DepartmentReportComponent } from './item/department.component';
import { ObservationReportComponent } from './item/observation-report.component';
import { RewardListComponent } from './item/reward.component';
import { TeacherSupervisedComponent } from './item/teacher-supervised.component';
import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { ReportService } from './report.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RestModule.for('/api/steer/reports'),
        ReportRoutingModule,
        CommonDirectivesModule,
    ],
    declarations: [
        ReportComponent,
        DepartmentReportComponent,
        ObservationReportComponent,
        TeacherSupervisedComponent,
        RewardListComponent,
        StatusTextPipe,
        TermTextPipe,
    ],
    providers: [
        ReportService,
    ],
    bootstrap: [
        ReportComponent,
    ],
})
export class ReportModule { }
