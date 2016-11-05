import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RestModule} from 'core/rest';

import {VisionDraftComponent} from './draft.component';
import {VisionDraftService} from './draft.service';
import {routing} from './draft.routes';
import {VisionDraftListModule} from './list/draft-list.module';
import {VisionDraftItemModule} from './item/draft-item.module';
import {VisionDraftEditorModule} from './editor/draft-editor.module';

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
        {provide: 'DEPARTMENT_VISIONS_URL', useValue: '/api/plan/departments/${departmentId}/visions'},
        {provide: 'VISION_IMPORT_API_URL', useValue: '/api/plan/public/visions'},
        {provide: 'PUBLIC_SCHEMES_WEB_URL', useValue: '/web/plan/public/schemes'},
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
