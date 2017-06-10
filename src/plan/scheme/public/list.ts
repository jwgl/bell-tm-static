import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {RestModule} from 'core/rest';

import {SchemePublicListComponent} from './list/public-list.component';
import {SchemePublicListModule} from './list/public-list.module';
import {SchemePublicService} from './public.service';

@NgModule({
    bootstrap: [SchemePublicListComponent],
    imports: [
        BrowserModule,
        RestModule.for('/api/plan/schemes'),
        SchemePublicListModule,
    ],
    providers: [
        SchemePublicService,
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
