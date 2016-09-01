import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RestModule} from '../../../core/http';
import {SchemeDraftComponent} from './draft.component';
import {SchemeDraftService} from './draft.service';
import {SchemeDraftListModule} from './list/draft-list.module';
import {SchemeDraftItemModule} from './item/draft-item.module';
import {SchemeDraftEditorModule} from './editor/draft-editor.module';
import {routing} from './draft.routes';

@NgModule({
    bootstrap: [SchemeDraftComponent],
    declarations: [
        SchemeDraftComponent,
    ],
    imports: [
        BrowserModule,
        RestModule.for('/api/users/${userId}/schemes'),
        routing,
        SchemeDraftEditorModule,
        SchemeDraftItemModule,
        SchemeDraftListModule,
    ],
    providers: [
        SchemeDraftService,
        {provide: 'PUBLIC_SCHEME_URL', useValue: '/api/schemes'},
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);

