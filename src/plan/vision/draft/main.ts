import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {RestModule} from 'core/rest';

import {VisionDraftComponent} from './draft.component';
import {routing} from './draft.routes';
import {VisionDraftService} from './draft.service';
import {VisionDraftEditorModule} from './editor/draft-editor.module';
import {VisionDraftItemModule} from './item/draft-item.module';
import {VisionDraftListModule} from './list/draft-list.module';

@NgModule({
    bootstrap: [VisionDraftComponent],
    declarations: [
        VisionDraftComponent,
    ],
    imports: [
        BrowserModule,
        RestModule.for('/api/plan/users/${userId}/visions'),
        routing,
        VisionDraftEditorModule,
        VisionDraftItemModule,
        VisionDraftListModule,
    ],
    providers: [
        VisionDraftService,
        {provide: 'DEPARTMENT_VISIONS_URL', useValue: '/api/plan/departments/${departmentId}/visions/latest'},
        {provide: 'VISION_IMPORT_API_URL', useValue: '/api/plan/visions'},
        {provide: 'PUBLIC_SCHEMES_WEB_URL', useValue: '/web/plan/schemes'},
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
