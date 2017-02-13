import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {RestModule} from 'core/rest';

import {SchemePublicItemComponent} from './item/public-item.component';
import {SchemePublicItemModule} from './item/public-item.module';
import {SchemePublicService} from './public.service';

@NgModule({
    bootstrap: [SchemePublicItemComponent],
    imports: [
        BrowserModule,
        RestModule.for('/api/plan/public/schemes'),
        SchemePublicItemModule,
    ],
    providers: [
        SchemePublicService,
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
