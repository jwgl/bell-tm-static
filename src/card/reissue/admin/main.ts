import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RestModule} from 'core/rest';
import {WorkflowModule} from 'core/workflow';
import {CommonDirectivesModule} from 'core/common-directives';

import {ReissueCommonModule} from '../common/reissue-common.module';
import {ReissueAdminComponent} from './admin.component';
import {ReissueAdminService} from './admin.service';
import {routing} from './admin.routes';
import {ReissueAdminListComponent} from './list/admin-list.component';
import {ReissueAdminItemComponent} from './item/admin-item.component';

@NgModule({
    bootstrap: [ReissueAdminComponent],
    declarations: [
        ReissueAdminComponent,
        ReissueAdminListComponent,
        ReissueAdminItemComponent,
    ],
    imports: [
        BrowserModule,
        CommonDirectivesModule,
        WorkflowModule,
        RestModule.for('/api/card/reissueForms'),
        routing,
        ReissueCommonModule,
    ],
    providers: [
        ReissueAdminService,
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
