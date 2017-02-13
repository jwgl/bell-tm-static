import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {RestModule} from 'core/rest';

import {SchemeDraftComponent} from './draft.component';
import {SchemeDraftRoutingModule} from './draft.routes';
import {SchemeDraftService} from './draft.service';
import {SchemeDraftEditorModule} from './editor/draft-editor.module';
import {SchemeDraftItemModule} from './item/draft-item.module';
import {SchemeDraftListModule} from './list/draft-list.module';

@NgModule({
    bootstrap: [SchemeDraftComponent],
    declarations: [
        SchemeDraftComponent,
    ],
    imports: [
        BrowserModule,
        RestModule.for('/api/plan/users/${userId}/schemes'),
        SchemeDraftRoutingModule,
        SchemeDraftEditorModule,
        SchemeDraftItemModule,
        SchemeDraftListModule,
    ],
    providers: [
        SchemeDraftService,
        {provide: 'DEPARTMENT_SCHEMES_API_URL', useValue: '/api/plan/departments/${departmentId}/schemes/latest'},
        {provide: 'DEPARTMENT_DIRECTIONS_API_URL', useValue: '/api/plan/departments/${departmentId}/schemes/directions'},
        {provide: 'SCHEME_IMPORT_API_URL', useValue: '/api/plan/public/schemes'},
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
