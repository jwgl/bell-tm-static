import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {SchemePublicListComponent} from './list/public-list.component';
import {SchemePublicListModule} from './list/public-list.module';
import {SchemePublicService} from './public.service';

@NgModule({
    bootstrap: [SchemePublicListComponent],
    imports: [
        BrowserModule,
        SchemePublicListModule,
    ],
    providers: [
        SchemePublicService,
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
