import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {VisionPublicListComponent} from './list/public-list.component';
import {VisionPublicListModule} from './list/public-list.module';
import {VisionPublicService} from './public.service';

@NgModule({
    bootstrap: [VisionPublicListComponent],
    imports: [
        BrowserModule,
        VisionPublicListModule,
    ],
    providers: [
        VisionPublicService,
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
