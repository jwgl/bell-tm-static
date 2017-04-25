import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {CommonDirectivesModule} from 'core/common-directives';
import {RestModule} from 'core/rest';
import {WorkflowModule} from 'core/workflow';

import {PlanSharedModule} from '../../shared/module';
import {SchemeInternalViewerModule} from '../shared/internal-viewer/scheme-viewer.module';
import {SchemeSharedModule} from '../shared/scheme.module';
import {SchemeCheckComponent} from './check.component';
import {SchemeCheckRoutingModule} from './check.routing';

import {SchemeCheckItemComponent} from './check-item.component';
import {SchemeCheckListComponent} from './check-list.component';

@NgModule({
    imports: [
        BrowserModule,
        CommonDirectivesModule,
        WorkflowModule,
        RestModule.for('/api/plan/checkers/${userId}/schemes'),
        SchemeCheckRoutingModule,
        PlanSharedModule,
        SchemeInternalViewerModule,
        SchemeSharedModule,
    ],
    declarations: [
        SchemeCheckComponent,
        SchemeCheckListComponent,
        SchemeCheckItemComponent,
    ],
    bootstrap: [SchemeCheckComponent],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
