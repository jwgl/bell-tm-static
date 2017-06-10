import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {RestModule} from 'core/rest';

import {VisionPublicItemComponent} from './item/public-item.component';
import {VisionPublicItemModule} from './item/public-item.module';
import {VisionPublicService} from './public.service';

@NgModule({
    bootstrap: [VisionPublicItemComponent],
    imports: [
        BrowserModule,
        RestModule.for('/api/plan/visions'),
        VisionPublicItemModule,
    ],
    providers: [
        VisionPublicService,
        {provide: 'PUBLIC_SCHEMES_WEB_URL', useValue: '/web/plan/schemes'},
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
