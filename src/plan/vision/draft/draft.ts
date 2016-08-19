import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RestModule} from '../../../core/http';
import {VisionDraftComponent} from './draft.component';
import {VisionDraftService} from './draft.service';
import {DraftListModule} from './list/draft-list.module';
import {DraftItemModule} from './item/draft-item.module';
import {DraftEditorModule} from './editor/draft-editor.module';
import {routing} from './draft.routes';

@NgModule({
    bootstrap: [VisionDraftComponent],
    declarations: [
        VisionDraftComponent,
    ],
    imports: [
        BrowserModule,
        RestModule.for('/api/users/${userId}/visions'),
        routing,
        DraftEditorModule,
        DraftItemModule,
        DraftListModule,
    ],
    providers: [
        VisionDraftService,
        {provide: 'API_URL_IMPORT', useValue: '/api/visions'},
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
