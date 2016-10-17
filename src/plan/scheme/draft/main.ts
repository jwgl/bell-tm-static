import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RestModule} from 'core/rest';

import {SchemeDraftComponent} from './draft.component';
import {SchemeDraftService} from './draft.service';
import {routing} from './draft.routes';
import {SchemeDraftListModule} from './list/draft-list.module';
import {SchemeDraftItemModule} from './item/draft-item.module';
import {SchemeDraftEditorModule} from './editor/draft-editor.module';

@NgModule({
    bootstrap: [SchemeDraftComponent],
    declarations: [
        SchemeDraftComponent,
    ],
    imports: [
        BrowserModule,
        RestModule.for('/api/plan/users/${userId}/schemes'),
        routing,
        SchemeDraftEditorModule,
        SchemeDraftItemModule,
        SchemeDraftListModule,
    ],
    providers: [
        SchemeDraftService,
        {provide: 'PUBLIC_SCHEMES_URL', useValue: '/api/plan/schemes'},
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);

