import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {VisionPublicItemComponent} from './item/public-item.component';
import {VisionPublicItemModule} from './item/public-item.module';
import {VisionPublicService} from './public.service';

@NgModule({
    bootstrap: [VisionPublicItemComponent],
    imports: [
        BrowserModule,
        VisionPublicItemModule,
    ],
    providers: [
        VisionPublicService,
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
