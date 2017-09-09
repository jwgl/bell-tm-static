import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {CommonDirectivesModule} from 'core/common-directives';
import {RestModule} from 'core/rest';

import {PlaceUsageComponent} from './place-usage.component';
import {PlaceUsageService} from './place-usage.service';

@NgModule({
    bootstrap: [PlaceUsageComponent],
    imports: [
        BrowserModule,
        FormsModule,
        CommonDirectivesModule,
        RestModule.for('/api/place/buildings'),
    ],
    declarations: [
        PlaceUsageComponent,
    ],
    providers: [
        PlaceUsageService,
        {provide: 'DEPARTMENT_TEACHERS_API_URL', useValue: '/api/place/departments/${departmentId}/teachers'},
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
