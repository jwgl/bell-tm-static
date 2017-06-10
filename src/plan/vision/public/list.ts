import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {RestModule} from 'core/rest';

import {VisionPublicListComponent} from './list/public-list.component';
import {VisionPublicListModule} from './list/public-list.module';
import {VisionPublicService} from './public.service';

@NgModule({
    bootstrap: [VisionPublicListComponent],
    imports: [
        BrowserModule,
        RestModule.for('/api/plan/visions'),
        VisionPublicListModule,
    ],
    providers: [
        VisionPublicService,
        {provide: 'PUBLIC_SCHEMES_WEB_URL', useValue: '/api/plan/schemes'},
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
